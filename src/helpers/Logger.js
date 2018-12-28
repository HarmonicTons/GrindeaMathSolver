const Logger = require('js-logger');
const { logLevel } = require('../../conf');

const LOGLEVEL = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

Logger.useDefaults();

switch (logLevel) {
  case LOGLEVEL.DEBUG:
    Logger.setLevel(Logger.DEBUG);
    break;
  case LOGLEVEL.INFO:
    Logger.setLevel(Logger.INFO);
    break;
  case LOGLEVEL.WARN:
    Logger.setLevel(Logger.WARN);
    break;
  case LOGLEVEL.ERROR:
    Logger.setLevel(Logger.ERROR);
    break;
  default:
    Logger.setLevel(Logger.INFO);
    break;
}

module.exports = Logger;
