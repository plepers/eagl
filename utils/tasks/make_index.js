/*
 * grunt-contrib-concat
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require( 'path' );
  var fs = require( 'fs' );


  var template = grunt.file.read( './utils/tasks/index.tpl' );

  grunt.registerMultiTask('makeindex', 'Create index.js', function() {

    var options = this.options({
      output: 'src/index.js'
    });

    var tpl_deps = [];
    var tpl_args = [];
    var tpl_members = [];


    // Iterate over all src-dest file pairs.
    this.files.forEach(function(f) {
      f.src.filter(function(filepath) {


        var dir = path.dirname( filepath );
        dir = path.relative( 'src', dir );

        var moduleName = path.basename( filepath, '.js' );
        var modulePath = dir+"/"+moduleName;

        if( moduleName != "index" ) {

          tpl_deps.push( "'"+modulePath+"'" );
          tpl_args.push( moduleName );
          tpl_members.push( moduleName + " : " + moduleName );
        }
      });

    });

    var datas = {data:{
      tpl_deps    : tpl_deps   .join( ',\n    ' ),
      tpl_args    : tpl_args   .join( ',\n    ' ),
      tpl_members : tpl_members.join( ',\n    ' )
    }};

    var content = grunt.template.process( template, datas );

    grunt.file.write( options.output, content );
  });

};