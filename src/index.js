const robot = require('robotjs');
const Timer = require('tiny-timer');

const Logger = require('./helpers/Logger');
const solver = require('./solver');
const process = require('./image-processing');

/* eslint-disable no-await-in-loop */

async function main() {
  try {
    Logger.info('GRINDEA MATH SOLVER');

    Logger.info('Place the mouse cursor on the top-left corner of the game window.');
    Logger.info('The script will start if the mouse cursor do not move for 2 seconds.');
    Logger.info('Once started, the script will stop if the mouse cursor move.');

    const TIME = 5000;

    let position = robot.getMousePos();
    let timer = new Timer();
    timer.start(TIME);

    while (true) {
      const nextPosition = robot.getMousePos();
      if (position.x !== nextPosition.x && position.y !== nextPosition.y) {
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
    const { result, operators, numbers } = process(position);

    const solution = solver(result, operators, numbers);
    Logger.info(solution);
  } catch (error) {
    Logger.error('The main process crashed with the error:', error);
  }
}

main();
