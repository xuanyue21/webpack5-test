const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const getStyleLoader = (pre) => {
    return [
        'style-loader',
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
    mode: 'development',
    // 输入
    entry: './src/main.js',
    // 输出
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
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
                test: /.(ttf|woff2?|mp3|mp4|avi)$/,
                type: "asset/resource",
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: ['react-refresh/babel']
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
        new ReactRefreshWebpackPlugin(),
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
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: '8080',
        hot: true,
        open: true,
        historyApiFallback: true
    },
    resolve:{
        extensions: ['.jsx','.js','.json']
    },
    devtool: 'cheap-module-source-map'
}