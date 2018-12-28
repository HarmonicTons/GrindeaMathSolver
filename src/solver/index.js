const permute = require('../helpers/permute');
const Logger = require('../helpers/Logger');

/**
 * Find the solution of a Grindea Math Puzzle
 * @param {number} result expected result
 * @param {string[]} operators list of the given operators ('*', '-', '+')
 * @param {number[]} numbers list of the given numbers
 * @returns {string} the solution
 */
function solvePuzzle(result, operators, numbers) {
  Logger.debug(`Solving puzzle: ${result}, [${operators.join(', ')}], [${numbers.join(', ')}]...`);
  const opPerms = permute(operators);
  const numPerms = permute(numbers);

  let n = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const opPerm of opPerms) {
    // eslint-disable-next-line no-restricted-syntax
    for (const numPerm of numPerms) {
      n++;
      const mathString = numPerm.reduce((str, num, i) => `(${str} ${num}) ${opPerm[i] ? opPerm[i] : ''}`, '');
      // eslint-disable-next-line no-eval
      if (eval(mathString) === result) {
        Logger.info(`Found solution in ${n} iterations: ${mathString} = ${result}.`);
        return {
          operations: opPerm,
          numbers: numPerm,
        };
      }
    }
  }
  throw new Error(`No solution found for the puzzle: ${result}, [${operators.join(', ')}], [${numbers.join(', ')}].`);
}

module.exports = solvePuzzle;
