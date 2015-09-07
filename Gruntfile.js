module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //uglify: {
    //  options: {
    //    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //  },
    //  my_target: {
    //    files: {
    //      'dest/output.min.js': ['src/*.js']
    //    }
    //  }
    //},
    //jshint: {
    //  files: ['Gruntfile.js', 'src/*.js'],
    //  options: {
    //    globals: {
    //      jQuery: true
    //    }
    //  }
    //},
    less: {
      development: {
        options: {
          paths: ['less'],
          compress: false,
          ieCompat: true,
          rootpath: null,
          optimization: null,
          strictImports: false,
          strictMath: false,
          strictUnits: false,
          syncImport: false,
          dumpLineNumbers: false,
          relativeUrls: false,
          sourceMap: true,
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers : [ "last 2 versions" ]})
          ]
        },
        files: {
          'dest/style.css': 'less/*.less'
        }
      },
      production: {
        options: {
          paths: ['less'],
          compress: true,
          ieCompat: true,
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers : [ "last 2 versions" ]})
          ]
        },
        files: {
          'dest/style.css': 'less/*.less'
        }
      }
    },
    //lintspaces: {
    //  all: {
    //    src: [
    //        'src/*',
    //        'src/*/*'
    //    ],
    //    options: {
    //        newline: true,
    //        newlineMaximum: 2,
    //        trailingspaces: true,
    //        indentation: 'spaces',
    //        spaces: 2
    //    }
    //  }
    //},
    //clean: ['dest'],
    watch: {
      scripts: {
        files: ['*','*/*', '*/*/*'],
        tasks: ['build'],
        options: {
          spawn: false,
        }
      }
    },
    bgShell: {
      _defaults: {
        bg: true
      },
      server: {
        cmd: 'python -m SimpleHTTPServer'
      }
    }
  });

  // Load the plugins
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-lintspaces');
  //grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bg-shell');

  grunt.registerTask('build', ['less:development', 'bgShell']);

  // Default task(s).
  grunt.registerTask('default', ['build', 'watch']);

};
