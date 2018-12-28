const md5 = require('md5');

function hashObject(obj) {
  return md5(JSON.stringify(obj));
}

module.exports = hashObject;
