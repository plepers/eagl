
(function( global ) {

  var _a = [-8.421462059020996,-4.660380840301514,1.946252703666687,0,2.98828125,-6.196556091308594,-1.9075706005096436,0,1.1663202047348022,-0.570553183555603,3.6804707050323486,0,-149.8563995361328,-452.8306579589844,-336.5943603515625,1],
      _b = [0.4495936334133148,-1.762202262878418,1.5386048555374146,0,0.8359618782997131,0.18766361474990845,-0.02933950163424015,0,-0.7390382885932922,4.051293849945068,4.856000900268555,0,-366.5505676269531,210.79615783691406,-476.2113952636719,1];

  var matA32 = new Float32Array( _a ),
      matB32 = new Float32Array( _b ),
      matA64 = new Float64Array( _a ),
      matB64 = new Float64Array( _b );

  var out32 = new Float32Array( 16 ),
      out64 = new Float32Array( 16 );

  var heap32 = new Float32Array( 16 );

  var exp = {};

  Math.fround = Math.fround || function(x) {return x;};

  exp.t1 = function mat4_t1() {

    var a = matA32,
        b = matB32,
        out = out32;

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


  };

  exp.t2 = function mat4_t2() {


    var a = matA64,
        b = matB64,
        out = out64;

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

  };

  exp.t5 = function mat4_t5() {

    var f32 = Math.fround;

    var a = matA32,
        b = matB32,
        out = out32;

    var a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
        a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
        a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
        b0, b1, b2, b3;


    b0 = b[0]; b1 = b[1]; b2 = b[2]; b3 = b[3];
    out[0]  = f32( f32( f32( f32( b0*a00 ) + f32( b1*a10 ) ) + f32( b2*a20 ) ) + f32( b3*a30 ) );
    out[1]  = f32( f32( f32( f32( b0*a01 ) + f32( b1*a11 ) ) + f32( b2*a21 ) ) + f32( b3*a31 ) );
    out[2]  = f32( f32( f32( f32( b0*a02 ) + f32( b1*a12 ) ) + f32( b2*a22 ) ) + f32( b3*a32 ) );
    out[3]  = f32( f32( f32( f32( b0*a03 ) + f32( b1*a13 ) ) + f32( b2*a23 ) ) + f32( b3*a33 ) );

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4]  = f32( f32( f32( f32( b0*a00 ) + f32( b1*a10 ) ) + f32( b2*a20 ) ) + f32( b3*a30 ) );
    out[5]  = f32( f32( f32( f32( b0*a01 ) + f32( b1*a11 ) ) + f32( b2*a21 ) ) + f32( b3*a31 ) );
    out[6]  = f32( f32( f32( f32( b0*a02 ) + f32( b1*a12 ) ) + f32( b2*a22 ) ) + f32( b3*a32 ) );
    out[7]  = f32( f32( f32( f32( b0*a03 ) + f32( b1*a13 ) ) + f32( b2*a23 ) ) + f32( b3*a33 ) );

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8]  = f32( f32( f32( f32( b0*a00 ) + f32( b1*a10 ) ) + f32( b2*a20 ) ) + f32( b3*a30 ) );
    out[9]  = f32( f32( f32( f32( b0*a01 ) + f32( b1*a11 ) ) + f32( b2*a21 ) ) + f32( b3*a31 ) );
    out[10] = f32( f32( f32( f32( b0*a02 ) + f32( b1*a12 ) ) + f32( b2*a22 ) ) + f32( b3*a32 ) );
    out[11] = f32( f32( f32( f32( b0*a03 ) + f32( b1*a13 ) ) + f32( b2*a23 ) ) + f32( b3*a33 ) );

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = f32( f32( f32( f32( b0*a00 ) + f32( b1*a10 ) ) + f32( b2*a20 ) ) + f32( b3*a30 ) );
    out[13] = f32( f32( f32( f32( b0*a01 ) + f32( b1*a11 ) ) + f32( b2*a21 ) ) + f32( b3*a31 ) );
    out[14] = f32( f32( f32( f32( b0*a02 ) + f32( b1*a12 ) ) + f32( b2*a22 ) ) + f32( b3*a32 ) );
    out[15] = f32( f32( f32( f32( b0*a03 ) + f32( b1*a13 ) ) + f32( b2*a23 ) ) + f32( b3*a33 ) );

  };

  exp.t2_2 = function mat4_t2_2() {


    var a = matA64,
        b = matB64,
        out = out64;

    var a00 = +a[0],  a01 = +a[1],  a02 = +a[2],  a03 = +a[3],
        a10 = +a[4],  a11 = +a[5],  a12 = +a[6],  a13 = +a[7],
        a20 = +a[8],  a21 = +a[9],  a22 = +a[10], a23 = +a[11],
        a30 = +a[12], a31 = +a[13], a32 = +a[14], a33 = +a[15],
        b0, b1, b2, b3;


    b0 = +b[0]; b1 = +b[1]; b2 = +b[2]; b3 = +b[3];
    out[0]  = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1]  = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2]  = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3]  = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = +b[4]; b1 = +b[5]; b2 = +b[6]; b3 = +b[7];
    out[4]  = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5]  = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6]  = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7]  = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = +b[8]; b1 = +b[9]; b2 = +b[10]; b3 = +b[11];
    out[8]  = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9]  = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = +b[12]; b1 = +b[13]; b2 = +b[14]; b3 = +b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

  };



  exp.t3 = function mat4_t3() {

    var a = matA32,
        b = matB32,
        out = out32,
        heap = heap32;


    heap[0]  = a[0];  heap[1]  = a[1];  heap[2]  = a[2];  heap[3]  = a[3];
    heap[4]  = a[4];  heap[5]  = a[5];  heap[6]  = a[6];  heap[7]  = a[7];
    heap[8]  = a[8];  heap[9]  = a[9];  heap[10] = a[10]; heap[11] = a[11];
    heap[12] = a[12]; heap[13] = a[13]; heap[14] = a[14]; heap[15] = a[15];


    out[0]  = b[0]*heap[0] + b[1]*heap[4] + b[2]*heap[8] + b[3]*heap[12];
    out[1]  = b[0]*heap[1] + b[1]*heap[5] + b[2]*heap[9] + b[3]*heap[13];
    out[2]  = b[0]*heap[2] + b[1]*heap[6] + b[2]*heap[10] + b[3]*heap[14];
    out[3]  = b[0]*heap[3] + b[1]*heap[7] + b[2]*heap[11] + b[3]*heap[15];

    out[4]  = b[4]*heap[0] + b[5]*heap[4] + b[6]*heap[8] + b[7]*heap[12];
    out[5]  = b[4]*heap[1] + b[5]*heap[5] + b[6]*heap[9] + b[7]*heap[13];
    out[6]  = b[4]*heap[2] + b[5]*heap[6] + b[6]*heap[10] + b[7]*heap[14];
    out[7]  = b[4]*heap[3] + b[5]*heap[7] + b[6]*heap[11] + b[7]*heap[15];

    out[8]  = b[8]*heap[0] + b[9]*heap[4] + b[10]*heap[8] + b[11]*heap[12];
    out[9]  = b[8]*heap[1] + b[9]*heap[5] + b[10]*heap[9] + b[11]*heap[13];
    out[10] = b[8]*heap[2] + b[9]*heap[6] + b[10]*heap[10] + b[11]*heap[14];
    out[11] = b[8]*heap[3] + b[9]*heap[7] + b[10]*heap[11] + b[11]*heap[15];

    out[12] = b[12]*heap[0] + b[13]*heap[4] + b[14]*heap[8] + b[15]*heap[12];
    out[13] = b[12]*heap[1] + b[13]*heap[5] + b[14]*heap[9] + b[15]*heap[13];
    out[14] = b[12]*heap[2] + b[13]*heap[6] + b[14]*heap[10] + b[15]*heap[14];
    out[15] = b[12]*heap[3] + b[13]*heap[7] + b[14]*heap[11] + b[15]*heap[15];


  };

  exp.t4 = function mat4_t4() {


    var a = matA32,
        b = matB32,
        out = out32;





    out[0]  = b[0]*a[0]  + b[1]*a[4]  + b[2]*a[8]   + b[3]*a[12];
    out[1]  = b[0]*a[1]  + b[1]*a[5]  + b[2]*a[9]   + b[3]*a[13];
    out[2]  = b[0]*a[2]  + b[1]*a[6]  + b[2]*a[10]  + b[3]*a[14];
    out[3]  = b[0]*a[3]  + b[1]*a[7]  + b[2]*a[11]  + b[3]*a[15];
    out[4]  = b[4]*a[0]  + b[5]*a[4]  + b[6]*a[8]   + b[7]*a[12];
    out[5]  = b[4]*a[1]  + b[5]*a[5]  + b[6]*a[9]   + b[7]*a[13];
    out[6]  = b[4]*a[2]  + b[5]*a[6]  + b[6]*a[10]  + b[7]*a[14];
    out[7]  = b[4]*a[3]  + b[5]*a[7]  + b[6]*a[11]  + b[7]*a[15];
    out[8]  = b[8]*a[0]  + b[9]*a[4]  + b[10]*a[8]  + b[11]*a[12];
    out[9]  = b[8]*a[1]  + b[9]*a[5]  + b[10]*a[9]  + b[11]*a[13];
    out[10] = b[8]*a[2]  + b[9]*a[6]  + b[10]*a[10] + b[11]*a[14];
    out[11] = b[8]*a[3]  + b[9]*a[7]  + b[10]*a[11] + b[11]*a[15];
    out[12] = b[12]*a[0] + b[13]*a[4] + b[14]*a[8]  + b[15]*a[12];
    out[13] = b[12]*a[1] + b[13]*a[5] + b[14]*a[9]  + b[15]*a[13];
    out[14] = b[12]*a[2] + b[13]*a[6] + b[14]*a[10] + b[15]*a[14];
    out[15] = b[12]*a[3] + b[13]*a[7] + b[14]*a[11] + b[15]*a[15];

  };



  if( global.module !== undefined )
    module.exports = exp;
  else
    global.mat4 = exp;

})(this);