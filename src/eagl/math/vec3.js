
define( ['./types'], function( types ){

  // underlying storage type for Mat4
  var ARRAY = types.Vec3Array;

  // default values for buffers
  var __initBuffer = function(){

      var o = new ARRAY( 16 );
      o[0]  = 0.0;
      o[1]  = 0.0;
      o[2]  = 0.0;

      return o;

  }();

  var vec3 = {

    create : function() {
      return new ARRAY( __initBuffer );
    },

    createWith : function( x, y, z ) {
      var v = new ARRAY( 3 );
      v[0] = x;
      v[1] = y;
      v[2] = z;
      return v;
    },

    set : function( v, x, y, z ) {
      v[0] = x;
      v[1] = y;
      v[2] = z;
    },

    add : function( v1, v2 ) {
      v1[0] += v2[0];
      v1[1] += v2[1];
      v1[2] += v2[2];
    },

    sub : function( v1, v2 ) {
      v1[0] -= v2[0];
      v1[1] -= v2[1];
      v1[2] -= v2[2];
    },

    mul : function( v1, v2 ) {
      v1[0] *= v2[0];
      v1[1] *= v2[1];
      v1[2] *= v2[2];
    },

    scale : function( v1, scale ) {
      v1[0] *= scale;
      v1[1] *= scale;
      v1[2] *= scale;
    },

    copy : function( v1, v2 ) {
      v1[0] = v2[0];
      v1[1] = v2[1];
      v1[2] = v2[2];
    },

    dist : function( a, b ) {
      var x = b[0] - a[0],
          y = b[1] - a[1],
          z = b[2] - a[2];
      return Math.sqrt( x*x + y*y + z*z );
    }



  };


  // module export
  // -------------
  return vec3;

});
