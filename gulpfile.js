const gulp = require('gulp');
const ts = require('gulp-typescript');
const cleanup = require('gulp-cleanup-dest');
var nodemon = require('nodemon');
var livereload = require('gulp-livereload');

const tsc = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    return tsc.src()
        .pipe(cleanup({ dest: 'dist', ext: '.js' }))
        .pipe(tsc())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('develop', function() { 
  livereload.listen();
  nodemon({script: './dist/index', ext: 'js', legacyWatch: true}).on('restart', function () {
        setTimeout(function () {
            livereload.changed();
        }, 2000); 
    });
});

gulp.task('default', ['scripts', 'watch', 'develop']);