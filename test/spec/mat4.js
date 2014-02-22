define(
  [
    'expect',
    './aequal',
    '../refs/mat4_mul_ref',
    'eagl/math/mat4'
  ],
  function( expect, aequal, mulRefs, mat4 ){



    var ref = mulRefs()[0],
        sampleA = ref.a,
        sampleB = ref.b;

    describe( "math - mat4", function(){


      var m;


      describe( "create", function(){


        it( "should return a 16 lenght array", function(){

          m = mat4.create();
          expect( m.length ).to.be( 16 );

        });



        it( "should be identity matrix", function(){
          m = mat4.create();

          expect( m[0]  ).to.be( 1.0 );
          expect( m[1]  ).to.be( 0.0 );
          expect( m[2]  ).to.be( 0.0 );
          expect( m[3]  ).to.be( 0.0 );
          expect( m[4]  ).to.be( 0.0 );
          expect( m[5]  ).to.be( 1.0 );
          expect( m[6]  ).to.be( 0.0 );
          expect( m[7]  ).to.be( 0.0 );
          expect( m[8]  ).to.be( 0.0 );
          expect( m[9]  ).to.be( 0.0 );
          expect( m[10] ).to.be( 1.0 );
          expect( m[11] ).to.be( 0.0 );
          expect( m[12] ).to.be( 0.0 );
          expect( m[13] ).to.be( 0.0 );
          expect( m[14] ).to.be( 0.0 );
          expect( m[15] ).to.be( 1.0 );

        });

      });

      describe( "createFrom", function(){


        it( "should accept Array argument", function(){

          m = mat4.createFrom( [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            5, 7, 9, 1
          ]);

          expect( m.length ).to.be( 16 );
          expect( m[14]  ).to.be( 9.0 );

        });



        it( "should accept other matrix", function(){
          m = mat4.create();
          m[0] = 10.0;

          var m2 = mat4.createFrom( m );
          m[0] = 5.0;

          expect( m2.length ).to.be( 16 );
          expect( m2[0]  ).to.be( 10.0 );


        });

      });

      describe( "copy", function(){

        it( "should copy values", function(){

          m1 = mat4.create();
          m2 = mat4.create();
          m1[3] = 2.0;

          mat4.copy( m2, m1 );
          expect( m2[3] ).to.be( 2.0 );

        });

        it( "but don't referencing source", function(){

          m1 = mat4.create();
          m2 = mat4.create();
          m1[3] = 2.0;
          mat4.copy( m2, m1 );
          m1[3] = 1.0;

          expect(  m2[3]).to.be( 2.0 );

        });

      });

      describe( "identity", function(){

        it( "should reset matrix", function(){
          var i = 0;

          m = mat4.create();

          for (; i < 16; i++) {
            m[i] = 2.5;
          }

          mat4.identity( m );

          expect( m[0]  ).to.be( 1.0 );
          expect( m[1]  ).to.be( 0.0 );
          expect( m[2]  ).to.be( 0.0 );
          expect( m[3]  ).to.be( 0.0 );
          expect( m[4]  ).to.be( 0.0 );
          expect( m[5]  ).to.be( 1.0 );
          expect( m[6]  ).to.be( 0.0 );
          expect( m[7]  ).to.be( 0.0 );
          expect( m[8]  ).to.be( 0.0 );
          expect( m[9]  ).to.be( 0.0 );
          expect( m[10] ).to.be( 1.0 );
          expect( m[11] ).to.be( 0.0 );
          expect( m[12] ).to.be( 0.0 );
          expect( m[13] ).to.be( 0.0 );
          expect( m[14] ).to.be( 0.0 );
          expect( m[15] ).to.be( 1.0 );

        });

      });

      describe( "mul", function(){

        it( "should multiply to output", function(){

          var refs = mulRefs();
          var ref;
          var a = mat4.create(),
              b = mat4.create(),
              m = mat4.create(),
              out = mat4.create();

          for( var i = 0, l = refs.length; i<l; i++ ) {
            ref = refs[i];
            mat4.copy( a, ref.a );
            mat4.copy( b, ref.b );
            mat4.copy( m, ref.mul );

            mat4.mul( b, a, out );

            aequal( out, m );

          }


        });

        it( "should multiply itself", function(){
          var refs = mulRefs();
          var ref;
          var a = mat4.create(),
              b = mat4.create(),
              m = mat4.create();

          ref = refs[0];
          mat4.copy( a, ref.a );
          mat4.copy( b, ref.b );
          mat4.copy( m, ref.mul );

          mat4.mul( b, a, b );

          aequal( b, m );

        });

      });

      describe("invert", function() {

        it( "should return source when called twice", function(){

          var a = mat4.createFrom( sampleA );

          m = mat4.createFrom( sampleA );

          mat4.invert( m, m );
          mat4.invert( m, m );

          aequal( a, m );



        });

      });

    });

  }
);

