var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'app/app.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015','react']
          }
        },
        //图片,路径模块
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
        },
        //css
        {
         test: /\.css$/,
         loader: 'style!css'
        }
    ]
  }

}