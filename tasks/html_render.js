/*
 * grunt-html-render
 * https://github.com/helloyou2012/grunt-html-render
 *
 * Copyright (c) 2014 学霸
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var swig = require('swig');
  swig.setDefaults({
    cache: false
  });

  var html_render = function(src, dest, options, cb) {
    src.forEach(function(file) {
      grunt.file.write(dest, swig.renderFile(file, {}));
    });
  };

  grunt.registerMultiTask('html_render', 'html render', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();
    var done = this.async();

    if (this.files.length > 0) {
      // Iterate over all specified file groups.
      this.files.forEach(function(f) {
        // Concat specified files.
        var src = f.src.filter(function(filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        });

        html_render(src, f.dest, options, function(err) {
          if (!err) {
            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
          }
          done(!err);
        });

      });
    } else {
      // Print a success message.
      grunt.log.writeln('No page file found.');
      done();
    }
  });

};