module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'index.js',
        options: {
          cwd: __dirname,
          ignore: ['node_modules/**', 'public/**', 'src/**', 'views/**'],
          ext: 'js',
          watch: ['index.js'],
          delay: 250,
          legacyWatch: true
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon:dev'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task(s).
  grunt.registerTask('default', ['concurrent:dev']);
}