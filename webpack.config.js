const path = require('path');
const chalk = require('chalk');

const merge = require('webpack-merge');

const pkg = require('./package.json');
const parts = require('./webpack/webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  styles: [
    path.join(__dirname, 'app', 'main.css')
  ]
}

const COMMON = merge(
  {
    entry: {
      app: PATHS.app,
        styles: PATHS.styles,
    },
    output: {
      filename: '[name].js',
      path: PATHS.build
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  },
  parts.setupBabel(PATHS.app));

module.exports = function(env) {
  console.log(`Building in Environment ${chalk.underline.yellow(env)}`);

  switch(env) {
    case 'production':
      return merge(COMMON,
        parts.clean(PATHS.build),
        {
          devtool: 'source-map',
          output: {
            filename: '[name].[chunkhash:8].js',
            chunkFilename: '[chunkhash].js',
            publicPath: ''
          }
        },
        parts.extractBundle({
          name: 'vendor',
          entries: Object.keys(pkg.dependencies)
        }),
        parts.extractCSS(),
        parts.minify(),
        parts.eslint(PATHS.app),
        parts.purifyCSS([PATHS.app]),
        parts.htmlTemplate({title: 'Roll for Initiative'})
      );
    case 'dev':
      return merge(COMMON,
        {
          entry: {vendor: Object.keys(pkg.dependencies)},
          devtool: 'eval-source-map',
          performance: {
            hints: false
          }
        },
        parts.progress(),
        parts.eslint(PATHS.app),
        parts.htmlTemplate({
          title: 'Roll for Initiative - Dev Server',
          devServer: 'http://localhost:3000'
        }),
        parts.setupCSS(),
        parts.devServer({port: 3000})
      );
  }
}
