/**
 * Get all permutations of an array
 * @param {Array} arr array to permute
 * @returns {Array[]} permutations
 */
function permute(arr) {
  if (arr.length === 1) {
    return [[...arr]];
  }

  return arr.reduce((permutations, elem, i) => {
    const subArr = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const subPerm = permute(subArr).map(a => [elem].concat(a));
    return permutations.concat(subPerm);
  }, []);
}

module.exports = permute;
