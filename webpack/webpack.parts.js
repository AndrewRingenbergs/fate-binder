const webpack = require('webpack');
const chalk = require('chalk');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');

const _ = require('lodash');

// -------------- building ---------------
exports.htmlTemplate = function(options) {
  let pluginOptions = {
    title: options.title || 'New App',
    template: HtmlWebpackTemplate,
    inject: false,
    appMountId: 'root',
  };

  if(options.devServer) {
    pluginOptions.devServer = options.devServer
  }

  return {
    plugins: [
      new HTMLWebpackPlugin(pluginOptions)
    ]
  }
}

exports.setupBabel = function(paths) {
  return {
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: paths,
      }]
    }
  }
}

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;

  console.log(chalk.underline(`Packageing in ${chalk.cyan(options.name)}`));
  console.log(_.chain(options.entries)
    .map(e => `  - ${e}`)
    .join('\n')
    .value()
  );

  return {
    entry: entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest'],
      })
    ]
  };
}

exports.extractCSS = function(paths) {
  return {
    module: {
      rules: [{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader',
        }),
        include: paths
      }]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash:8].css')
    ]
  };
}

cssLoaderQuery = {
  module: true,
  camelCase: true,
  localIdentName: '[path][name]__[local]--[hash:base64:5]'
}

exports.extractCSSModules = function(paths) {
  return {
    module: {
      rules: [{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader',
          query: cssLoaderQuery
        }),
        include: paths
      }]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash:8].css')
    ]
  };
}

exports.inlineCSSModules = function(path) {
  return {
    module: {
      rules: [{
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', query: cssLoaderQuery }
        ],
        include: path
      }]
    }
  };
}
//-------------- production ---------------
exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
          warnings: false,
          drop_console: false
        },
        mangle: true
      })
    ]
  };
}

exports.setFreeVariable = function(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: process.cwd()
      })
    ]
  };
}

// --------------- tools ---------------
exports.eslint = function(path) {
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'eslint-loader',
          enforce: 'pre',
          include: path
        }
      ]
    }
  }
}


// -------------- dev tools ---------------
exports.devServer = function(options) {
  return {
    devServer: {
      historyApiFallback: true,
        stats: 'minimal',
        hot: true,
        inline: true,
        host: options.host || '0.0.0.0',
        port: options.port || 3000
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({})
    ]
  }
}

exports.progress = function() {
  return {
    plugins: [
      new NyanProgressPlugin()
    ]
  }
}

