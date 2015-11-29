module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        beautify: true,
        mangle: false, //prevent change variables names
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      my_target: {
        files: {
          'dest/app.js': [
            'src/*.js',
            'src/*/*.js',
            'src/*/*/*.js',
            'src/*/*/*/*.js',
            'src/*/*/*/*/*.js'
          ]
        }
      },
      min: {
        files: grunt.file.expandMapping(
          [
            'src/*.js',
            'src/**/*.js',
            'src/**/**/*.js',
            'src/**/**/**/*.js',
            'src/**/**/**/**/*.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-animate/angular-animate.js'
          ],
          'dest/',
          {
            rename: function(destBase, destPath) {
              console.log(destBase+destPath.replace('src/', ''));
              return destBase+destPath.replace('src/', '');
            }
          }
        )
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: grunt.file.expandMapping(
          [
            'src/*.html',
            'src/**/*.html',
            'src/**/**/*.html',
            'src/**/**/**/*.html',
            'src/**/**/**/**/*.html'
          ],
          'dest/',
          {
            rename: function(destBase, destPath) {
              console.log(destBase+destPath.replace('src/', ''));
              return destBase+destPath.replace('src/', '');
            }
          }
        )
      }
    },
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
          'dest/css/style.css': ['*.less', '*/*.less', '*/*/*.less', '*/*/*/*.less']
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
          'dest/css/style.css': ['*.less', '*/*.less', '*/*/*.less', '*/*/*/*.less']
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
    clean: ['dest'],
    watch: {
      scripts: {
        files: ['*','*/*', '*/*/*', '*/*/*/*', '*/*/*/*/*'],
        tasks: ['build'],
        options: {
          spawn: false,
        }
      },
      local: {
        files: ['*','*/*', '*/*/*', '*/*/*/*', '*/*/*/*/*'],
        tasks: ['build-local'],
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
    },
    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: 'host',
              replacement: 'flatmateapp.herokuapp.com'
            },
            {
              match: 'port',
              replacement: ''
            },
            {
              match: 'protocol',
              replacement: 'http://'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['dest/factories/serverConfig.js'],
            dest: 'dest/factories/'
          }
        ]
      },
      local: {
        options: {
          patterns: [
            {
              match: 'host',
              replacement: 'localhost'
            },
            {
              match: 'port',
              replacement: ':3000'
            },
            {
              match: 'protocol',
              replacement: 'http://'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['dest/factories/serverConfig.js'],
            dest: 'dest/factories/'
          }
        ]
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('build',
    [
      'clean',
      'uglify:min',
      'replace:dev',
      'htmlmin',
      'less:development',
      'bgShell'
    ]
  );

  grunt.registerTask('build-local',
    [
      'clean',
      'uglify:min',
      'replace:local',
      'htmlmin',
      'less:development',
      'bgShell',
      'watch:local'
    ]
  );

  // Default task(s).
  grunt.registerTask('default', ['build', 'watch']);

};
