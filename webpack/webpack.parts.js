const webpack = require('webpack');
const chalk = require('chalk');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const cssnext = require("postcss-cssnext")

const _ = require('lodash');

// -------------- building ---------------
exports.htmlTemplate = function(options) {
  let pluginOptions = {
    title: options.title || 'New App',
    template: HtmlWebpackTemplate,
    inject: false,
    appMountId: 'root',
    links: [
      "https://fonts.googleapis.com/icon?family=Material+Icons",
    ],
    meta: [
      {name: "viewport" ,
        content: "width=device-width, initial-scale=1"}
    ],
    chunksSortMode: function (a, b) {  //reverse alphabetical order
      if (a.names[0] > b.names[0]) {
        return -1;
      }
      if (a.names[0] < b.names[0]) {
        return 1;
      }
      return 0;
    }
  };

  if(options.manifest) {
    pluginOptions.links.push({
      rel: 'manifest',
      href: '/manifest.json',
    })
  }

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

exports.setupFonts = function() {
  const name = "[name].[hash:8].[ext]";
  const limit = 65000;

  const query = { name, limit };
  return {
    module: {
      rules: [{
        test: /\.svg$/,
        loader: [{ loader: 'url-loader', query: {
          ... query,
          mimetype: 'image/svg+xml'
        }}]
      }, {
        test: /\.[ot]tf$/,
        loader: [{ loader: 'url-loader', query: {
          ... query,
          mimetype: 'application/octet-stream'
        }}]
      }, {
        test: /\.woff$/,
        loader: [{ loader: 'url-loader', query: {
          ... query,
          mimetype: 'application/font-woff'
        }}]
      }, {
        test: /\.woff2$/,
        loader: [{ loader: 'url-loader', query: {
          ... query,
          mimetype: 'application/font-woff2'
        }}]
      }, {
        test: /\.eot$/,
        loader: [{ loader: 'url-loader', query: {
          ... query,
          mimetype: 'application/vnd.ms-fontobject'
        }}]
      }]
    }
  }
}

exports.extractVendor = function(name) {
  return {
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          function check(module) {
            return module.context &&
              module.context.indexOf('node_modules') !== -1;
          }
          return check(module);
        }
      })
    ]
  }
}

const cssLoaderQuery = {
  module: true,
  camelCase: true,
  importLoaders: 1,
  localIdentName: '[path][name]__[local]--[hash:base64:5]'
}

const extractCssPlugin = new ExtractTextPlugin('[name].[chunkhash:8].css')

exports.extractCSS = function(paths) {
  return {
    module: {
      rules: [{
        test: /\.(css|scss|sass)$/,
        loader: extractCssPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {loader: 'css-loader'},
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [
                    cssnext(),
                  ]
                }
              }
            },
          ]
        }),
        include: paths
      }]
    },
    plugins: [
      extractCssPlugin
    ]
  }
}


exports.extractCSSModules = function(paths) {
  return {
    module: {
      rules: [{
        test: /\.(css|scss|sass)$/,
        loader: extractCssPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {loader: 'css-loader', query: cssLoaderQuery},
            {loader: 'sass-loader'},
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [
                    cssnext(),
                  ]
                }
              }
            },
          ]
        }),
        include: paths
      }]
    },
    plugins: [
      extractCssPlugin
    ]
  };
}

exports.inlineCSSModules = function(path) {
  return {
    module: {
      rules: [{
        test: /\.(css|scss|sass)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', query: cssLoaderQuery },
          { loader: 'sass-loader' }
        ],
        include: path
      }]
    }
  };
}

exports.extractManifest = function(path) { 
  const extractManifest = new ExtractTextPlugin('[name].json');
  return {
    module: {
      rules: [{
        test: /(manifest\.json)$/,
        include: path,
        loader: extractManifest.extract(['raw-loader']),
      }]
    },
    plugins: [
      extractManifest
    ]
  };
}

exports.fileLoader = function() {
  return {
    module: {
      rules: [{
        test: /\.(jpg|png)$/,
        use: [
          { loader: "file-loader" },
          // { loader: "url-loader", query: { limit:15000 } }
        ]}
      ]
    }
  }
}
//-------------- production ---------------
exports.minify = function() {
  return {
    plugins: [
      new LodashModuleReplacementPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin,
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
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

exports.analyse = function() {
  return {
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  }
}

