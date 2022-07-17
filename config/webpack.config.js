const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin} = require('webpack');


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
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    cacheDirectory: true
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
        new VueLoaderPlugin(),
        // cross-env定义的环境变量给打包工具使用
        // DefinePlugin定义环境变量是给源代码使用的,从而解决vue3页面警告问题
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
                    name: 'vue-chunk',
                    priority: 40,
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
        extensions: ['.vue','.js','.json']
    },
    devtool: 'cheap-module-source-map'
}