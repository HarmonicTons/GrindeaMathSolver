const _ = require('lodash');

const imageReader = require('./imageReader');

/* eslint-disable no-restricted-syntax */

const xy = ({ x, y }) => `${x},${y}`;

const coor = (str) => {
  const [x, y] = str.split(',').map(v => +v);
  return { x, y };
};

/**
 * Find an image in a screen portion
 * @param {Object} image image
 * @param {Object} imageToFind image to find
 * @return {Object} coordinates of the image found or undfined
 */
function findImage(image, imageToFind) {
  const width = imageReader.getWidth(image);
  const height = imageReader.getHeight(image);
  const coordinates = _.orderBy(Object.keys(imageToFind).map(c => coor(c)), ['y', 'x'], ['asc', 'asc']);
  const c0 = coordinates[0];

  for (let x = 0; x < width; x++) {
    loopY: for (let y = 0; y < height; y++) {
      // match first point
      const point0 = imageReader.getPoint(image, x, y);
      if (point0 !== imageToFind[xy(c0)]) {
        continue;
      }
      // match every subsequent points
      for (const c of coordinates) {
        const pointN = imageReader.getPoint(image, x + c.x - c0.x, y + c.y - c0.y);
        if (pointN !== imageToFind[xy(c)]) {
          continue loopY;
        }
      }
      // corresponding image found
      return { x, y };
    }
  }

  // no match
  return undefined;
}

module.exports = findImage;
