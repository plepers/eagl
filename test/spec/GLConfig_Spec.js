define(
  [
    'expect',
    'spec/aequal',
    'eagl/objects/Object3D',
    'eagl/gl/GLConfig',
    'eagl/gl/GLEnum'
  ],
  function( expect, aequal, Object3D, GLConfig, GLEnum ){

    var gl, defaultGLState, defaultSet;



    var hasWebgl = function(){
      if( document != undefined ){
        var canvas = document.createElement( 'canvas' );
        if( canvas != undefined ){
          var gl = canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' );
          if( gl != null )
            return true;
        }
      }
      return false;
    };

    var logState = function( cfg ){
      var a = cfg._cfg;
      var str = '\n';
      str += 'sets : '+cfg._set.toString( 2 )+'\n';
      for( var i=0, l=a.length; i<l; i++ ) {
        str += ( GLEnum.getString( a[i] ) || a[i].toString(16) ) + '\n';
      }
      console.log( str );
    };

    describe( "gl - GLConfig", function(){

      if( ! hasWebgl() ) {
        console.log( "no webgl" );
        return;
      }

      beforeEach(function(){

        gl = document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
        defaultSet = 1011;
        defaultGLState = [

          gl.FUNC_ADD,  //BLEND_EQ_C
          gl.NONE,      //BLEND_EQ_A
          gl.NONE,      //BLEND_FUNC_C_DST
          gl.ONE,       //BLEND_FUNC_C_SRC
          gl.NONE,      //BLEND_FUNC_A_DST
          gl.NONE,      //BLEND_FUNC_A_SRC
          gl.LESS,      //DEPTH_FUNC
          gl.BACK,      //CULL_MODE
          gl.CCW,       //FACE_DIR
          gl.ALWAYS,    //STENCIL_FUNC
          gl.NONE,      //STENCIL_REF
          0xFFFF,       //STENCIL_VALUE_MASK
          0xFFFF,       //STENCIL_WRITEMASK
          gl.KEEP,      //STENCIL_OP_FAIL
          gl.KEEP,      //STENCIL_OP_ZFAIL
          gl.KEEP,      //STENCIL_OP_ZPASS
          gl.NONE,      //STENCIL_B_FUNC
          gl.NONE,      //STENCIL_B_REF
          gl.NONE,      //STENCIL_B_VALUE_MASK
          gl.NONE,      //STENCIL_B_WRITEMASK
          gl.NONE,      //STENCIL_B_OP_FAIL
          gl.NONE,      //STENCIL_B_OP_ZFAIL
          gl.NONE,      //STENCIL_B_OP_ZPASS
          gl.NONE       //SCISSOR_TEST

        ]

      })

      describe( "fetch", function(){


        it( "should fullfill config", function(){

          var cfg = new GLConfig();
          cfg.fromGL( gl );

          // logState( cfg );

          expect( gl ).to.be.ok();
          expect( cfg._set ).to.be.equal( defaultSet );
          aequal( cfg._cfg, defaultGLState );

        });

      });

    });

  }
);