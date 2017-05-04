var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
notify = require('gulp-notify');
// 图片处理任务
gulp.task('images', function() {
  return gulp.src('src/pre-images/*')
    .pipe(imagemin())      //压缩图片
    .pipe(gulp.dest('src/images'))
    .pipe(notify({ message: '图片处理完成' }));
});
