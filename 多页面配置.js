const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    detail: './src/detail.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  devServer: { // 配置这个前提是要安装webpack-dev-server，然后运行webpack-dev-server
    contentBase: path.join(__dirname, 'build'), // 告诉服务器内容的来源
    compress: true,
    port: 9000,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: 'asset/index.html',
      template: 'public/index.html' // 指定html模板
    }),
    new HtmlWebpackPlugin({
      chunks: ['detail'],
      filename: 'asset/detail.html',
      template: 'public/detail.html' // 指定html模板
    })
  ]
}