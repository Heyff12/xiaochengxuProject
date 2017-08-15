/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-less gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr gulp-autoprefixer gulp-rev-append gulp-shell amd-optimize fs path browser-sync del --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'), //基础库
    imagemin = require('gulp-imagemin'), //图片压缩    

    spriter = require('gulp-css-spriter'), //控制图片大小自适应显示问题——background-position: 需要变成显示的一半，background-size:200% auto;---取消雪碧图--本例未使用
    spritesmith = require('gulp.spritesmith'), //图片精灵,取消使用--本例未使用
    imageResize = require('gulp-image-resize'), //取消使用--报错--本例未使用
    pngquant = require('imagemin-pngquant'), //取消使用--本例未使用
    buffer = require('vinyl-buffer'), //取消使用--本例未使用
    csso = require('gulp-csso'), //取消使用--本例未使用
    merge = require('merge-stream'), //取消使用--本例未使用

    less = require('gulp-less'), //less
    minifycss = require('gulp-minify-css'), //css压缩
    autoprefixer = require('gulp-autoprefixer'), //使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀
    postcss = require('gulp-postcss'), //单位转化px--rem
    px2rem = require('postcss-px2rem'), //单位转化px--rem
    base64 = require('gulp-base64'), //图片转base64编码

    jshint = require('gulp-jshint'), //js检查
    jscs = require('gulp-jscs'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'), //js压缩

    del = require('del'), //删除文件
    header = require('gulp-header'), //给文件头部增加特殊内容
    replace = require('gulp-replace'), //替换str

    path = require('path'),
    runSequence = require('run-sequence'), //按顺序执行

    browserSync = require('browser-sync').create(), //页面实时刷新
    babel = require("gulp-babel"), //编译es6
    webpack = require('gulp-webpack'),

    rev = require('gulp-rev'), //- 对文件名加MD5后缀--本例未使用
    revCollector = require('gulp-rev-collector'), //- 路径html替换--本例未使用
    connect = require('gulp-connect'), //搭建服务器并自动更新更改--本文件没用使用，而是用的browser-sync--本例未使用
    livereload = require('gulp-livereload'), //livereload,可以合上面配合使用（暂时没用）--本例未使用

    rename = require('gulp-rename'), //重命名--本例未使用
    concat = require('gulp-concat'), //合并文件--本例未使用
    clean = require('gulp-clean'); //清空文件夹--同del，本例取消clean--本例未使用
var now_project = 'settle'; //settle(结算)test(es6)
var file_road = {
    cssSrc: './' + now_project + '/src/less/**/*.less',
    cssDst: './' + now_project + '/static/css',

    imgSrc: './' + now_project + '/src/img/**/*',
    imgDst: './' + now_project + '/static/img',

    jsLocal_es6_no: ['./' + now_project + '/src/js/{plug,common}/**/*.js', './' + now_project + '/src/js/require.2.1.11.min.js', './' + now_project + '/src/js/require-config.js'],
    jsLocal_es6: ['./' + now_project + '/src/js/**/*.js', '!./' + now_project + '/src/js/require.2.1.11.min.js', '!./' + now_project + '/src/js/require-config.js', '!./' + now_project + '/src/js/plug/**/*.js'],
    jsDst: './' + now_project + '/static/js',
    jsDst_es6: './' + now_project + '/static/js/home',

    htmlSrc: './' + now_project + '/html/**/*.html',

    w_cleanall: './' + now_project + '/static/{js,css,img}/**/*',

    w_cssSrc: now_project + '/src/less/**/*.less',
    w_imgSrc: now_project + '/src/img/**/*',
    w_jsLocalSrc_es6: [now_project + '/src/js/**/*.js', '!' + now_project + '/src/js/require.2.1.11.min.js', '!' + now_project + '/src/js/require-config.js', '!' + now_project + '/src/js/plug/**/*.js'],
    w_jsLocalSrc_es6_no: [now_project + '/src/js/require.2.1.11.min.js', now_project + '/src/js/require-config.js', now_project + '/src/js/plug/**/*.js'],
    w_htmlSrc: now_project + '/html/**/*.html',
};
// 样式处理------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('css', function() {
    var processors = [px2rem({ remUnit: 37.5 })];
    gulp.src(file_road.cssSrc)
        .pipe(less({ style: 'expanded' }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0', 'last 2 Explorer versions', 'last 3 Safari versions', 'Firefox >= 20', '> 5%'],
            cascade: true, //是否美化属性值 默认：true 像这样：//-webkit-transform: rotate(45deg);transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(postcss(processors)) //--变得有点小
        .pipe(base64({
            baseDir: './static/img',
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 10 * 1024, // bytes 
            debug: true
        }))
        //.pipe(header(banner, { pkg: pkg })) //增加头部注释
        .pipe(gulp.dest(file_road.cssDst)) //本地目录
        // .pipe(rev()) //版本号
        // .pipe(minifycss()) //todo暂时隐藏压缩
        // .pipe(gulp.dest(file_road.cssDst_end)) //最终目录
        // .pipe(rev.manifest()) 
        // .pipe(gulp.dest('rev/css'))
        .pipe(browserSync.stream());
});
// 图片处理------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('images', function() {
    gulp.src(file_road.imgSrc)
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest(file_road.imgDst)) //本地目录
        .pipe(browserSync.stream());
});
//语法检查------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('jshint', function() {
    return gulp.src(file_road.jsLocal)
        //.pipe(jscs()) //检测JS风格
        .pipe(jshint({
            "undef": false,
            "unused": false
        }))
        //.pipe(jshint.reporter('default'))  //错误默认提示
        .pipe(jshint.reporter(stylish)) //高亮提示
        .pipe(jshint.reporter('fail'));
});
//js--转es6
gulp.task('js_local_es6', function() {
    gulp.src(file_road.jsLocal_es6)
        // .pipe(jshint({
        //     "undef": true,
        //     "unused": false
        // }))
        .pipe(jshint.reporter(stylish)) //代码检测
        .pipe(babel({
            presets: ['es2015'],
            // modules: "amd" // 默认是 common，也可以改成 umd
        }))
        //.pipe(webpack(require('./webpack.conf.js')))
        .pipe(gulp.dest(file_road.jsDst)) //本地目录--未压缩
        .pipe(browserSync.stream())
});
//js--非转es6
gulp.task('jsLocal_es6_no', function() {
    gulp.src(file_road.jsLocal_es6_no)
        // .pipe(jshint.reporter('default')) //代码检测
        .pipe(gulp.dest(file_road.jsDst)) //本地目录--未压缩
        .pipe(browserSync.stream())
});
//html实时监听------------------------------------------------
gulp.task('html_fresh', function() {
    gulp.src(file_road.htmlSrc)
        .pipe(browserSync.stream())
});
// 清空图片、样式、js---最终使用del------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('del', function(cb) {
    del(file_road.w_cleanall, { force: true }, cb);
});
// 监听任务 运行语句 gulp watch------------------------------------------------------------------------------------------------------------------------------------------
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
        port: 3002
    });
    // 监听css
    gulp.watch(file_road.w_cssSrc, ['css']);
    // 监听images
    gulp.watch(file_road.w_imgSrc, ['images']);
    // 监听js
    gulp.watch(file_road.w_jsLocalSrc_es6, ['js_local_es6']);
    gulp.watch(file_road.w_jsLocalSrc_es6_no, ['jsLocal_es6_no']);
    // 监听html变动
    gulp.watch(file_road.w_htmlSrc, ['html_fresh']);

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
                src = src.replace(/less/g, 'css');
            }
            if (src.split('/')[1] == 'html') {
                //src=src.split('.')[0]+'.css';
                src = src.replace(/\.\.\/html\//, '');
                dest = path.resolve(file_road.w_dsthtml_source, src);
                console.log(src);
                del.sync(dest);
                return false;
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
        ['images', 'css', 'js_local_es6', 'jsLocal_es6_no'],
        done);
});

gulp.task('dev', function(done) {
    runSequence(
        ['images', 'css', 'js_local_es6', 'jsLocal_es6_no'], ['watch'],
        done);
});
gulp.task('default', ['dev']);

//删除不可用

//重要备注：less文件名和路径中当中不能包含‘less’；html文件名当中不能包含‘.’
// {
//   "presets": ["es2015", "stage-2"],
//   "plugins": ["transform-runtime"],
//   "comments": false
// }