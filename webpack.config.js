const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const meta = require(path.resolve(__dirname, 'src') + '/meta.json');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            meta,
            template: path.resolve(__dirname, 'src') + '/index.html',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
    },
};
