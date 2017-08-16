/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-less gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr gulp-autoprefixer gulp-rev-append gulp-shell amd-optimize fs path browser-sync del --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'), //基础库
    imagemin = require('gulp-imagemin'), //图片压缩    

    less = require('gulp-less'), //less
    minifycss = require('gulp-minify-css'), //css压缩
    autoprefixer = require('gulp-autoprefixer'), //使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀
    base64 = require('gulp-base64'), //图片转base64编码--暂时没有使用

    jshint = require('gulp-jshint'), //js检查
    jscs = require('gulp-jscs'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'), //js压缩

    del = require('del'), //删除文件
    replace = require('gulp-replace'), //替换str

    path = require('path'),
    runSequence = require('run-sequence'), //按顺序执行
    rename = require("gulp-rename"), //重命名
    replace = require('gulp-replace'), //替换str

    babel = require("gulp-babel"), //编译es6
    webpack = require('gulp-webpack'); //清空文件夹--同del，本例取消clean--本例未使用
var now_project = 'yaya'; //yaya(yaya名片)base(默认页面)
var file_road = {
    jsonSrc: './' + now_project + '/src/**/*.json',
    jsonDst: './' + now_project + '/dist',

    wxmlSrc: './' + now_project + '/src/**/*.wxml',
    wxmlDst: './' + now_project + '/dist',

    cssSrc: './' + now_project + '/src/**/*.{less,wxss}',
    cssDst: './' + now_project + '/dist',

    imgSrc: './' + now_project + '/src/images/**/*',
    imgDst: './' + now_project + '/dist/images',


    jsSrc: './' + now_project + '/src/**/*.js',
    jsDst: './' + now_project + '/dist',

    w_cleanall: './' + now_project + '/dist',

    w_jsonSrc: now_project + '/src/**/*.json',
    w_wxmlSrc: now_project + '/src/**/*.wxml',
    w_cssSrc: now_project + '/src/**/*.less',
    w_imgSrc: now_project + '/src/images/**/*',
    w_jsSrc: now_project + '/src/i**/*.js',
    w_src_source: now_project + '/src/**/*',
    w_dst_source: now_project + '/dist/**/*',
};
// json处理-----复制转移-------------------------------------------------------------------------------------------------------------------------------------
gulp.task('json_dev', function() {
    gulp.src(file_road.jsonSrc)
        .pipe(gulp.dest(file_road.jsonDst))
});
// wxml处理----复制转移--------------------------------------------------------------------------------------------------------------------------------------
gulp.task('wxml_dev', function() {
    gulp.src(file_road.wxmlSrc)
        .pipe(gulp.dest(file_road.wxmlDst))
});
// 样式处理--------编译+后缀+重命名+复制转移----------------------------------------------------------------------------------------------------------------------------------
gulp.task('css_dev', function() {
    gulp.src(file_road.cssSrc)
        .pipe(less({ style: 'expanded' }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0', 'last 2 Explorer versions', 'last 3 Safari versions', 'Firefox >= 20', '> 5%'],
            cascade: true, //是否美化属性值 默认：true 像这样：//-webkit-transform: rotate(45deg);transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(rename((path) => path.extname = '.wxss'))
        //.pipe(replace('.less', '.wxss'))
        .pipe(replace(/\/\*\*\@import/g, '@import'))
        .pipe(replace(/\.less\'\;\*\*\//g, ".wxss';"))
        // .pipe(base64({
        //     baseDir: './static/img',
        //     extensions: ['svg', 'png', /\.jpg#datauri$/i],
        //     exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
        //     maxImageSize: 10 * 1024, // bytes 
        //     debug: true
        // }))
        .pipe(gulp.dest(file_road.cssDst)) //本地目录
});
//备注，当需要在less文件引入其他文件时：例如@import '../../app.less';分号一定要存在，否则编译报错；
//由于less编译会将引入的文件编译成css到当前文件中，而小程序的wxss文件不需要这个编译过程，只需要 变成@import '../../app.wxss';
//所以通过replace进行文字替换；在less文件中，引入的文件需要这样写：/**@import '../../app.less';**/，如果用//屏蔽，则编译不识别
//编译后的内容就是@import '../../app.wxss';
//如果有已经引入的less文件，后面不需要了，请用//做屏蔽，否则会再次被引入
// 图片处理-----压缩+复制转移-------------------------------------------------------------------------------------------------------------------------------------
gulp.task('images_dev', function() {
    gulp.src(file_road.imgSrc)
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest(file_road.imgDst)) //本地目录
});
// js处理-----检测+编译+复制转移-------------------------------------------------------------------------------------------------------------------------------------
gulp.task('js_dev', function() {
    gulp.src(file_road.jsSrc)
        // .pipe(jshint({
        //     "undef": true,
        //     "unused": false
        // }))
        .pipe(jshint.reporter(stylish)) //代码检测
        .pipe(babel({
            presets: ['es2015']
        }))
        //.pipe(webpack(require('./webpack.conf.js')))
        .pipe(gulp.dest(file_road.jsDst)) //本地目录--未压缩
});
// 清空图片、样式、js---最终使用del------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('del', function(cb) {
    del(file_road.w_cleanall, { force: true }, cb);
});
// 监听任务 运行语句 gulp watch------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('watch', function() {
    // 监听json
    gulp.watch(file_road.w_jsonSrc, ['json_dev']);
    // 监听wxml
    gulp.watch(file_road.w_wxmlSrc, ['wxml_dev']);
    // 监听css
    gulp.watch(file_road.w_cssSrc, ['css_dev']);
    // 监听images
    gulp.watch(file_road.w_imgSrc, ['images_dev']);
    // 监听js
    gulp.watch(file_road.w_jsSrc, ['js_dev']);

    //监听删除
    var watcher = gulp.watch([file_road.w_src_source]);
    watcher.on('change', function(event) {
        //console.log(event.type);
        if (event.type === 'deleted') {
            var src = path.relative(path.resolve('src'), event.path);
            src = src.replace(/.es6$/, '.js');
            console.log(src);
            var dest;
            if (src.split('/')[0] == 'less') {
                //src=src.split('.')[0]+'.css';
                src = src.replace(/less/g, 'wxss');
            }
            console.log(src);
            dest = path.resolve(file_road.w_dst_source, src);
            del.sync(dest);
        }
    });
});


//初始化静态资源
gulp.task('static', function(done) {
    runSequence(
        ['json_dev', 'wxml_dev', 'css_dev', 'images_dev', 'js_dev'],
        done);
});

gulp.task('dev', function(done) {
    runSequence(
        ['json_dev', 'wxml_dev', 'css_dev', 'images_dev', 'js_dev'], ['watch'],
        done);
});
gulp.task('default', ['dev']);

//删除不可用

//重要备注：less文件名和路径中当中不能包含‘less’,less文件中的内容不要包含.less；html文件名当中不能包含‘.’
// {
//   "presets": ["es2015", "stage-2"],
//   "plugins": ["transform-runtime"],
//   "comments": false
// }