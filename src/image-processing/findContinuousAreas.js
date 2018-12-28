const _ = require('lodash');
const { getPoint, getWidth, getHeight } = require('./imageReader');
const hashObject = require('../helpers/hashObject');

const MAX_LOOP_SIZE = 500000;

const xy = (x, y) => `${x},${y}`;

const coor = (str) => {
  const [x, y] = str.split(',').map(v => +v);
  return { x, y };
};

/**
 * Find every point making the current continuous area
 * @param {Object} img
 * @param {number} x0
 * @param {number} y0
 * @param {Object} [prevData] current data
 * @returns {Object} data of the continuous area
 */
function findData(img, x0, y0) {
  const value = getPoint(img, x0, y0);
  let current = {
    from: undefined,
    neighboors: [false, false, false, false],
    position: {
      x: x0,
      y: y0,
    },
  };
  const data = {
    [xy(x0, y0)]: current,
  };

  let i = 0;
  while (current) {
    i++;
    if (i >= MAX_LOOP_SIZE) {
      throw new Error(`Max loop size exceeded (${MAX_LOOP_SIZE}).`);
    }
    const { x, y } = current.position;
    // ABOVE
    if (!current.neighboors[0]) {
      current.neighboors[0] = true;
      // check neighboor value
      if (!data[xy(x, y - 1)] && getPoint(img, x, y - 1) === value) {
        const next = {
          from: current,
          neighboors: [false, false, true, false],
          position: {
            x,
            y: y - 1,
          },
        };
        data[xy(x, y - 1)] = next;
        current = next;
        continue;
      }
    }
    // RIGHT
    if (!current.neighboors[1]) {
      current.neighboors[1] = true;
      // check neighboor value
      if (!data[xy(x + 1, y)] && getPoint(img, x + 1, y) === value) {
        const next = {
          from: current,
          neighboors: [false, false, false, true],
          position: {
            x: x + 1,
            y,
          },
        };
        data[xy(x + 1, y)] = next;
        current = next;
        continue;
      }
    }
    // UNDER
    if (!current.neighboors[2]) {
      current.neighboors[2] = true;
      // check neighboor value
      if (!data[xy(x, y + 1)] && getPoint(img, x, y + 1) === value) {
        const next = {
          from: current,
          neighboors: [true, false, false, false],
          position: {
            x,
            y: y + 1,
          },
        };
        data[xy(x, y + 1)] = next;
        current = next;
        continue;
      }
    }
    // LEFT
    if (!current.neighboors[3]) {
      current.neighboors[3] = true;
      // check neighboor value
      if (!data[xy(x - 1, y)] && getPoint(img, x - 1, y) === value) {
        const next = {
          from: current,
          neighboors: [false, true, false, false],
          position: {
            x: x - 1,
            y,
          },
        };
        data[xy(x - 1, y)] = next;
        current = next;
        continue;
      }
    }

    // go back one rank if every neighboors is done
    current = current.from;
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
 * @param {number} [minSize=15] minimum size for a CA to be kept
 * @param {number} [minSize=500] maximum size for a CA to be kept
 * @returns {Object[]} list of continuous area with a size above minSize
 */
function findContinuousAreas(img, minSize = 15, maxSize = 500) {
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
    .filter(ca => ca.size >= minSize && ca.size <= maxSize)
    .map(ca => ({
      size: ca.size,
      position: ca.position,
      // transform data object into a hash for memory perf and easy comparaison
      hash: hashObject(ca.data),
    }));
}

module.exports = findContinuousAreas;
