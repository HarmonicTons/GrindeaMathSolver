const Logger = require('./helpers/Logger');
const solver = require('./solver');

Logger.info('GRINDEA MATH SOLVER');

const solution = solver(2, ['+', '-'], [3, 1, 2]);

Logger.info(solution);
