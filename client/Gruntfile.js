module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      js: {
        src: 'app/app.js',
        dest: 'dist/js/app.js'
      },
    },
    copy: {
      all: {
        expand: true,
        cwd: 'app/',
        src: ['**/*.html', '**/*.css'],
        dest: 'dist/'
      },
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['browserify', 'copy']);
}
