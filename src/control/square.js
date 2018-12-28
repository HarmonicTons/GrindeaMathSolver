const robot = require('robotjs');
const Logger = require('../helpers/Logger');

/* eslint-disable no-await-in-loop */

async function wait(time) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}

async function main() {
  Logger.info('START');

  const START_POSITION = {
    x: 200,
    y: 200,
  };

  // Speed up the mouse.
  robot.setMouseDelay(2);
  robot.setKeyboardDelay(50);

  robot.moveMouse(START_POSITION.x, START_POSITION.y);
  robot.mouseClick();

  for (let i = 0; i < 20; i++) {
    const { x, y } = robot.getMousePos();
    if (x !== START_POSITION.x || y !== START_POSITION.y) {
      Logger.info('Mouse moved, stop script.');
      break;
    }
    Logger.debug(i);

    robot.keyToggle('up', 'down');
    await wait(500);
    robot.keyToggle('up', 'up');
    await wait(500);
    robot.keyToggle('left', 'down');
    await wait(500);
    robot.keyToggle('left', 'up');
    await wait(500);
    robot.keyToggle('down', 'down');
    await wait(500);
    robot.keyToggle('down', 'up');
    await wait(500);
    robot.keyToggle('right', 'down');
    await wait(500);
    robot.keyToggle('right', 'up');
    await wait(500);
  }

  Logger.info('END');
}

main();
