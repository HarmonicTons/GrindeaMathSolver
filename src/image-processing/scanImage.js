const imageReader = require('./imageReader');

const xy = ({ x, y }) => `${x},${y}`;

function main(position, width, height) {
  const image = imageReader.getImage(position.x, position.y, width, height);

  const result = {};

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      result[xy({ x, y })] = imageReader.getPoint(image, x, y);
    }
  }
  return result;
}

module.exports = main;
