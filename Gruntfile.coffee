"use strict"


path = require 'path'


module.exports = (grunt) ->

  CI_PORT = 8981

  # show elapsed time at the end
  # require("time-grunt") grunt

  # load all grunt tasks
  require("load-grunt-tasks") grunt

  grunt.initConfig

    # configurable paths
    dirs:
      build:    "build"
      sources:  "src"
      tmp:      ".tmp"
      test:     "test"


    # --------------------
    # URequire

    urequire :
      umd:
        template:   "UMD" # default, can be ommited
        path:       "<%= dirs.sources %>"
        dstPath:    "<%= dirs.build %>/umd"

      node:
        template:   "nodejs"
        path:       "<%= dirs.sources %>"
        dstPath:    "<%= dirs.build %>/commonjs"

      combined:
        template:   "combined"
        path:       "<%= dirs.sources %>"
        dstPath:    "<%= dirs.build %>/combined"

      _defaults:
        name: 'eagl'
        main: 'index'
        filez: ['**/*.*']
        copy: [/./, '**/*']
        dependencies:
          exports:
            root: {'index': 'eagl'}

        runtimeInfo :         no
        bare :                no
        injectExportsModule : no
        globalWindow :        no
        useStrict :           yes
        allNodeRequires: yes


    # --------------------
    # JSHint

    jshint:
      all: [
        'src/**/*.js'
      ]

    # --------------------
    # Mocha

    mocha_phantomjs:
      all: ['test/index.html']

    mocha_slimerjs:
      all: ['test/index.html']


    shell:
      'qunit-slimerjs':
        command: './test/utils/run-slimerjs.sh http://localhost:' + CI_PORT + '/test/'
        options:
          stdout: true
          stderr: true
          failOnError: true


    # --------------------
    # Connect

    connect:
      server:
        options:
          port: CI_PORT
          base: '.'


  grunt.registerTask "build-all",
    [
      "jshint"
      "urequire:node"
      "urequire:combined"
    ]

  grunt.registerTask "build",
    [
      "jshint"
      "urequire:node"
    ]

  grunt.registerTask "test",
    [
      'connect'
      'shell:qunit-slimerjs'
      'mocha_phantomjs'
    ]
