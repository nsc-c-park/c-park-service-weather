const gulp = require('gulp');
const ts = require('gulp-typescript');
const cleanup = require('gulp-cleanup-dest');

// pull in the project TypeScript config
const tsProject = ts.createProject('src/tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(cleanup({ dest: 'dist', ext: '.js' }))
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});


gulp.task('default', ['watch']);
