


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
    './spec/Scene'
  ],
  function( ){

    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    }
    else {
      mocha.run();
    }
  }
);
