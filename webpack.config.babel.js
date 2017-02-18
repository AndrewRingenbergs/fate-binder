const path = require('path');
const chalk = require('chalk');

const merge = require('webpack-merge');

const pkg = require('./package.json');
const parts = require('./webpack/webpack.parts');

const webpack = require('webpack');

const cssLibraries = [
  path.join('font-awesome', 'css','font-awesome.min.css'),
];

const reactToolboxTheme = path.join(__dirname, 'react-toolbox-theme', 'theme.css');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  toolboxTheme: reactToolboxTheme,
  styles: cssLibraries.map(l => path.join(__dirname, 'node_modules', l)),
  globalStyles: path.join(__dirname, 'app', 'styles', 'index.scss'),
}

// console.log(PATHS)

const COMMON = merge(
  {
    entry: {
      app: [PATHS.app, PATHS.globalStyles],
      toolbox: reactToolboxTheme,
    },
    output: {
      filename: '[name].js',
      path: PATHS.build
    },
    resolve: {
      //mainFields: ['jsnext:main', 'browser', 'main'],
      extensions: ['.js', '.jsx'],
      alias: {
        'react-redux-firebase': path.join(__dirname, 'node_modules', 'react-redux-firebase', 'dist', 'index.js')
      }
    }
  },
  //parts.fileLoader(),
  parts.setupFonts(),
  parts.setupBabel(PATHS.app));

function config(env) {
  var nodeEnv = parts.setFreeVariable('process.env.NODE_ENV', env);
  process.env.BABEL_ENV = env;
  const reactToolbox = path.join(__dirname, 'node_modules', 'react-toolbox');
  var neatSassPaths = require('node-neat').includePaths;

  switch(env) {
    case 'production':
      var base = {
        resolve: {
          alias: {
            'react': 'react-lite',
              'react-dom': 'react-lite',
          }
        },
        devtool: 'source-map',
        output: {
          filename: '[name].[chunkhash:8].js',
          chunkFilename: '[chunkhash].js',
          publicPath: ''
        }
      }
      const libs = Object.keys(pkg.dependencies)
        .filter(p => base.resolve.alias[p] == undefined && p !== 'font-awesome' );


      return merge({ entry: { app: PATHS.styles } },
        COMMON,
        base,
        parts.clean(PATHS.build),
        nodeEnv,
        parts.extractVendor('vendor'),
        parts.minify(),
        parts.eslint(PATHS.app),
        parts.extractCSS([ ...PATHS.styles, neatSassPaths, PATHS.toolboxTheme]),
        parts.extractCSSModules([PATHS.app, reactToolbox]),
        parts.htmlTemplate({title: 'Roll for Initiative'}),
      );
    case 'dev':
      return merge({ entry: { app: PATHS.styles } },
        COMMON,
        {
          devtool: 'eval-source-map',
          performance: {
            hints: false
          }
        },
        nodeEnv,
        parts.progress(),
        parts.extractVendor('vendor'),
        parts.eslint(PATHS.app),
        parts.inlineCSSModules(PATHS.app),
        parts.extractCSSModules([reactToolbox]),
        parts.extractCSS([ ...PATHS.styles, PATHS.toolboxTheme, neatSassPaths]),
        parts.htmlTemplate({
          title: 'Roll for Initiative - Dev Server',
          devServer: 'http://localhost:3000'
        }),
        parts.devServer({port: 3000})
      );
  }
}


module.exports = config
