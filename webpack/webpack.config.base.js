const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app/index.js',
  },
  output: {
    filename: 'js/[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(['build', 'dist'], {
      root: path.join(__dirname, '../'),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }),
    new StyleLintPlugin({
      reporters: [{ formatter: 'string', console: true }],
    }),
    new CopyWebpackPlugin([
      { from: './src/img', to: 'img' },
      { from: './src/pdf', to: 'pdf' },
      { from: './src/static', to: '' },
    ]),
    new WriteFilePlugin(),
  ],
  module: {
    rules: [
      {
        test: /.js?$/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
        include: path.join(__dirname, '../src'),
      },
      {
        test: /.pug?$/,
        loader: 'pug-loader',
        include: path.join(__dirname, '../src'),
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        include: path.join(__dirname, '../src'),
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            publicPath: '../',
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/app/'),
      Conf: path.resolve(__dirname, '../conf/'),
      Abstract: path.resolve(__dirname, '../src/js/contentScripts/abstract/'),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'app',
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          enforce: false,
        },
      },
    },
  },
};
