const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin'); 

const getEntries = ()=>{
    return {
        a: './src/pages/a/pageA.es6',
        b: './src/pages/b/pageB.es6',
        c: './src/pages/c/pageC.es6'
    }
}

let webpackCfg = {
    entry: getEntries(),
    devServer: {
        index: 'a.html',
        contentBase: './dist',
        // port: 8080,
        open: true
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name]-[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.es6?$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: []
}

//生存多个页面
var pages = [
    {
        filename: 'a.html',
        template: 'src/pages/a/a.html',
        chunks: 'a'
    },
    {
        filename: 'b.html',
        template: 'src/pages/b/b.html',
        chunks: 'b'
    },
    {
        filename: 'c.html',
        template: 'src/pages/c/c.html',
        chunks: 'c'
    }
]
pages.forEach(function(page) {
    var conf = {
        template: page.template, // html模板路径
        filename: page.filename, // 生成的html存放路径,文件名，相对于path
        chunks: [page.chunks],
        inject: 'body', // //js插入的位置
        hash: false,
        minify: { // 压缩HTML文件
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: false, // 删除空白符与换行符
            removeAttributeQuotes: true
        },
    }
    webpackCfg.plugins.push(new htmlWebpackPlugin(conf))
});
module.exports = webpackCfg;