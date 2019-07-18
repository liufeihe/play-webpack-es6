const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin'); 
const copyWebpackPlugin = require('copy-webpack-plugin'); 
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
                test: /\.scss$/,
                // use: [
                //     "style-loader",
                //     "css-loader",
                //     "sass-loader"
                // ],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader"
                })
            },
            {
                test: /\.es6?$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
         //静态资源输出
         new copyWebpackPlugin([{
            from: path.resolve(__dirname, "../src/libs"),
            to: './libs',
            ignore: ['.*']
        }]),
        new ExtractTextPlugin('css/[name].[hash].css')
    ]
}

//生成多个页面
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
        filename: page.filename, // 文件名，生成的html存放路径，相对于path
        template: page.template, // html模板的路径
        chunks: [page.chunks],
        inject: 'body', // //js插入的位置
        minify: { // 压缩HTML文件
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: false, // 删除空白符与换行符
            removeAttributeQuotes: true
        },
    }
    webpackCfg.plugins.push(new htmlWebpackPlugin(conf))
});
module.exports = webpackCfg;