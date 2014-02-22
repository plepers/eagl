

define( function( ){

/*

blend func

depth test

culling

stencil


*/

  var BLEND_DST           = 0,    // BlendingFactorDest
      BLEND_SRC           = 1,    // BlendingFactorSrc
      BLEND_SEP_DST       = 2,    // BlendEquationSeparate
      BLEND_SEP_SRC       = 3,    //

      SEP_FUNC_C_DST      = 4,    // Separate Blend Functions
      SEP_FUNC_C_SRC      = 5,
      SEP_FUNC_A_DST      = 6,
      SEP_FUNC_A_SRC      = 7,

      DEPTH_FUNC          = 8,    // DepthFunction

      CULL_MODE           = 5,    // CullFaceMode
      FACE_DIR            = 6,    // FrontFaceDirection

      STENCIL_FUNC        = 7,    // StencilFunction
      STENCIL_OP          = 8,    // StencilOp

      SCISSOR_TEST        = 9,    // SCISSOR_TEST

      LEN = 10,

      BLEND_SET           = 1 << 0,
      BLEND_SEP_SET       = 1 << 1,
      SEP_FUNC_SET        = 1 << 2,
      DEPTH_FUNC_SET      = 1 << 3,
      CULL_MODE_SET       = 1 << 4,
      FACE_DIR_SET        = 1 << 5,
      STENCIL_FUNC_SET    = 1 << 6,
      STENCIL_OP_SET      = 1 << 7;


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

  function GLConfig(){
    this._cfg = new Uint16Array( LEN );
    this._set = 0;
  }

  GLConfig.prototype = {


    fromGL : function( gl ){

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
    setBlendFactor : function( src, dst ){
      this._cfg[ BLEND_SRC ] = src;
      this._cfg[ BLEND_DST ] = dst;
      this._set |= BLEND_SET;
    },

    /*
      enums
        FUNC_ADD
        BLEND_EQUATION
        BLEND_EQUATION_ALPHA
    */
    setBlendEquationSeparate : function( src, dst ){
      this._cfg[ BLEND_SEP_SRC ] = src;
      this._cfg[ BLEND_SEP_DST ] = dst;
      this._set |= BLEND_SEP_SET;
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
    setSeparateBlendFunction: function( srcRgb, dstRgb, srcAlpha, dstAlpha ){
      this._cfg[ SEP_FUNC_C_SRC ] = srcRgb;
      this._cfg[ SEP_FUNC_C_DST ] = dstRgb;
      this._cfg[ SEP_FUNC_A_SRC ] = srcAlpha;
      this._cfg[ SEP_FUNC_A_DST ] = dstAlpha;
      this._set |= SEP_FUNC_SET;
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
      this._cfg[ CULL_MODE ] = func;
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

    /*
      enums
        CW
        CCW
    */
    setStencilFunc : function( func ){
      this._cfg[ STENCIL_FUNC ] = func;
      this._set |= STENCIL_FUNC_SET;
    },

        /*
      enums
        CW
        CCW
    */
    setStencilOp : function( op ){
      this._cfg[ STENCIL_OP ] = op;
      this._set |= STENCIL_OP_SET;
    },


    setup : function( gl ){

    }


  };

  return GLConfig;

});