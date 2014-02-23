/*
 * Simply ripped from
 * https://github.com/jquery/qunit/blob/master/addons/phantomjs/runner.js
 */
/*global phantom:false, require:false, console:false, window:false, QUnit:false */

(function() {
  'use strict';

  var url, page, timeout,
    args = require('system').args;

  // arg[0]: scriptName, args[1...]: arguments
  if (args.length < 2 || args.length > 3) {
    console.error('Usage:\n  phantomjs runner.js [url-of-your-qunit-testsuite] [timeout-in-seconds]');
    phantom.exit(1);
  }


  url = args[1];
  page = require('webpage').create();
  if (args[2] !== undefined) {
    timeout = parseInt(args[2], 10);
  }

  // Route `console.log()` calls from within the Page context to the main Phantom context (i.e. current `this`)
  page.onConsoleMessage = function(msg) {
    console.log(msg);
  };

  page.onInitialized = function() {
    page.evaluate(addLogging);
  };

  page.onCallback = function(message) {

    var result,
      failed;

    if (message) {
      if (message.name === 'log') {
        result = message.data;
        console.log( result );
      }
      else if (message.name === 'done') {
        result = message.data;
        failed = !result || !result.total || (result.failures>0);

        if (!result.total) {
          console.error('No tests were executed. Are you loading tests asynchronously?');
        }

        console.log( result.stats.passes + ' passed.');
        console.log( result.failures + ' failed.');

        phantom.exit(failed ? 1 : 0);
      }
    }
  };

  page.open(url)
    .then( function(status) {
      if (status !== 'success') {
        console.error('Unable to access network: ' + status, url);
        phantom.exit(1);
      } else {

        // Set a timeout on the test running, otherwise tests with async problems will hang forever
        if (typeof timeout === 'number') {
          setTimeout(function() {
            console.error('The specified timeout of ' + timeout + ' seconds has expired. Aborting...');
            phantom.exit(1);
          }, timeout * 1000);
        }

        // Do nothing... the callback mechanism will handle everything!
      }
    });

  function addLogging() {
    window.document.addEventListener('DOMContentLoaded', function() {

      var currentTestAssertions = [];

      var sendMessage = function( name, data ){
        if (typeof window.callPhantom === 'function') {
          window.callPhantom({
            'name': name,
            'data': data
          });
        }
      }

      window.onMochaStart = function( runner ){

        //var reporter = new (Mocha.reporters.Spec)( runner );

        // runner.on( 'pass', function( test ){
        //   console.log( test );
        // });

        runner.on( 'fail', function( test, err ){
          console.log( test.fullTitle() );
          console.log( err );
        });

        runner.on( 'end', function(){
          sendMessage( "done", runner )

        });


      }




      Mocha.process.exit = function(result) {
        console.log( "mlkmlkmlk ");
        console.log('Took ' + result.runtime +  'ms to run ' + result.total + ' tests. ' + result.passed + ' passed, ' + result.failed + ' failed.');

        if (typeof window.callPhantom === 'function') {
          window.callPhantom({
            'name': 'QUnit.done',
            'data': result
          });
        }
      };
    }, false);
  }
})();