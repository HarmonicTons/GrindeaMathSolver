const robot = require('robotjs');

async function startFishing() {
  robot.keyTap('s');
}

module.exports = {
  startFishing,
};
