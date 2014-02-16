
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


    createFrom : function( a ) {
      return new ARRAY( a );
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
    },


    invert : function( m, out ) {
      var a00 = m[0],  a01 = m[1],  a02 = m[2],  a03 = m[3],
          a10 = m[4],  a11 = m[5],  a12 = m[6],  a13 = m[7],
          a20 = m[8],  a21 = m[9],  a22 = m[10], a23 = m[11],
          a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15],

          b00 = a00 * a11 - a01 * a10,
          b01 = a00 * a12 - a02 * a10,
          b02 = a00 * a13 - a03 * a10,
          b03 = a01 * a12 - a02 * a11,
          b04 = a01 * a13 - a03 * a11,
          b05 = a02 * a13 - a03 * a12,
          b06 = a20 * a31 - a21 * a30,
          b07 = a20 * a32 - a22 * a30,
          b08 = a20 * a33 - a23 * a30,
          b09 = a21 * a32 - a22 * a31,
          b10 = a21 * a33 - a23 * a31,
          b11 = a22 * a33 - a23 * a32,

          // Calculate the determinant
          det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

      if ( det === 0.0 ) {
        return false;
      }

      det = 1.0 / det;

      out[0] =  (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] =  (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[2] =  (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[3] =  (a22 * b04 - a21 * b05 - a23 * b03) * det;
      out[4] =  (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[5] =  (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[6] =  (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[7] =  (a20 * b05 - a22 * b02 + a23 * b01) * det;
      out[8] =  (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out[9] =  (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
      out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
      out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
      out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
      out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

      return true;
    },

    scale : function( m, x, y, z ) {
      m[0]  *= x;
      m[1]  *= x;
      m[2]  *= x;
      m[3]  *= x;
      m[4]  *= y;
      m[5]  *= y;
      m[6]  *= y;
      m[7]  *= y;
      m[8]  *= z;
      m[9]  *= z;
      m[10] *= z;
      m[11] *= z;
    }


  };



  mat4.set = mat4.copy;

  // module export
  // -------------
  return mat4;

});
