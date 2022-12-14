// Node.js的核心模块，专门用来处理文件路径
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TestPlugin = require("./plugins/TestPlugin");
const BannerWebpackPlugin = require("./plugins/BannerWebpackPlugin");
const BuildTagPlugin = require("./plugins/BuildTagPlugin");
const pakeageInfo = require('./package.json')

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: "./src/index.js",
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "dist"),
    // filename: 输出文件名
    filename: "index.js",
  },
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),
    // new TestPlugin()
    new BuildTagPlugin({
      author: '张三三',
      version: pakeageInfo.version,
      description: pakeageInfo.description,
    })
  ],
  // 模式
  mode: "development", // 开发模式
};
