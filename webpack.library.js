const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 库导出最好用 export default导出，因为import导入默认为： import library from 'library' => import {default as library} from 'library';
 * import需要default属性，如果是export导出，则改为 import {library as library} from 'library';
 */
module.exports = {
  mode: 'development',
  entry: './src/utils.js',
  output: {
    filename: 'library.js',
    path: path.resolve(__dirname, 'lib'),
    library: 'library',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    // html模版
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      minify: true, // 压缩html
      removeComments: true,
    }),
  ]


}