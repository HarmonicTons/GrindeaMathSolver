const imageReader = require('./imageReader');
const findContinuousAreas = require('./findContinuousAreas');
const hash = require('./data/hash');


function process(position) {
  const resultImage = imageReader.getImage(position.x + 324, position.y + 115, 64, 22);
  const operatorsImages = [0, 1, 2, 3].map(v => imageReader.getImage(
    position.x + 254 + 34 * v,
    position.y + 162, 34, 22,
  ));
  const numbersImages = [0, 1, 2, 3, 4].map(v => imageReader.getImage(
    position.x + 237 + 34 * v,
    position.y + 224, 34, 22,
  ));

  const resultCAs = findContinuousAreas(resultImage);
  const operatorsCAs = operatorsImages.map(img => findContinuousAreas(img));
  const numbersCAs = numbersImages.map(img => findContinuousAreas(img));

  resultCAs.sort((a, b) => a.position.x - b.position.x);

  const result = Number(resultCAs.map(ca => hash[ca.hash]).filter(v => v).join(''));
  const operators = operatorsCAs.map(operatorCAs => operatorCAs.reduce((operator, ca) => operator
  || hash[ca.hash], undefined));
  const numbers = numbersCAs.map(numberCAs => +numberCAs.reduce((number, ca) => number
  || hash[ca.hash], undefined));

  return {
    result,
    operators,
    numbers,
  };
}

module.exports = process;
