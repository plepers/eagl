

define( function( ){

/*

blend func

depth test

culling

stencil


*/

  var BLEND_EQ_C            = 0,    // BlendingFactorDest
      BLEND_EQ_A            = 1,    // BlendingFactorSrc   //

      BLEND_FUNC_C_DST      = 2,    // Separate Blend Functions
      BLEND_FUNC_C_SRC      = 3,
      BLEND_FUNC_A_DST      = 4,
      BLEND_FUNC_A_SRC      = 5,

      DEPTH_FUNC            = 6,    // DepthFunction
      CULL_MODE             = 7,    // CullFaceMode
      FACE_DIR              = 8,    // FrontFaceDirection

      STENCIL_FUNC          = 9,
      STENCIL_REF           = 10,
      STENCIL_VALUE_MASK    = 11,
      STENCIL_WRITEMASK     = 12,
      STENCIL_OP_FAIL       = 13,
      STENCIL_OP_ZFAIL      = 14,
      STENCIL_OP_ZPASS      = 15,
      STENCIL_B_FUNC        = 16,
      STENCIL_B_REF         = 17,
      STENCIL_B_VALUE_MASK  = 18,
      STENCIL_B_WRITEMASK   = 19,
      STENCIL_B_OP_FAIL     = 20,
      STENCIL_B_OP_ZFAIL    = 21,
      STENCIL_B_OP_ZPASS    = 22,

      SCISSOR_TEST          = 23,    // SCISSOR_TEST

      LEN = 24,

      BLEND_OP_SET        = 1 << 0,
      BLEND_FUNC_SET      = 1 << 1,
      BLEND_EQ_A_SET      = 1 << 2,
      BLEND_FUNC_A_SET    = 1 << 3,
      DEPTH_FUNC_SET      = 1 << 4,
      CULL_MODE_SET       = 1 << 5,
      FACE_DIR_SET        = 1 << 6,
      STENCIL_FUNC_SET    = 1 << 7,
      STENCIL_OP_SET      = 1 << 8,
      STENCIL_MASK_SET    = 1 << 9,
      STENCIL_B_FUNC_SET  = 1 << 10,
      STENCIL_B_OP_SET    = 1 << 11,
      STENCIL_B_MASK_SET  = 1 << 12;


  GLConfig.ConfigStack = ConfigStack;


  //  ╔═╗╔╦╗╔═╗╔═╗╦╔═
  //  ╚═╗ ║ ╠═╣║  ╠╩╗
  //  ╚═╝ ╩ ╩ ╩╚═╝╩ ╩

  function ConfigStack(){
    this._diffs = [];
    this._configs = [];
  }

  ConfigStack.prototype = {

    fetch: function( gl ){
      cfg = new GLConfig();
      cfg.fromGL( gl );
      this._configs[0] = cfg;
    },

    push : function( cfg ){

    },

    pop : function() {

    }

  };


  //  ╔═╗╔═╗╔╗╔╔═╗╦╔═╗
  //  ║  ║ ║║║║╠╣ ║║ ╦
  //  ╚═╝╚═╝╝╚╝╚  ╩╚═╝

  getP = function( gl, p ){
    return gl.getParameter( p );
  };

  function GLConfig(){
    this._cfg = new Uint16Array( LEN );
    this._set = 0;
  }

  GLConfig.prototype = {


    fromGL : function( gl ){
      this._set = 0;

      var blendSrcRGB       = getP( gl, gl.BLEND_SRC_RGB ),
          blendDstRGB       = getP( gl, gl.BLEND_DST_RGB ),
          blendSrcAlpha     = getP( gl, gl.BLEND_SRC_ALPHA ),
          blendDstAlpha     = getP( gl, gl.BLEND_DST_ALPHA ),
          blendEqRgb        = getP( gl, gl.BLEND_EQUATION_RGB ),
          blendEqAlpha      = getP( gl, gl.BLEND_EQUATION_ALPHA ),
          stencilFunc       = getP( gl, gl.STENCIL_FUNC ),
          stencilRef        = getP( gl, gl.STENCIL_REF ),
          stencilValueMask  = getP( gl, gl.STENCIL_VALUE_MASK ),
          stencilWriteMask  = getP( gl, gl.STENCIL_WRITEMASK ),
          stencilOpFail     = getP( gl, gl.STENCIL_FAIL ),
          stencilOpZfail    = getP( gl, gl.STENCIL_PASS_DEPTH_FAIL ),
          stencilOpZpass    = getP( gl, gl.STENCIL_PASS_DEPTH_PASS ),
          stencilBFunc      = getP( gl, gl.STENCIL_BACK_FUNC ),
          stencilBRef       = getP( gl, gl.STENCIL_BACK_REF ),
          stencilBValueMask = getP( gl, gl.STENCIL_BACK_VALUE_MASK ),
          stencilBWriteMask = getP( gl, gl.STENCIL_BACK_WRITEMASK ),
          stencilBOpFail    = getP( gl, gl.STENCIL_BACK_FAIL ),
          stencilBOpZfail   = getP( gl, gl.STENCIL_BACK_PASS_DEPTH_FAIL ),
          stencilBOpZpass   = getP( gl, gl.STENCIL_BACK_PASS_DEPTH_PASS );


      if( blendSrcRGB !== blendSrcAlpha || blendDstRGB !== blendDstAlpha ) {
        this.setBlendFunctionSeparate(
          blendSrcRGB,
          blendDstRGB,
          blendSrcAlpha,
          blendDstAlpha
        );
      } else {
        this.setBlendFunction(
          blendSrcRGB,
          blendDstRGB
        );
      }

      if( blendEqRgb !== blendEqAlpha ) {
        this.setBlendEquationSeparate(
          blendEqRgb,
          blendEqAlpha
        );
      } else {
        this.setBlendEquation(
          blendEqRgb
        );
      }


      this.setStencilFunc(
        stencilFunc,
        stencilRef,
        stencilValueMask
      );
      if( stencilFunc      !== stencilBFunc     ||
          stencilRef       !== stencilBRef      ||
          stencilValueMask !== stencilBValueMask ) {
        this.setStencilFuncBack(
          stencilBFunc,
          stencilBRef,
          stencilBValueMask
        );
      }

      this.setStencilOp(
        stencilOpFail,
        stencilOpZfail,
        stencilOpZpass
      );
      if( stencilOpFail  !== stencilBOpFail   ||
          stencilOpZfail !== stencilBOpZfail  ||
          stencilOpZpass !== stencilBOpZpass ) {
        this.setStencilOpBack(
          stencilBOpFail,
          stencilBOpZfail,
          stencilBOpZpass
        );
      }

      this.setStencilMask( stencilWriteMask );
      if( stencilWriteMask !== stencilBWriteMask ){
        this.setStencilMaskBack( stencilBWriteMask );
      }


      this.setDepthFunc(
        gl.getParameter( gl.DEPTH_FUNC )
      );

      this.setCulling(
        gl.getParameter( gl.CULL_FACE_MODE )
      );

      this.setFaceDir(
        gl.getParameter( gl.FRONT_FACE )
      );


    },

    /*
      enums
        ZERO
        ONE
        SRC_COLOR
        ONE_MINUS_SRC_COLOR
        SRC_ALPHA
        ONE_MINUS_SRC_ALPHA
        DST_ALPHA
        ONE_MINUS_DST_ALPHA
        DST_COLOR
        ONE_MINUS_DST_COLOR
        SRC_ALPHA_SATURATE
    */
    setBlendFunction : function( src, dst ){
      this._cfg[ BLEND_FUNC_C_SRC ] = src;
      this._cfg[ BLEND_FUNC_C_DST ] = dst;
      this._set |= BLEND_FUNC_SET;
    },

    /*
      enums
        BLEND_DST_RGB
        BLEND_SRC_RGB
        BLEND_DST_ALPHA
        BLEND_SRC_ALPHA
        CONSTANT_COLOR
        ONE_MINUS_CONSTANT_COLOR
        CONSTANT_ALPHA
        ONE_MINUS_CONSTANT_ALPHA
        BLEND_COLOR
    */
    setBlendFunctionSeparate: function( srcRgb, dstRgb, srcAlpha, dstAlpha ){
      this._cfg[ BLEND_FUNC_C_SRC ] = srcRgb;
      this._cfg[ BLEND_FUNC_C_DST ] = dstRgb;
      this._cfg[ BLEND_FUNC_A_SRC ] = srcAlpha;
      this._cfg[ BLEND_FUNC_A_DST ] = dstAlpha;
      this._set |= SEP_FUNC_SET | BLEND_FUNC_A_SET;
    },

    setBlendEquation : function( eq ){
      this._cfg[ BLEND_EQ_C ] = eq;
      this._set |= BLEND_OP_SET;
    },

    /*
      enums
        FUNC_ADD
        BLEND_EQUATION
        BLEND_EQUATION_ALPHA
    */
    setBlendEquationSeparate : function( cEq, aEq ){
      this._cfg[ BLEND_EQ_C] = src;
      this._cfg[ BLEND_EQ_A ] = dst;
      this._set |= BLEND_OP_SET | BLEND_EQ_A_SET;
    },



    /*
      enums
        NEVER
        LESS
        EQUAL
        LEQUAL
        GREATER
        NOTEQUAL
        GEQUAL
        ALWAYS

    */
    setDepthFunc : function( func ){
      this._cfg[ DEPTH_FUNC ] = func;
      this._set |= DEPTH_FUNC_SET;
    },

    /*
      enums
        FRONT
        BACK
        FRONT_AND_BACK
    */
    setCulling : function( mode ){
      this._cfg[ CULL_MODE ] = mode;
      this._set |= CULL_MODE_SET;
    },


    /*
      enums
        CW
        CCW
    */
    setFaceDir : function( dir ){
      this._cfg[ FACE_DIR ] = dir;
      this._set |= FACE_DIR_SET;
    },


    setStencilFunc : function( func, ref, mask ){
      this._cfg[ STENCIL_FUNC ] = func;
      this._cfg[ STENCIL_REF ] = ref;
      this._cfg[ STENCIL_VALUE_MASK ] = mask;
      this._set |= STENCIL_FUNC_SET;
      // TODO !! unset BACK
    },

    setStencilOp : function( sfail, dpfail, dppass ){
      this._cfg[ STENCIL_OP_FAIL ] = sfail;
      this._cfg[ STENCIL_OP_ZFAIL] = dpfail;
      this._cfg[ STENCIL_OP_ZPASS ] = dppass;
      this._set |= STENCIL_OP_SET;
      // TODO !! unset BACK
    },

    setStencilMask : function( mask ){
      this._cfg[ STENCIL_WRITEMASK ] = mask;
      this._set |= STENCIL_MASK_SET;
      // TODO !! unset BACK
    },



    setStencilFuncBack : function( func, ref, mask ){
      this._cfg[ STENCIL_B_FUNC ] = func;
      this._cfg[ STENCIL_B_REF ] = ref;
      this._cfg[ STENCIL_B_VALUE_MASK ] = mask;
      this._set |= STENCIL_B_FUNC_SET;
    },

    setStencilOpBack : function( sfail, dpfail, dppass ){
      this._cfg[ STENCIL_B_OP_FAIL ] = sfail;
      this._cfg[ STENCIL_B_OP_ZFAIL] = dpfail;
      this._cfg[ STENCIL_B_OP_ZPASS ] = dppass;
      this._set |= STENCIL_B_OP_SET;
    },

    setStencilMaskBack : function( mask ){
      this._cfg[ STENCIL_B_WRITEMASK ] = mask;
      this._set |= STENCIL_B_MASK_SET;
    },


    setup : function( gl ){

    }


  };

  return GLConfig;

});