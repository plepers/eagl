define(
  [
    'expect',
    'utils/aequal',
    'eagl/objects/Object3D',
    'eagl/objects/Mesh',
    'eagl/objects/Scene',
    'eagl/materials/Material',
    'eagl/core/Renderable',
    'eagl/core/Technic',
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
    Technic,
    RenderUnit
    ){





    createObject = function( name ){
      var mat = new Material();
      var m = new Mesh( null, mat );
      m.name = name;
      return m;
    }



    describe( "objects - Scene", function(){


      describe( "add technics", function(){


          var scene = new Scene();

          var technic = new Technic( 1 );
          technic.addBatch( 0, 0x1 );
          technic.addBatch( 1, 0x2 );
          scene.pipeline.addTechnic( technic );

          technic = new Technic( 2 );
          technic.addBatch( 0, 0x1 );
          technic.addBatch( 1, 0x2 );
          scene.pipeline.addTechnic( technic );


      });



      describe( "add technics and renderables", function(){


          var scene = new Scene();

          var technic = new Technic( 1 );
          technic.addBatch( 0, 1 );
          technic.addBatch( 1, 2 );
          scene.pipeline.addTechnic( technic );

          technic = new Technic( 2 );
          technic.addBatch( 0, 1 );
          technic.addBatch( 1, 2 );
          scene.pipeline.addTechnic( technic );


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