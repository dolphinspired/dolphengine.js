const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.ts',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
    library: 'dolphengine',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /.(ts|tsx)?$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [/node_modules/]
      }
    ]
  },

  devServer: {
    open: false,
    openPage: '/app/index.html',
    writeToDisk: true
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
