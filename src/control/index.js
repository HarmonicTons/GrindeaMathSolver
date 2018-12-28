const robot = require('robotjs');
const wait = require('../helpers/wait');

const AFTER_MOVEMENT = 500;

robot.setKeyboardDelay(50);

async function move(direction, duration) {
  robot.keyToggle(direction, 'down');
  await wait(duration);
  robot.keyToggle(direction, 'up');
  await wait(AFTER_MOVEMENT);
}

async function goToStartPosition() {
  await move('right', 200);
  await move('up', 450);
  await move('right', 800);
  await move('up', 460);
  await move('left', 975);
}

async function goToOperator(n) {
  if (n < 2) {
    await move('left', n === 0 ? 500 : 250);
  } else if (n > 2) {
    await move('right', n === 4 ? 500 : 250);
  }
  await move('up', 250);
  await move('down', 250);
  if (n < 2) {
    await move('right', n === 0 ? 490 : 250);
  } else if (n > 2) {
    await move('left', n === 4 ? 490 : 250);
  }
}

async function goToNumber(n) {
  if (n <= 2) {
    await move('left', n === 0 ? 600 : n === 1 ? 350 : 100);
  } else if (n >= 3) {
    await move('right', n === 5 ? 600 : n === 4 ? 350 : 100);
  }
  await move('down', 250);
  await move('up', 250);
  if (n <= 2) {
    await move('right', n === 0 ? 600 : n === 1 ? 350 : 100);
  } else if (n >= 3) {
    await move('left', n === 5 ? 600 : n === 4 ? 350 : 100);
  }
}

async function leaveRoom() {
  await move('up', 1000);
}

module.exports = {
  goToStartPosition,
  goToNumber,
  goToOperator,
  leaveRoom,
};
