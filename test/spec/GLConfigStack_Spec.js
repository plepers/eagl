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
  function(
    expect,
    aequal,
    Object3D,
    GLConfig,
    GLEnum,
    capabilities,
    MockContext
  ){

    var gl, defaultCfg,
        haveWebgl = capabilities.webgl();

    function bin( str ){
      return parseInt( str, 2 );
    };

    function itGl(desc, fn){
      if( haveWebgl )
        it( desc, fn );
    };

    function equalConfig( cfgA, cfgB ){
      aequal( cfgA._dat, cfgB._dat );
      expect( cfgA._set ).to.be.equal( cfgB._set );
    };


    function getComplexConfig(){
      var cfg = new GLConfig();

      cfg.setBlendEquationSeparate(
        gl.FUNC_SUBTRACT,
        gl.FUNC_REVERSE_SUBTRACT
      );

      cfg.setBlendFunctionSeparate(
        gl.SRC_ALPHA,
        gl.ONE_MINUS_SRC_ALPHA,
        gl.SRC_COLOR,
        gl.ONE_MINUS_SRC_COLOR
      );

      cfg.setDepthFunc( gl.ALWAYS );

      cfg.setCulling( gl.FRONT );
      cfg.setFaceDir( gl.CW );


      cfg.setStencilMaskSeparate( 8, 16 );
      cfg.setStencilOpSeparate( gl.DECR_WRAP, gl.REPLACE, gl.INVERT, gl.INVERT, gl.DECR_WRAP, gl.REPLACE );
      cfg.setStencilFuncSeparate( gl.GEQUAL, 40, 5, gl.NOTEQUAL, 20, 22 );

      return cfg;
    }

    describe( "gl - GLConfigStack", function(){

      beforeEach(function(){

        if( haveWebgl )
          gl = document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
        else
          gl = new MockContext();

        stack = new GLConfig.ConfigStack();

        defaultCfg = new GLConfig();
        defaultCfg.toDefault();

      })

      describe( "push", function(){


        it( "first config should set head to this config", function(){

          var cfg = getComplexConfig();

          stack.push( cfg );

          var head = stack._head;

          equalConfig( head, cfg );

        });

        it( "should setup head datas with diffs", function(){

          stack.push( defaultCfg );

          var cfg = new GLConfig();
          cfg.setBlendFunction( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

          stack.push( cfg );

          var head = stack._head;


          expect( head._dat[0] ).to.be.equal( gl.FUNC_ADD );
          expect( head._dat[1] ).to.be.equal( gl.ONE_MINUS_SRC_ALPHA );
          expect( head._dat[2] ).to.be.equal( gl.SRC_ALPHA );

        });

        it( "empty configs should give empty head", function(){

          stack.push( new GLConfig() );
          stack.push( new GLConfig() );
          stack.push( new GLConfig() );
          var head = stack._head;


          expect( head._set ).to.be.equal( 0 );

        });

        it( "should add head set with pushed sets", function(){

          stack.push( defaultCfg );


          var cfg = new GLConfig();
          cfg.setStencilFunc( gl.GEQUAL, 0, 5 );

          stack.push( cfg );

          var head = stack._head;
          expect( head._set ).to.be.equal( bin( '1111110011' ) );

        });

      });

      describe( "pop", function(){



        it( "should restore head to previous value", function(){

          var cfg = getComplexConfig();

          stack.push( defaultCfg );
          stack.push( cfg );
          stack.pop();

          var head = stack._head;

          equalConfig( head, defaultCfg );

        });

      });




    });

  }
);