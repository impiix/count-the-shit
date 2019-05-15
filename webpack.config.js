const webpack = require('webpack');

module.exports = {
    entry: './src/js/components/math.jsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", "*.jsx"]
    },
    output: {
        path: __dirname + 'dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './',
        hot: true
    }
};