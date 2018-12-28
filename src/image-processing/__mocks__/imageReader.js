function getHeight(img) {
  return img.length;
}

function getWidth(img) {
  return img[0].length;
}

function getPoint(img, x, y) {
  if (x < 0 || y < 0 || x >= getWidth(img) || y >= getHeight(img)) {
    return undefined;
  }
  return img[y][x];
}

module.exports = {
  getPoint,
  getWidth,
  getHeight,
};
