define(
  [
    'expect',
    'spec/aequal',
    'eagl/objects/Object3D'
  ],
  function( expect, aequal, Object3D ){

    var gl;

    var hasWebgl = function(){
      if( document != undefined ){
        var canvas = document.createElement( 'canvas' );
        if( canvas != undefined ){
          var gl = canvas.getContext( 'experimental-webgl' );
          if( gl != null )
            return true;
        }
      }
      return false;
    }
    describe( "gl - GLConfig", function(){

      if( ! hasWebgl() ) {
        console.log( "no webgl" );
        return;
      }

      beforeEach(function(){

        gl = document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
      })

      describe( "fetch", function(){


        it( "should fullfill config", function(){

          expect( gl ).to.be.ok();

        });

      });

    });

  }
);