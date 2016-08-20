import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === 'production';

export default {
  entry: './src/entry.js',
  output: {
    path: './dist',
    filename: 'script.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: 'Small file service',
      hash: true
    })
  ].concat(isProduction ? new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }) : []),
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['.js'],
    alias: isProduction ? {
      'redux$': 'redux/dist/redux.min.js',
      'react$': 'react/dist/react.min.js',
      'react-dom$': 'react-dom/dist/react-dom.min.js'
    } : {}
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: [
            'syntax-async-functions',
            ['transform-runtime', {
              'polyfill': false,
              'regenerator': true
            }]
          ],
          presets: ['es2015', 'es2016', 'stage-0', 'react']
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: `css-loader${isProduction ? '?minimize' : ''}`
        })
      },
      {
        test: /\.png$|\.jpg$/,
        loader: 'file-loader'
      }
    ]
  }
};
