module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      files: {
        src: ['src/**.js'],
      },
      options: {
        globals: {}
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'dist/css',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'dist/css',
          environment: 'development'
        }
      }
    },
    venus: {
      tests: [
        'src/test/demo.js'
      ]
    },
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: ['dist/**/*.css'],
      },
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['jshint', 'venus'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: 'src/scss/*.scss',
        tasks: ['compass:dev'],
      },
    },
    connect: {
      uses_defaults: {}
    },
    concat: {
      prod: {
        files: {
          'dist/main.js': ['src/main.js'],
          // 'dist/with_extras.js': ['src/main.js', 'src/extras.js'],
        }
      }
    },
    uglify: {
      prod: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'src/js',
          src: 'src/*.js',
          dest: 'dist/js'
        }]
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-venus');

  // Dev tasks
  grunt.registerTask('default', ['connect', 'watch']);

  // Prod task(s).
  grunt.registerTask('prod', ['uglify', 'concat']);
};