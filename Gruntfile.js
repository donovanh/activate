module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files:
          [
            { 'stylesheets/custom.css' : 'sass/custom.scss' },
            { 'stylesheets/animations.css' : 'sass/animations.scss' }
          ]
      }
    },
    reload: {
        port: 35729,
        liveReload: {}
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8']
      },
      files: {
        src: 'stylesheets/*.css'
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['*.html'], dest: 'dist/'},
          {expand: true, src: ['images/**'], dest: 'dist/'},
          {expand: true, src: ['javascripts/**'], dest: 'dist/'},
          {expand: true, src: ['stylesheets/**'], dest: 'dist/'},
          {expand: true, src: ['bower.json'], dest: 'dist/'},
          {expand: true, src: ['README.md'], dest: 'dist/'},
          {expand: true, src: ['test/**'], dest: 'dist/'},
        ]
      }
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**/*']
    },
    watch: {
      css: {
        files: 'sass/**/*',
        tasks: ['sass', 'autoprefixer']
      }
    },
    strip_code: {
      options: {
        start_comment: 'start-test-block',
        end_comment: 'end-test-block',
      },
      files: {
        src: 'dist/*.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-strip-code');

  grunt.registerTask('default',['reload', 'watch']);
  grunt.registerTask('deploy',['sass', 'autoprefixer', 'copy', 'strip_code', 'gh-pages']);
}