// Copyright (c) 2016 Jason Yin <jasonyin@outlook.com>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('script', () => {
  return gulp.src('./app/*.js')
    .pipe(babel({
      presets: ['node6']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', () => {
  gulp.watch('./app/*.js', ['script']);
});