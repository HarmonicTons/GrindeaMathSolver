const robot = require('robotjs');

function getImage(x, y, width, height) {
  return robot.screen.capture(x, y, width, height);
}

function getWidth(img) {
  return img.width;
}

function getHeight(img) {
  return img.height;
}

function getPoint(img, x, y) {
  if (x < 0 || y < 0 || x >= getWidth(img) || y >= getHeight(img)) {
    return undefined;
  }
  return img.colorAt(x, y);
}

module.exports = {
  getImage,
  getPoint,
  getWidth,
  getHeight,
};
