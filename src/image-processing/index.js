const imageReader = require('./imageReader');
const findContinuousAreas = require('./findContinuousAreas');
const hash = require('./data/hash');

function process(position) {
  const resultImage = imageReader.getImage(position.x + 300, position.y + 110, 100, 30);
  const operatorsImages = [0, 1, 2, 3, 4].map(v => imageReader.getImage(
    position.x + 236 + 34 * v,
    position.y + 160, 40, 30,
  ));
  const numbersImages = [0, 1, 2, 3, 4, 5].map(v => imageReader.getImage(
    position.x + 220 + 34 * v,
    position.y + 220, 40, 30,
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
