
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var babel = require('gulp-babel');

var paths = {
  frontend: {
    js: [
      'app/**/*.js'
    ],
    html: [
      'app/**/*.html'
    ],
    // sass: [
    //   'app/sass/styles.scss'
    // ]
  },
  backend: {
    js: [
      'server.js',
      'lib/*.js',
      'models/*.js',
      'routes/*.js'
    ],
    test: [
      'test/**/.js'
    ]
  }
};

gulp.task('jshint:frontend', function() {
  return gulp.src(paths.frontend.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint:backend', function() {
  return gulp.src([paths.backend.js, paths.backend.test])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
  return gulp.src(paths.frontend.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/css/'))
    .pipe(livereload())
    .pipe(notify({ message: 'Sass task complete' }));
});

gulp.task('static:dev', function() {
  gulp.src(paths.frontend.html)
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/app.js')
  .pipe(webpack({
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
    },
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack:dev', 'static:dev']);

gulp.task('watch', function() {
  gulp.watch([paths.frontend.js, paths.frontend.html], ['jshint:frontend', 'build']);
});

gulp.task('default', ['jshint:frontend', 'build']);
