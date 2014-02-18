"use strict"


path = require 'path'


module.exports = (grunt) ->

  # show elapsed time at the end
  # require("time-grunt") grunt

  # load all grunt tasks
  require("load-grunt-tasks") grunt

  grunt.initConfig

    # configurable paths
    dirs:
      build: "build"
      sources: "src"


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
        globalWindow :        true
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

    mochaTest:
      options:
        reporter: 'dot'
      src: 'test/tests.js'



  grunt.registerTask "build-all",
    [
      "jshint"
      "urequire:node"
      "urequire:combined"
      "mochaTest"
    ]

  grunt.registerTask "build",
    [
      "jshint"
      "urequire:node"
      "mochaTest"
    ]


  grunt.registerTask "test",
    [
      "build"
    ]
