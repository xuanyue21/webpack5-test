/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-12 07:45:42
 * @Description: 
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TestPlugin = require('./plugins/test-plugin');
// const BannerWebpackPlugin = require('./plugins/banner-webpack-plugin');
const CleanWebpackPlugin = require('./plugins/clean-webpack-plugin');
const AnalyzeWebpackPlugin = require('./plugins/analyze-webpack-plugin');
const InlineChunkWebpackPlugin = require('./plugins/inline-chunk-webpack-plugin');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js',
    },
    module:{
        rules:[
            // {
            //     test: /\.js$/,
            //     loader: './loaders/test-loader.js'
            // },
            // {
            //     test: /\.js$/,
            //     use: [ 
            //         './loaders/demo/test4.js',
            //     './loaders/demo/test5.js',
            //     './loaders/demo/test6.js'
            // ]
            // },
            {
                test: /\.js$/,
                loader: "./loaders/clean-log-loader.js"
            },
            // {
            //     test: /\.js$/,
            //     loader: "./loaders/banner-loader/index.js",
            //     options: {
            //        author: '老王',
            //        age: 18
            //     }
            // },
            {
                test: /\.js$/,
                loader: "./loaders/babel-loader/index.js",
                options: {
                  presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: './loaders/file-loader/index.js',
                type: "javascript/auto" // 阻止webpack默认处理图片资源,只能使用file-loader处理
            },
            {
                test: /\.css$/,
                use: ["./loaders/style-loader/index.js","css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./public/index.html'),
        }),
        // new TestPlugin(),
        // new BannerWebpackPlugin({
        //     author: '老王'
        // }),
        new CleanWebpackPlugin(),
        new AnalyzeWebpackPlugin(),
        new InlineChunkWebpackPlugin([
            /runtime(.*)/
        ])
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: entryPoint => `runtime~${entryPoint.name}`
        }
    },
    mode: 'production'
}