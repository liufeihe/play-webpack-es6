const path = require('path');

const getEntries = ()=>{
    return {
        a: './src/pages/a/pageA.es6',
        b: './src/pages/b/pageB.es6',
        c: './src/pages/c/pageC.es6'
    }
}

module.exports = {
    entry: getEntries(),
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