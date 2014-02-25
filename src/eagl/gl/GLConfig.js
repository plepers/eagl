

define( function( ){

/*

blend func

depth test

culling

stencil


*/

  const BLEND_EQ_C            = 0,    // BlendingFactorDest
        BLEND_FUNC_C_DST      = 1,    // Separate Blend Functions
        BLEND_FUNC_C_SRC      = 2,
        BLEND_EQ_A            = 3,    // BlendingFactorSrc   //
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

        BLEND_EQ_SET        = 1 << 0,
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
        STENCIL_B_MASK_SET  = 1 << 12,


        DAT_MASKS = [
            BLEND_EQ_SET,
            BLEND_FUNC_SET,
            BLEND_FUNC_SET,
            BLEND_EQ_A_SET,
            BLEND_FUNC_A_SET,
            BLEND_FUNC_A_SET,
            DEPTH_FUNC_SET,
            CULL_MODE_SET,
            FACE_DIR_SET,
            STENCIL_FUNC_SET,
            STENCIL_FUNC_SET,
            STENCIL_FUNC_SET,
            STENCIL_OP_SET,
            STENCIL_OP_SET,
            STENCIL_OP_SET,
            STENCIL_MASK_SET,
            STENCIL_B_FUNC_SET,
            STENCIL_B_FUNC_SET,
            STENCIL_B_FUNC_SET,
            STENCIL_B_OP_SET,
            STENCIL_B_OP_SET,
            STENCIL_B_OP_SET,
            STENCIL_B_MASK_SET
          ],

        SETS_LEN = 13,

        _DEFAULT_SET = 1011,

        _DEFAULT_STATE = new Uint16Array([
          32774,   // BLEND_EQ_C            :   FUNC_ADD
          0,       // BLEND_FUNC_C_DST      :   ZERO
          1,       // BLEND_FUNC_C_SRC      :   ONE
          0,       // BLEND_EQ_A            :   --
          0,       // BLEND_FUNC_A_DST      :   --
          0,       // BLEND_FUNC_A_SRC      :   --
          513,     // DEPTH_FUNC            :   gl.LESS
          1029,    // CULL_MODE             :   gl.BACK
          2305,    // FACE_DIR              :   gl.CCW
          519,     // STENCIL_FUNC          :   gl.ALWAYS
          0,       // STENCIL_REF           :   0x0
          65535,   // STENCIL_VALUE_MASK    :   0xFFFF
          65535,   // STENCIL_WRITEMASK     :   0xFFFF
          7680,    // STENCIL_OP_FAIL       :   gl.KEEP
          7680,    // STENCIL_OP_ZFAIL      :   gl.KEEP
          7680,    // STENCIL_OP_ZPASS      :   gl.KEEP
          0,       // STENCIL_B_FUNC        :   --
          0,       // STENCIL_B_REF         :   --
          0,       // STENCIL_B_VALUE_MASK  :   --
          0,       // STENCIL_B_WRITEMASK   :   --
          0,       // STENCIL_B_OP_FAIL     :   --
          0,       // STENCIL_B_OP_ZFAIL    :   --
          0,       // STENCIL_B_OP_ZPASS    :   --
          0        // SCISSOR_TEST          :   gl.NONE
        ]);



  GLConfig.ConfigStack = ConfigStack;


  //  ╔═╗╔╦╗╔═╗╔═╗╦╔═
  //  ╚═╗ ║ ╠═╣║  ╠╩╗
  //  ╚═╝ ╩ ╩ ╩╚═╝╩ ╩

  const MIN_ALLOC = 32

  function ConfigStack(){
    this.currentCongig = new GLConfig();
    this._stack = new Uint16Array( LEN * MIN_ALLOC );
    this._sets = new Uint16Array( MIN_ALLOC );
    this._size = MIN_ALLOC;
    this._ptr = 0;
  }

  ConfigStack.prototype = {


    push : function( cfg ){
      var ptr = this._ptr,
          sset = this._sets[ptr++],
          lset=  cfg._set,
          sptr, sdat, ldat, i;

      if( ptr == this._size ){
        this._grow();
      }

      this._sets[ptr] = sset | lset;
      this._ptr = ptr;
      sptr = ptr*LEN;

      sdat = this._stack;
      ldat = cfg._dat;

      for( i = 0; i < LEN; i++ )
      {
        if( 0 !== ( lset & DAT_MASKS[ i ] ) )
        {
          sdat[ sptr+i ] = ldat[ i ];
        }
      }

    },

    pop : function() {
      this._ptr--;
    },

    _grow : function(){
      var s      = this._size << 1,
          stack  = new Uint16Array( s * LEN ),
          sets   = new Uint16Array( s );

      stack.set(  this._stack, 0 );
      sets.set(  this._sets, 0 );

      this._stack = stack;
      this._sets = sets;
      this._size = s;
    }

  };


  //  ╔═╗╔═╗╔╗╔╔═╗╦╔═╗
  //  ║  ║ ║║║║╠╣ ║║ ╦
  //  ╚═╝╚═╝╝╚╝╚  ╩╚═╝

  getP = function( gl, p ){
    return gl.getParameter( p );
  };

  function GLConfig(){
    this._dat = new Uint16Array( LEN );
    this._set = 0;
  }

  GLConfig.prototype = {

    toDefault : function(){
      this._dat.set( _DEFAULT_STATE );
      this._set = _DEFAULT_SET;
    },

    setupGL : function( gl ){
      var set = this._set,
          dat = this._dat,
          i;


      // Blend Equation

      i = set & (BLEND_EQ_SET|BLEND_EQ_A_SET);

      if ( i !== 0 ) {

        ( i === (BLEND_EQ_SET|BLEND_EQ_A_SET) )
          ? gl.blendEquationSeparate( dat[ BLEND_EQ_C ], dat[ BLEND_EQ_A ] )
          : gl.blendEquation( dat[ BLEND_EQ_C ] );

      }


      // Blend Function
      i = set & (BLEND_FUNC_SET|BLEND_FUNC_A_SET);

      if ( i === 0 )
        gl.disable( gl.BLEND );

      else {
        gl.enable( gl.BLEND );

        ( i === (BLEND_FUNC_SET|BLEND_FUNC_A_SET) )
          ? gl.blendFuncSeparate( dat[ BLEND_FUNC_C_SRC ], dat[ BLEND_FUNC_C_DST ], dat[ BLEND_FUNC_A_SRC ], dat[ BLEND_FUNC_A_DST ] )
          : gl.blendFunc( dat[ BLEND_FUNC_C_SRC ], dat[ BLEND_FUNC_C_DST ] );
      }


      // Blend Function
      if ( set & DEPTH_FUNC_SET === DEPTH_FUNC_SET ){
        gl.depthFunc( dat[ DEPTH_FUNC ] );
      }
      // culling mode (front/back/front_and_back)
      if ( set & CULL_MODE === CULL_MODE ){
        gl.cullFace( dat[ CULL_MODE ] );
      }
      // face direction (cw/ccw)
      if ( set & FACE_DIR === FACE_DIR ){
        gl.frontFace( dat[ FACE_DIR ] );
      }


     // Stencil Function
      i = set & (STENCIL_FUNC_SET|STENCIL_B_FUNC_SET);

      if ( i === 0 )
        gl.disable( gl.STENCIL_TEST );

      else {
        gl.enable( gl.STENCIL_TEST );

        if( i === (STENCIL_FUNC_SET|STENCIL_B_FUNC_SET) ){
          gl.stencilFuncSeparate( gl.FRONT, dat[ STENCIL_FUNC ], dat[ STENCIL_REF ], dat[ STENCIL_VALUE_MASK ] );
          gl.stencilFuncSeparate( gl.BACK, dat[ STENCIL_B_FUNC ], dat[ STENCIL_B_REF ], dat[ STENCIL_B_VALUE_MASK ] );
        } else {
          gl.stencilFunc( dat[ STENCIL_FUNC ], dat[ STENCIL_REF ], dat[ STENCIL_VALUE_MASK ] );
        }
      }

    },


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
      this._dat[ BLEND_FUNC_C_SRC ] = src;
      this._dat[ BLEND_FUNC_C_DST ] = dst;
      this._set = this._set & ~BLEND_FUNC_A_SET | BLEND_FUNC_SET;
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
      this._dat[ BLEND_FUNC_C_SRC ] = srcRgb;
      this._dat[ BLEND_FUNC_C_DST ] = dstRgb;
      this._dat[ BLEND_FUNC_A_SRC ] = srcAlpha;
      this._dat[ BLEND_FUNC_A_DST ] = dstAlpha;
      this._set |= BLEND_FUNC_SET | BLEND_FUNC_A_SET;
    },

    setBlendEquation : function( eq ){
      this._dat[ BLEND_EQ_C ] = eq;
      this._set = this._set & ~BLEND_EQ_A_SET | BLEND_EQ_SET;
    },

    /*
      enums
        FUNC_ADD
        BLEND_EQUATION
        BLEND_EQUATION_ALPHA
    */
    setBlendEquationSeparate : function( rgbEq, alphaEq ){
      this._dat[ BLEND_EQ_C] = rgbEq;
      this._dat[ BLEND_EQ_A ] = alphaEq;
      this._set |= BLEND_EQ_SET | BLEND_EQ_A_SET;
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
      this._dat[ DEPTH_FUNC ] = func;
      this._set |= DEPTH_FUNC_SET;
    },

    /*
      enums
        FRONT
        BACK
        FRONT_AND_BACK
    */
    setCulling : function( mode ){
      this._dat[ CULL_MODE ] = mode;
      this._set |= CULL_MODE_SET;
    },


    /*
      enums
        CW
        CCW
    */
    setFaceDir : function( dir ){
      this._dat[ FACE_DIR ] = dir;
      this._set |= FACE_DIR_SET;
    },


    setStencilFunc : function( func, ref, mask ){
      this._dat[ STENCIL_FUNC ] = func;
      this._dat[ STENCIL_REF ] = ref;
      this._dat[ STENCIL_VALUE_MASK ] = mask;
      this._set |= STENCIL_FUNC_SET;
      // TODO !! unset BACK
    },

    setStencilOp : function( sfail, dpfail, dppass ){
      this._dat[ STENCIL_OP_FAIL ] = sfail;
      this._dat[ STENCIL_OP_ZFAIL] = dpfail;
      this._dat[ STENCIL_OP_ZPASS ] = dppass;
      this._set |= STENCIL_OP_SET;
      // TODO !! unset BACK
    },

    setStencilMask : function( mask ){
      this._dat[ STENCIL_WRITEMASK ] = mask;
      this._set |= STENCIL_MASK_SET;
      // TODO !! unset BACK
    },



    setStencilFuncBack : function( func, ref, mask ){
      this._dat[ STENCIL_B_FUNC ] = func;
      this._dat[ STENCIL_B_REF ] = ref;
      this._dat[ STENCIL_B_VALUE_MASK ] = mask;
      this._set |= STENCIL_B_FUNC_SET;
    },

    setStencilOpBack : function( sfail, dpfail, dppass ){
      this._dat[ STENCIL_B_OP_FAIL ] = sfail;
      this._dat[ STENCIL_B_OP_ZFAIL] = dpfail;
      this._dat[ STENCIL_B_OP_ZPASS ] = dppass;
      this._set |= STENCIL_B_OP_SET;
    },

    setStencilMaskBack : function( mask ){
      this._dat[ STENCIL_B_WRITEMASK ] = mask;
      this._set |= STENCIL_B_MASK_SET;
    }

  };

  return GLConfig;

});