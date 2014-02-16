(function(global){
  var Benchmark, mat4;


  if( global.require !== undefined ) {
    Benchmark = require('benchmark');
    mat4 = require( './mat4' );
  } else {
    Benchmark = global.Benchmark;
    mat4 = global.mat4;
  }

  // warm up
  for (var i = 500; i >= 0; i--) {
    mat4.t1();
    mat4.t2();
    mat4.t2_2();
    mat4.t3();
    mat4.t4();
    mat4.t5();
  }


  var suite = new Benchmark.Suite();

  // add tests
  suite
    .add('float matrices, cache local', mat4.t1 )
    .add('double matrices, cache local', mat4.t2)
    .add('double matrices, cache local asm', mat4.t2_2)
    // .add('float matrices, heap', mat4.t3)
    // .add('float matrice, heap, no copy', mat4.t4)
    .add('float matrice, fround', mat4.t5)

  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  })
  // run async
  .run({ 'async': true });

})(this);