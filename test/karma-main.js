var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}


requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/test',

    paths: {
      eagl: '../src/eagl',
      expect: '../node_modules/expect.js/expect'
    },

    shim: {
      'expect' : {
        exports:'expect'
      }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

