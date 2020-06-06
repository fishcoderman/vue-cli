const path = require('path');
const webpack = require("webpack");
const vuePluginLoader = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取js中的css文件，避免同一打包
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
/**
 * cnpm install --save-dev cross-env 安装插件, 并且在package文件设置指定值如下
 *  "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot"
 *  "build": "cross-env NODE_ENV=production webpack --mode=production 
 */
const isProd = process.env.NODE_ENV === 'production';
console.log('process.env.NODE_ENV', isProd)
const config = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: "js/[name]_chunk.js", // import('fliename') 情况下将文件打包为chunk
    // library: ['al'],
    // libraryTarget: 'umd'
    // publicPath: './',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8088,
    hot: true,
    open: true
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      options: {
//         "plugins": [
//           [
//             "@babel/plugin-transform-runtime",
//             {
//               "corejs": 2,
//               "helpers": true,
//               "regenerator": true,
//               "useESModules": false
//             }
//           ]
//         ]
        // presets: [
        //   [
        //     '@babel/preset-env', 
        //     {
        //       "targets": {
        //         "edge": "17",
        //         "firefox": "60",
        //         "chrome": "67",
        //         "safari": "11.1",
        //       },
        //       "useBuiltIns": "usage"
        //     }
        //   ]
        // ]
      }
      
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[hash:7].[ext]',
          outputPath: "images",
          publicPath: './images',
          esModule: false
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader', // 一定要放在中间位置
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    // vue适配
    new vuePluginLoader(),
    // html模版
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      minify: true, // 压缩html
      removeComments: true,
    }),
    // 打包前清除文件
    new CleanWebpackPlugin(),
    // 模块热更新
    new webpack.HotModuleReplacementPlugin(),
    // 打包进度条
    new ProgressBarPlugin(),
    // 提取css
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.vue', '.json', '.css', '.scss']
  },
  externals: {
    'vue': 'Vue',
    // 'element-ui': 'ELEMENT',
  },
  optimization: {
    // 将node_modules中的依赖打包到vendors
    splitChunks: {
      chunks: 'all'
    }
  }
}

module.exports = env => {
  // package.json可以传参数 控制台打印： env { name: 'abc' }
  console.log('env', env);
  return config;
}
