/*
 * @Author: 翟珂峰
 * @LastEditTime: 2022-07-17 13:12:43
 * @Description: 
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const getStyleLoader = (pre) => {
    return [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        ['postcss-preset-env']
                    ]
                }
            }
        },
        pre
    ].filter(Boolean)
}
module.exports = {
    mode: 'production',
    // 输入
    entry: './src/main.js',
    // 输出
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].chunk.js',
        assetModuleFilename: 'static/[name].[ext][query]',
        clean: true
    },
    // loaders
    module: {
        rules:[
            {
                test: /\.css$/,
                use: getStyleLoader(),
            },
            {
                test: /\.less$/,
                use: getStyleLoader("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader("sass-loader"),
            },
            {
                test: /.(png|jpe?g|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /.(ttf|woff2?|mp3|mp4)$/,
                type: "asset/resource",
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                }
            }
        ]
    },
    // plugins
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname,'../src'),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname,'../node_modules/.cache/.cacheEslint'),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].chunk.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
              { 
                from:path.resolve(__dirname,'../public'), 
                to: path.resolve(__dirname,'../dist'),
                globOptions: {
                    ignore: ["**/index.html",],
                },
                },
            ],
            
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
                    name: 'react-chunk',
                    priority: 40,
                },
                antd: {
                    test: /[\\/]node_modules[\\/]antd(.*)?[\\/]/,
                    name: 'antd-chunk',
                    priority: 30,
                },
                default: {
                    test: /[\\/]node_modules/,
                    name: 'default-chunk',
                    priority: 20,
                }
            }
        },
        runtimeChunk:{
            name: entryP => `runtime~${entryP.name}`
        },
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    },
    resolve:{
        extensions: ['.jsx','.js','.json']
    },
    devtool: 'source-map',
    performance: false,// 关闭性能分析
}