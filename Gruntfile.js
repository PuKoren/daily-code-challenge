module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'index.js'],
      options: {
        reporter: require('jshint-stylish')
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
      files: ['index.js', 'src/**/*.js'],
      tasks: ['jshint']
    },
    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['concurrent:dev']);
};