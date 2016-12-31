module.exports = process.env.NODE_ENV === 'production' ?
  require('./Tools.prod') :
  require('./Tools.dev');
