const findImage = require('./findImage');
const fish = require('./data/fish');
const imageReader = require('./imageReader');

function main(position) {
  const image = imageReader.getImage(position.x, position.y, 640, 360);
  return findImage(image, fish);
}

module.exports = main;
