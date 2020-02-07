// https://github.com/facebook/create-react-app/blob/1cbc6f7/packages/react-scripts/config/paths.js
// https://github.com/facebook/create-react-app/blob/1cbc6f7/packages/react-scripts/config/webpack.config.js

const fs = require('fs');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '..');
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  mode: 'development',
  entry: [
    resolveApp('src/index.js'),
  ],
  output: {
    path: resolveApp('dist/'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: resolveApp('public/index.html'),
    })
  ]
};
