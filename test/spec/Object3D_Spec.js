define(
  [
    'expect',
    'utils/aequal',
    'eagl/objects/Object3D',
    'eagl/objects/Scene'
  ],
  function( expect, aequal, Object3D, Scene ){




    var createGraph = function( name, depth, numChild, arr ){

      var o = new Object3D()
      o.name = name;
      if( arr !== undefined ) arr.push( o );

      if( depth > 0 ) {
        for (var i = 0; i < numChild; i++) {
          o.add( createGraph( name+'_'+i, depth-1, numChild, arr ) );
        }
      }
      return o;
    }


    describe( "objects - Object3D", function(){

      describe( "add", function(){


        it( "should provide scene to child, if exist", function(){
          var scene = new Scene();

          var parent = new Object3D();
          var child = new Object3D();

          scene.add( parent );
          parent.add( child );

          expect( child.scene ).to.be( scene );

        });


        it( "should provide scene to child, recursively", function(){
          var scene = new Scene();

          var parent = new Object3D();
          var child = new Object3D();
          var subchild = new Object3D();

          parent.add( child );
          child.add( subchild );

          expect( subchild.scene ).to.be( null );
          scene.add( parent );
          expect( subchild.scene ).to.be( scene );
        });

        it( "should remove scene from child, if relocated", function(){
          var scene = new Scene();

          var parent = new Object3D();
          var child = new Object3D();

          scene.add( child );
          expect( child.scene ).to.be( scene );

          parent.add( child );
          expect( child.scene ).to.be( null );

        });




      });



      describe( "remove", function(){


        it( "should remove scene from child", function(){
          var scene = new Scene();

          var parent = new Object3D();
          var child = new Object3D();

          scene.add( parent );
          parent.add( child );

          expect( child.scene ).to.be( scene );

          scene.remove( parent );

          expect( child.scene ).to.be( null );

        });

      });

    });

  }
);