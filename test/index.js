


require.config({

  baseUrl: './',

  shim:{
    'expect' : {
      exports:'expect'
    }
  },

  paths: {
    eagl: '../src/eagl',
    expect: '../node_modules/expect.js/expect'
  }

});



require( [
    './spec/mat4',
    './spec/Object3D',
    './spec/Scene',
    './spec/GLConfig'
  ],
  function( ){
    var runner
    if (window.mochaPhantomJS) {
      runner = mochaPhantomJS.run();
    }
    else {
      runner = mocha.run();
    }
    if( window.onMochaStart != undefined )
      window.onMochaStart( runner );
  }
);
