const robot = require('robotjs');
const Timer = require('tiny-timer');

const wait = require('./helpers/wait');
const Logger = require('./helpers/Logger');
const imageReader = require('./image-processing/imageReader');
const findFish = require('./image-processing/findFish');
const control = require('./control/fishing');

function mouseMoved(p1, p2, tolerance = 2) {
  return Math.sqrt(((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2)) > tolerance;
}

async function main() {
  Logger.info('GRINDEA FISHING HELPER');

  Logger.info('Place the mouse cursor on the top-left corner of the game window.');
  Logger.info('The script will start if the mouse cursor do not move for 2 seconds.');
  Logger.info('Once started, the script will stop if the mouse cursor move.');

  const TIME = 5000;

  let position = robot.getMousePos();
  let timer = new Timer();
  timer.start(TIME);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const nextPosition = robot.getMousePos();
    if (mouseMoved(position, nextPosition)) {
      position = nextPosition;
      timer.stop();
      timer = new Timer();
      timer.start(TIME);
      continue;
    }
    if (timer.time <= 0) {
      timer.stop();
      break;
    }
  }

  Logger.info('START');
  const result = findFish(position);
  Logger.info(result);

  control.startFishing();

  // TODO:

  // wait for "!" to appear

  // press S again

  // press left and right to stay at the center
}

module.exports = main;
