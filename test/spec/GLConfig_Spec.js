define(
  [
    'expect',
    'spec/aequal',
    'eagl/objects/Object3D',
    'eagl/gl/GLConfig',
    'eagl/gl/GLEnum'
  ],
  function( expect, aequal, Object3D, GLConfig, GLEnum ){

    var gl, defaultCfg;

    var bin = function( str ){
      return parseInt( str, 2 );
    };

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

    var equalConfig = function( cfgA, cfgB ){
      aequal( cfgA._dat, cfgB._dat );
      expect( cfgA._set ).to.be.equal( cfgB._set );
    }

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

      if( ! hasWebgl() ) {
        console.log( "no webgl" );
        return;
      }

      beforeEach(function(){

        gl = document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
        defaultCfg = new GLConfig();
        defaultCfg.toDefault();

      })

      describe( "fromGL / toDefault", function(){


        it( "should fullfill a default config", function(){

          var cfg = new GLConfig();
          cfg.fromGL( gl );

          expect( gl ).to.be.ok();
          expect( cfg._set ).to.be.equal( defaultCfg._set );
          aequal( cfg._dat, defaultCfg._dat );

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

        it( "should setup gl context", function(){
          var cfg = new GLConfig();
          cfg.toDefault();
          cfg.setBlendEquation( gl.FUNC_SUBTRACT );
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


      });

      describe( "xx", function(){

        it( "xx", function(){

        });

      });

    });

  }
);