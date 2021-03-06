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


    # URequire
    # ================

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


    # JSHint
    # ================

    jshint:
      all: [
        '<%= dirs.sources %>/**/*.js'
      ]


    # Uglify
    # ================

    uglify:
      sources:
        files: [
          expand: true,
          cwd: '<%= dirs.sources %>/',
          src: '**/*.js',
          dest: '<%= dirs.tmp %>/src'
        ]
      options:
        beautify : false


    # WATCHER
    # ================
    watch:
      # run unit tests with karma (server needs to be already running)
      sources:
        files: ['src/**/*.js']
        tasks: ['uglify:sources']

      karma:
        files: ['src/**/*.js', 'test/**/*.js']
        tasks: [ 'uglify:sources', 'karma:dev:run']


    # Mocha
    # ================

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

    # KARMA TESTING
    # ================
    karma:

      dev:
        configFile: 'karma.conf.js'
        background : yes
        browsers: ['Chrome']

      travis:
        configFile: 'karma.conf.js'
        singleRun: true


    # Connect
    # ================

    connect:
      server:
        options:
          port: CI_PORT
          base: '.'


  grunt.registerTask "build-all", [
    "jshint"
    "urequire:node"
    "urequire:combined"
  ]

  grunt.registerTask "build", [
    "jshint"
    "urequire:node"
  ]

  grunt.registerTask "test", (target) ->
    tasks = ['uglify:sources']
    if target is "alive"
      tasks = tasks.concat [
        'karma:dev:start'
        'watch:karma'
      ]
    else
      tasks = tasks.concat [
        "karma:travis"
      ]

    grunt.task.run tasks

