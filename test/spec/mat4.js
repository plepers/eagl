
var expect = require('expect.js');
var lreq = require( "./lrequire" );
var aequal = require( './aequal' );

var mat4 = lreq( 'eagl/math/mat4' );

describe( "math - mat4", function(){


  var matA, matB, identity;

    beforeEach(function() {
      var a;



      a = [ 2, 0, 0, 0,
            0, 2, 0, 0,
            0, 0, 2, 0,
            2, 1, 3, 1];

      matA = mat4.create();
      mat4.set( matA, a );

      a = [ 3, 0, 0, 0,
            0, 3, 0, 0,
            0, 0, 3, 0,
            4, 5, 3, 1];

      matB = mat4.create();
      mat4.set( matB, a );


      identity = [1, 0, 0, 0,
                  0, 1, 0, 0,
                  0, 0, 1, 0,
                  0, 0, 0, 1];
    });







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

    it( "should reset matrix", function(){
      var b = [
          6, 0, 0, 0,
          0, 6, 0, 0,
          0, 0, 6, 0,
          10, 11, 9, 1
      ];
      m = mat4.create();
      mat4.set( m, b );

      var out = mat4.create();
      mat4.mul( matA, matB, out );

      aequal( out, m );

    });

  });

});



