module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'index.js'],
      options: {
        reporter: require('jshint-stylish')
      }
    },
    less: {
      dev: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "assets/css/main.min.css": "public/css/*.less"
        }
      },
      prod: {
        options: {
          paths: ["assets/css"],
          plugins: [
            new(require('less-plugin-autoprefix'))({
              browsers: ["last 2 versions"]
            }),
            new(require('less-plugin-clean-css'))({})
          ],
          modifyVars: {}
        },
        files: {
          "assets/css/main.min.css": "public/css/*.less"
        }
      }
    },
    cssmin: {
      bundle: {
        files: {
          'assets/css/main.min.css': ['assets/css/main.min.css']
        },
        options: {
          keepSpecialComments: 0
        }
      }
    },
    nodemon: {
      dev: {
        script: 'index.js',
        options: {
          cwd: __dirname,
          ignore: ['node_modules/**', 'public/**', 'views/**'],
          ext: 'js',
          watch: ['index.js', 'src/**/*.js'],
          delay: 250
        }
      }
    },
    watch: {
      js: {
        files: ['index.js', 'src/**/*.js'],
        tasks: ['jshint']
      },
      less: {
        files: ['public/css/**/*.less'],
        tasks: ['less:dev']
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch:js', 'watch:less'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'less:dev', 'concurrent:dev']);
  grunt.registerTask('publish', ['less:prod', 'cssmin:bundle']);
};