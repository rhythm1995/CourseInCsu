//载入插件

const gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),        //自动处理前缀
    minifycss = require('gulp-minify-css'),             //css压缩
    uglify = require('gulp-uglify'),                    //丑化
    imagemin = require('gulp-imagemin'),                //图片压缩
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),                    //拼接
    notify = require('gulp-notify'),                    //更改通知
    cache = require('gulp-cache'),                      //图片快取
    livereload = require('gulp-livereload');            //即时重整


//建立任务
//处理sass并压缩css
gulp.task('styles',function () {
    return gulp.src('/public/style/sass/mui.scss')
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

//压缩合并js
gulp.task('scripts',function () {
    return gulp.src('/public/script/')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

//创建目录
gulp.task('clean', function() {
    return gulp.src(['/dist/assets/css', '/dist/assets/js'], {read: false})
        .pipe(clean());
});

//预设任务
gulp.task('default',['clean'],function () {
    gulp.start('styles','scripts');
});

//守护
gulp.task('watch',function () {
    gulp.watch('/public/style/*.scss && /public/style/mui/*.scss',['styles']);
    gulp.watch('/public/script/*.js',['script']);
});