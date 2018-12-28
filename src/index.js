const robot = require('robotjs');
const Timer = require('tiny-timer');

const Logger = require('./helpers/Logger');
const solver = require('./solver');
const process = require('./image-processing');
const control = require('./control');

/* eslint-disable no-await-in-loop */

function mouseMoved(p1, p2, tolerance = 2) {
  return Math.sqrt(((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2)) > tolerance;
}

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
    while (!mouseMoved(position, robot.getMousePos())) {
      const { result, operators: rawOperators, numbers: rawNumbers } = process(position);

      const operators = rawOperators.map(o => ({ value: o }));
      const numbers = rawNumbers.map(o => ({ value: o }));

      const solution = solver(result, operators, numbers);
      Logger.info(solution.numbers, solution.operators);

      Logger.debug('Going to starting position.');
      await control.goToStartPosition();
      for (let i = 0; i < operators.length; i++) {
        const iNumber = numbers.findIndex(n => n === solution.numbers[i]);
        Logger.debug(`Number: ${solution.numbers[i].value}, position: ${iNumber}`);
        await control.goToNumber(iNumber);
        const iOperator = operators.findIndex(o => o === solution.operators[i]);
        Logger.debug(`Operator: ${solution.operators[i].value}, position: ${iOperator}`);
        await control.goToOperator(iOperator);
      }
      const iNumber = numbers.findIndex(n => n === solution.numbers[operators.length]);
      Logger.debug(`Number: ${solution.numbers[operators.length].value}, position: ${iNumber}`);
      await control.goToNumber(iNumber);
      Logger.debug('Leaving room.');
      await control.leaveRoom();
    }
    Logger.info('END');
  } catch (error) {
    Logger.error('The main process crashed with the error:', error);
  }
}

main();
