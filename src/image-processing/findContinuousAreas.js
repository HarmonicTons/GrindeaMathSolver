const _ = require('lodash');
const { getPoint, getWidth, getHeight } = require('./imageReader');
const hashObject = require('../helpers/hashObject');

const xy = (x, y) => `${x},${y}`;

const coor = (str) => {
  const [x, y] = str.split(',').map(v => +v);
  return { x, y };
};

/**
 * Recursively find every point making the current continuous area
 * @param {Object} img
 * @param {number} x current position X
 * @param {number} y current position X
 * @param {Object} [prevData] current data
 * @returns {Object} data of the continuous area
 */
function findData(img, x, y, prevData = {}) {
  let data = prevData;

  if (data[xy(x, y)]) {
    return data;
  }

  data[xy(x, y)] = true;

  const point = getPoint(img, x, y);
  if (point === getPoint(img, x, y - 1)) {
    data = findData(img, x, y - 1, data);
  }
  if (point === getPoint(img, x + 1, y)) {
    data = findData(img, x + 1, y, data);
  }
  if (point === getPoint(img, x, y + 1)) {
    data = findData(img, x, y + 1, data);
  }
  if (point === getPoint(img, x - 1, y)) {
    data = findData(img, x - 1, y, data);
  }

  return data;
}

/**
 * Find the continuous area begining at position x,y
 * @param {Object} img
 * @param {number} x
 * @param {number} y
 * @returns {Object} continuous area
 */
function findContinuousArea(img, x, y) {
  const data = findData(img, x, y);
  const coordinates = Object.keys(data).map(coor);

  // translate data to top-left point
  const xMin = _.min(coordinates.map(c => c.x));
  const yMin = _.min(coordinates.map(c => c.y));

  const translatedData = coordinates.reduce((_translatedData, coordinate) => {
    Object.assign(_translatedData, {
      [xy(coordinate.x - xMin, coordinate.y - yMin)]: true,
    });
    return _translatedData;
  }, {});

  const continuousArea = {
    size: coordinates.length,
    data: translatedData,
    position: {
      x: xMin,
      y: yMin,
    },
  };

  return continuousArea;
}

/**
 * Find every continuous areas in an image
 * @param {Object} img
 * @param {number} [minSize=10] minimum size for a CA to be kept
 * @returns {Object[]} list of continuous area with a size above minSize
 */
function findContinuousAreas(img, minSize = 10) {
  const width = getWidth(img);
  const height = getHeight(img);

  const continuousAreas = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (continuousAreas.find(ca => ca.data[xy(x - ca.position.x, y - ca.position.y)])) {
        continue;
      }
      const continuousArea = findContinuousArea(img, x, y);
      continuousAreas.push(continuousArea);
    }
  }

  // keep only areas big enough
  return continuousAreas
    .filter(ca => ca.size >= minSize)
    .map(ca => ({
      size: ca.size,
      position: ca.position,
      // transform data object into an hash for memory perf and easy comparaison
      hash: hashObject(ca.data),
    }));
}

module.exports = findContinuousAreas;
