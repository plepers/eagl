define(
  [
    'expect',
    'utils/aequal',
    'eagl/objects/Object3D',
    'eagl/objects/Mesh',
    'eagl/objects/Scene',
    'eagl/materials/Material',
    'eagl/core/Renderable',
    'eagl/core/Output',
    'eagl/core/RenderUnit'
  ],
  function(
    expect,
    aequal,
    Object3D,
    Mesh,
    Scene,
    Material,
    Renderable,
    Output,
    RenderUnit
    ){





    createObject = function( name ){
      var mat = new Material();
      var m = new Mesh( null, mat );
      m.name = name;
      return m;
    }



    describe( "objects - Scene", function(){


      describe( "add Outputs", function(){


          var scene = new Scene();

          var output = new Output( 1 );
          output.addBatch( 0, 0x1 );
          output.addBatch( 1, 0x2 );
          scene.pipeline.addOutput( output );

          output = new Output( 2 );
          output.addBatch( 0, 0x1 );
          output.addBatch( 1, 0x2 );
          scene.pipeline.addOutput( output );


      });



      describe( "add outputs and renderables", function(){


          var scene = new Scene();

          var output = new Output( 1 );
          output.addBatch( 0, 1 );
          output.addBatch( 1, 2 );
          scene.pipeline.addOutput( output );

          output = new Output( 2 );
          output.addBatch( 0, 1 );
          output.addBatch( 1, 2 );
          scene.pipeline.addOutput( output );


          scene.add( createObject( "m0" ) );
          scene.add( createObject( "m1" ) );
          scene.add( createObject( "m2" ) );


      });



      describe( "temp", function(){


        it( "just run", function(){

          var scene = new Scene();
          var parent = new Object3D();

          scene.add( parent );

          parent.add( createObject( "m0" ) );
          parent.add( createObject( "m1" ) );
          parent.add( createObject( "m2" ) );


        });

      });

    });

  }
);