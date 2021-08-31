const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/client/js/app.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: 'dist',
    open: true,
    port: 9090,
    proxy: {
      '/api/*': 'http://localhost:8080',
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          }
        }
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:ico|svg|gif|png|jpg|jpeg)$/,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/client/views/index.html',
    }),
    new CleanWebpackPlugin()
  ]
};
