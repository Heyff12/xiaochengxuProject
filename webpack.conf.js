var path = require('path');
var webpack = require('webpack');
var untils = require('./until.js'); // 全局变量配置
module.exports = {
    'entry': untils.entry,
    'output': {
        // 'filename': '[name].min.js',
        // 'sourceMap': true,
        // 'sourceMapFilename': '../sourcemaps/[name].min.js.map'
        'path': path.resolve(__dirname, './test/static/js/home'),
        'filename': '[name].js',
        //filename: 'js/[name]-[hash].js',//生成的js地址和文件名称
    },
    //'devtool': 'source-map',
    // 'plugins': [
    //     new webpack.optimize.UglifyJsPlugin({
    //         'compress': {
    //             'warnings': false
    //         }
    //     })
    // ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, './node_modules'), //不需要babel编译的范围
            include: path.resolve(__dirname, './test/src/js'), //打包的范围
            query: {
                //presets: ['latest']
                presets: ["es2015"],
                plugins: ["transform-runtime"],
                comments: false
            }
        }]
    },
    // 'module': {
    //     'loaders': [{
    //         'test': /\.js$/,
    //         'exclude': /node_modules/,
    //         'loader': 'babel',
    //         'query': {
    //             'presets': ['es2015']
    //             'plugins': ['transform-runtime'],
    //             'cacheDirectory': true
    //         }
    //     }]
    // }
}
