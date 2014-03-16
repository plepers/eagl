define(
  [
    'expect',
    'utils/aequal',
    'eagl/objects/Object3D',
    'eagl/gl/GLConfig',
    'eagl/gl/GLEnum',
    'utils/capabilities',
    'utils/mock/GLContext'
  ],
  function( expect, aequal, Object3D, GLConfig, GLEnum, capabilities, MockContext ){

    var gl, defaultCfg,
        haveWebgl = capabilities.webgl();

    var bin = function( str ){
      return parseInt( str, 2 );
    };


    var itGl = function(desc, fn){
      if( haveWebgl )
        it( desc, fn );
    };

    var equalConfig = function( cfgA, cfgB ){
      aequal( cfgA._dat, cfgB._dat );
      expect( cfgA._set ).to.be.equal( cfgB._set );
    };

    var compareFromGl = function( cfg, gl ){
      var ref = new GLConfig();
      ref.fromGL( gl );
      equalConfig( cfg, ref );
    };

    var logState = function( cfg ){
      var a = cfg._dat;
      var str = '\n';
      str += 'sets : '+cfg._set.toString( 2 )+'\n';
      for( var i=0, l=a.length; i<l; i++ ) {
        str += ( GLEnum.getString( a[i] ) || a[i].toString(16) ) + '\n';
      }
      console.log( str );
    };

    describe( "gl - GLConfig", function(){

      beforeEach(function(){

        if( haveWebgl )
          gl = document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
        else
          gl = new MockContext();

        defaultCfg = new GLConfig();
        defaultCfg.toDefault();

      })

      describe( "toDefault", function(){


        itGl( "should fullfill a standard default gl context state", function(){

          var cfg = new GLConfig();
          cfg.toDefault();

          expect( gl ).to.be.ok();
          expect( cfg._set ).to.be.equal( 1011 );
          // todo check datas

        });

      });

      describe( "fromGL", function(){


        itGl( "should fullfill a default config", function(){

          var cfg = new GLConfig();
          cfg.fromGL( gl );

          expect( gl ).to.be.ok();
          expect( cfg._set ).to.be.equal( defaultCfg._set );
          aequal( cfg._dat, defaultCfg._dat );

        });

      });


      describe( "clone", function(){


        it( "should copy set and datas", function(){

          var cfg = new GLConfig();
          cfg.toDefault();

          var clone = cfg.clone();

          expect( cfg._set ).to.be.equal( clone._set );
          aequal( cfg._dat, clone._dat );

        });

        it( "should not be affected by referrer modifications", function(){

          var cfg = new GLConfig();
          cfg.toDefault();

          var clone = cfg.clone();

          cfg.setBlendFunction( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

          expect( clone._dat[1] ).to.be.equal( gl.ZERO );
          expect( clone._dat[2] ).to.be.equal( gl.ONE );

        });

      });

      describe( "patch", function(){

        it( "equal configs should return unset patch", function(){
          var cfg1 = new GLConfig(),
              cfg2 = new GLConfig(),
              patch = new GLConfig();
          cfg1.toDefault();
          cfg2.toDefault();
          cfg1.patch( cfg2 , patch );
          expect( patch._set ).to.be.equal( 0 );
        });

        it( "an unset config just return input", function(){
          var cfg1 = new GLConfig(),
              cfg2 = new GLConfig(),
              patch = new GLConfig();

          cfg2.toDefault();
          cfg2.patch( cfg1 , patch );
          expect( patch._set ).to.be.equal( cfg2._set );
          aequal( patch._dat, cfg2._dat );
        });

        it( "with unset config just return unset patch", function(){
          var cfg1 = new GLConfig(),
              cfg2 = new GLConfig(),
              patch = new GLConfig();

          cfg2.toDefault();
          cfg1.patch( cfg2 , patch );
          expect( patch._set ).to.be.equal( 0 );
        });


        it( "config with different values should have set and correct value", function(){
          var cfg1 = new GLConfig(),
              cfg2 = new GLConfig(),
              patch = new GLConfig();


          cfg1.setBlendFunction( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
          cfg2.setBlendFunction( gl.SRC_ALPHA, gl.ZERO );


          cfg2.patch( cfg1 , patch );
          expect( patch._set ).to.be.equal( bin( '010' ) );
          expect( patch._dat[1] ).to.be.equal( gl.ZERO );
          expect( patch._dat[2] ).to.be.equal( gl.SRC_ALPHA );
        });

        it( "config with *separate should have consistent set", function(){
          var cfg1 = new GLConfig(),
              cfg2 = new GLConfig(),
              patch = new GLConfig();


          cfg1.setBlendFunction( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
          cfg2.setBlendFunctionSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );


          cfg2.patch( cfg1 , patch );
          expect( patch._set ).to.be.equal( bin( '1010' ) );
          expect( patch._dat[1] ).to.be.equal( gl.ONE_MINUS_SRC_ALPHA );
          expect( patch._dat[2] ).to.be.equal( gl.SRC_ALPHA );
          expect( patch._dat[4] ).to.be.equal( gl.ZERO );
          expect( patch._dat[5] ).to.be.equal( gl.ONE );
        });


      });

      describe( "setBlendFunction", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setBlendFunction( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
          expect( cfg._set ).to.be.equal( bin( '010' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setBlendFunction( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
          expect( cfg._dat[1] ).to.be.equal( gl.ONE_MINUS_SRC_ALPHA );
          expect( cfg._dat[2] ).to.be.equal( gl.SRC_ALPHA );
        });

        it( "should unset separate", function(){
          var cfg = new GLConfig();
          cfg.setBlendFunctionSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
          cfg.setBlendFunction( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
          expect( cfg._set ).to.be.equal( bin( '010' ) );
        });

        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setBlendFunction( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });


      describe( "setBlendFunctionSeparate", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setBlendFunctionSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
          expect( cfg._set ).to.be.equal( bin( '1010' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setBlendFunctionSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
          expect( cfg._dat[1] ).to.be.equal( gl.ONE_MINUS_SRC_ALPHA );
          expect( cfg._dat[2] ).to.be.equal( gl.SRC_ALPHA );
          expect( cfg._dat[4] ).to.be.equal( gl.ZERO );
          expect( cfg._dat[5] ).to.be.equal( gl.ONE );
        });

        it( "should set over not separate", function(){
          var cfg = new GLConfig();
          cfg.setBlendFunction( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
          cfg.setBlendFunctionSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
          expect( cfg._set ).to.be.equal( bin( '1010' ) );
        });

        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setBlendFunctionSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });

      describe( "setBlendEquation", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setBlendEquation( gl.FUNC_SUBTRACT );
          expect( cfg._set ).to.be.equal( bin( '001' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setBlendEquation( gl.FUNC_SUBTRACT );
          expect( cfg._dat[0] ).to.be.equal( gl.FUNC_SUBTRACT );
        });

        it( "should unset separate", function(){
          var cfg = new GLConfig();
          cfg.setBlendEquationSeparate( gl.FUNC_SUBTRACT, gl.FUNC_ADD );
          cfg.setBlendEquation( gl.FUNC_REVERSE_SUBTRACT );

          expect( cfg._set ).to.be.equal( bin( '001' ) );
        });

        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setBlendEquation( gl.FUNC_SUBTRACT );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });

      describe( "setBlendEquationSeparate", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setBlendEquationSeparate( gl.FUNC_ADD, gl.FUNC_SUBTRACT );
          expect( cfg._set ).to.be.equal( bin( '101' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setBlendEquationSeparate( gl.FUNC_ADD, gl.FUNC_SUBTRACT );
          expect( cfg._dat[0] ).to.be.equal( gl.FUNC_ADD );
          expect( cfg._dat[3] ).to.be.equal( gl.FUNC_SUBTRACT );
        });

        it( "should unset separate", function(){
          var cfg = new GLConfig();
          cfg.setBlendEquation( gl.FUNC_REVERSE_SUBTRACT );
          cfg.setBlendEquationSeparate( gl.FUNC_SUBTRACT, gl.FUNC_ADD );
          expect( cfg._set ).to.be.equal( bin( '101' ) );
        });

        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setBlendEquationSeparate( gl.FUNC_SUBTRACT, gl.FUNC_ADD );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });


      describe( "setDepthFunc", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setDepthFunc( gl.GREATER );
          expect( cfg._set ).to.be.equal( bin( '10000' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setDepthFunc( gl.GREATER );
          expect( cfg._dat[6] ).to.be.equal( gl.GREATER );
        });


        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setDepthFunc( gl.GREATER );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );

          cfg.setDepthFunc( gl.LESS );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });



      describe( "setCulling", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setCulling( gl.FRONT_AND_BACK );
          expect( cfg._set ).to.be.equal( bin( '100000' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setCulling( gl.FRONT_AND_BACK );
          expect( cfg._dat[7] ).to.be.equal( gl.FRONT_AND_BACK );
        });


        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setCulling( gl.FRONT_AND_BACK );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
          cfg.setCulling( gl.BACK );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });



      describe( "setFaceDir", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setFaceDir( gl.CW );
          expect( cfg._set ).to.be.equal( bin( '1000000' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setFaceDir( gl.CW );
          expect( cfg._dat[8] ).to.be.equal( gl.CW );
        });


        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();

          cfg.setFaceDir( gl.CW );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );

          cfg.setFaceDir( gl.CCW );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });

      describe( "setStencilFunc", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setStencilFunc( gl.GEQUAL, 0, 5 );
          expect( cfg._set ).to.be.equal( bin( '10000000' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setStencilFunc( gl.GEQUAL, 10, 5 );
          expect( cfg._dat[9] ).to.be.equal( gl.GEQUAL );
          expect( cfg._dat[10] ).to.be.equal( 10 );
          expect( cfg._dat[11] ).to.be.equal( 5 );
        });


        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setStencilFunc( gl.GEQUAL, 0, 5 );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });


      describe( "setStencilOp", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setStencilOp( gl.DECR_WRAP, gl.REPLACE, gl.INVERT );
          expect( cfg._set ).to.be.equal( bin( '100000000' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setStencilOp( gl.DECR_WRAP, gl.REPLACE, gl.INVERT );
          expect( cfg._dat[13] ).to.be.equal( gl.DECR_WRAP );
          expect( cfg._dat[14] ).to.be.equal( gl.REPLACE );
          expect( cfg._dat[15] ).to.be.equal( gl.INVERT );
        });


        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setStencilOp( gl.DECR_WRAP, gl.REPLACE, gl.INVERT );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });


      describe( "setStencilMask", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setStencilMask( 8 );
          expect( cfg._set ).to.be.equal( bin( '1000000000' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setStencilMask( 9 );
          expect( cfg._dat[12] ).to.be.equal( 9 );
        });


        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setStencilMask( 9 );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });

//===================================== separate

      describe( "setStencilFuncSeparate", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setStencilFuncSeparate( gl.GEQUAL, 40, 5, gl.NOTEQUAL, 20, 22 );
          expect( cfg._set ).to.be.equal( bin( '10010000000' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setStencilFuncSeparate( gl.GEQUAL, 40, 5, gl.NOTEQUAL, 20, 22 );
          expect( cfg._dat[9] ).to.be.equal( gl.GEQUAL );
          expect( cfg._dat[10] ).to.be.equal( 40 );
          expect( cfg._dat[11] ).to.be.equal( 5 );
          expect( cfg._dat[16] ).to.be.equal( gl.NOTEQUAL );
          expect( cfg._dat[17] ).to.be.equal( 20 );
          expect( cfg._dat[18] ).to.be.equal( 22 );
        });


        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setStencilFuncSeparate( gl.GEQUAL, 0, 5, gl.NOTEQUAL, 0, 22 );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });


      describe( "setStencilOpSeparate", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setStencilOpSeparate( gl.DECR_WRAP, gl.REPLACE, gl.INVERT, gl.INVERT, gl.DECR_WRAP, gl.REPLACE );
          expect( cfg._set ).to.be.equal( bin( '100100000000' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setStencilOpSeparate( gl.DECR_WRAP, gl.REPLACE, gl.INVERT, gl.INVERT, gl.DECR_WRAP, gl.REPLACE );
          expect( cfg._dat[13] ).to.be.equal( gl.DECR_WRAP );
          expect( cfg._dat[14] ).to.be.equal( gl.REPLACE );
          expect( cfg._dat[15] ).to.be.equal( gl.INVERT );
          expect( cfg._dat[20] ).to.be.equal( gl.INVERT );
          expect( cfg._dat[21] ).to.be.equal( gl.DECR_WRAP );
          expect( cfg._dat[22] ).to.be.equal( gl.REPLACE );
        });


        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setStencilOpSeparate( gl.DECR_WRAP, gl.REPLACE, gl.INVERT, gl.INVERT, gl.DECR_WRAP, gl.REPLACE );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });


      describe( "setStencilMaskSeparate", function(){

        it( "should fill correct set", function(){
          var cfg = new GLConfig();
          cfg.setStencilMaskSeparate( 8, 16 );
          expect( cfg._set ).to.be.equal( bin( '1001000000000' ) );
        });


        it( "should fill correct cfg", function(){
          var cfg = new GLConfig();
          cfg.setStencilMaskSeparate( 9, 15 );
          expect( cfg._dat[12] ).to.be.equal( 9 );
          expect( cfg._dat[19] ).to.be.equal( 15 );
        });


        itGl( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setStencilMaskSeparate( 9, 15 );
          cfg.setupGL( gl );
          compareFromGl( cfg, gl );
        });

      });



    });

  }
);