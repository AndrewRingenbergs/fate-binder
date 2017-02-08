const path = require('path');
const chalk = require('chalk');

const merge = require('webpack-merge');

const pkg = require('./package.json');
const parts = require('./webpack/webpack.parts');

const cssLibraries = [
  'purecss',
  path.join('font-awesome', 'css','font-awesome.min.css')
];

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  styles: cssLibraries.map(l => path.join(__dirname, 'node_modules', l)),
  globalStyles: path.join(__dirname, 'app', 'main.scss')
}

console.log(PATHS)

const COMMON = merge(
  {
    entry: {
      app: [PATHS.globalStyles, PATHS.app],
    },
    output: {
      filename: '[name].js',
      path: PATHS.build
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    }
  },
  parts.fileLoader(),
  parts.setupBabel(PATHS.app));

module.exports = function(env) {
  var nodeEnv = parts.setFreeVariable('process.env.NODE_ENV', env);
  process.env.BABEL_ENV = env;


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

      return merge({ entry: { app: PATHS.styles } },
        COMMON,
        base,
        parts.clean(PATHS.build),
        nodeEnv,
        parts.extractBundle({
          name: 'vendor',
          entries: Object.keys(pkg.dependencies).filter(p => base.resolve.alias[p] == undefined && p !== 'font-awesome' )
        }),
        parts.minify(),
        parts.eslint(PATHS.app),
        parts.extractCSSModules(PATHS.app),
        parts.extractCSS(PATHS.styles),
        parts.htmlTemplate({title: 'Roll for Initiative'})
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
        parts.eslint(PATHS.app),
        parts.htmlTemplate({
          title: 'Roll for Initiative - Dev Server',
          devServer: 'http://localhost:3000'
        }),
        parts.inlineCSSModules(PATHS.app),
        parts.extractCSS(PATHS.styles),
        parts.devServer({port: 3000})
      );
  }
}
