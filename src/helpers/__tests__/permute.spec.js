const permute = require('../permute');

describe('Permuter', () => {
  it('should find permutations', () => {
    const permutations = permute([1, 2, 3]);
    expect(permutations).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ]);
  });
});
