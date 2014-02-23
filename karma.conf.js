module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['mocha', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [

      {pattern: 'node_modules/expect.js/**/*.js', included: false},
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'test/spec/*.js', included: false},
      {pattern: 'test/refs/*.js', included: false},

      'test/karma-main.js'
    ],


    // list of files to exclude
    exclude: [
      'src/index.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    sauceLabs: {
      startConnect: true,
      testName: 'eagl unit tests'
    },

    // define SL browsers
    customLaunchers: {
      sl_chrome_OSX9: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '31',
        platform: 'OS X 10.9'
      }
    },



    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: process.env.TRAVIS
      ? [ 'sl_chrome_OSX9' ]
      : [ 'Chrome', 'Firefox', 'PhantomJS' ],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,


  });
};