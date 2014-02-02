
define( ['./types'], function( types ){

  // underlying storage type for Mat4
  var ARRAY = types.Mat4Array;

  // store static identity buffer
  // Used to fast initialisation of matrices.
  var __initBuffer = function(){

      var o = new ARRAY( 16 );
      o[0]  = 1.0;
      o[1]  = 0.0;
      o[2]  = 0.0;
      o[3]  = 0.0;
      o[4]  = 0.0;
      o[5]  = 1.0;
      o[6]  = 0.0;
      o[7]  = 0.0;
      o[8]  = 0.0;
      o[9]  = 0.0;
      o[10] = 1.0;
      o[11] = 0.0;
      o[12] = 0.0;
      o[13] = 0.0;
      o[14] = 0.0;
      o[15] = 1.0;

      return o;

  }();


  var mat4 = {

    create : function() {
      return new ARRAY( __initBuffer );
    },


    copy : function( to, from ) {
      to.set( from );
    },

    identity : function( m ) {
      m.set( __initBuffer );
    },

    mul : function ( a, b, out ) {

      var a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
          a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
          a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11],
          a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
          b0, b1, b2, b3;


      b0 = b[0]; b1 = b[1]; b2 = b[2]; b3 = b[3];
      out[0]  = b0*a00 + b1*a10 + b2*a20 + b3*a30;
      out[1]  = b0*a01 + b1*a11 + b2*a21 + b3*a31;
      out[2]  = b0*a02 + b1*a12 + b2*a22 + b3*a32;
      out[3]  = b0*a03 + b1*a13 + b2*a23 + b3*a33;

      b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
      out[4]  = b0*a00 + b1*a10 + b2*a20 + b3*a30;
      out[5]  = b0*a01 + b1*a11 + b2*a21 + b3*a31;
      out[6]  = b0*a02 + b1*a12 + b2*a22 + b3*a32;
      out[7]  = b0*a03 + b1*a13 + b2*a23 + b3*a33;

      b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
      out[8]  = b0*a00 + b1*a10 + b2*a20 + b3*a30;
      out[9]  = b0*a01 + b1*a11 + b2*a21 + b3*a31;
      out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
      out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

      b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
      out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
      out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
      out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
      out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    },

    transform : function( v, m ) {
      var x = v[0], y = v[1], z = v[2];
      v[0] = m[0] * x + m[4] * y + m[8]  * z + m[12];
      v[1] = m[1] * x + m[5] * y + m[9]  * z + m[13];
      v[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    },

    deltaTransform : function( v, m ) {
      var x = v[0], y = v[1], z = v[2];
      v[0] = m[0] * x + m[4] * y + m[8]  * z;
      v[1] = m[1] * x + m[5] * y + m[9]  * z;
      v[2] = m[2] * x + m[6] * y + m[10] * z;
    }


  };

  mat4.set = mat4.copy;

  // module export
  // -------------
  return mat4;

});
