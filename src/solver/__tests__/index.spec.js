const solver = require('../index');

describe('Puzzle solver', () => {
  it('should solve basic puzzle', () => {
    const solution = solver(3, ['+'], [1, 2]);
    expect(solution).toEqual({
      operations: ['+'],
      numbers: [1, 2],
    });
  });

  it('should solve complex puzzle', () => {
    const solution = solver(31, ['-', '+', '*'], [5, 3, 6, 2]);
    expect(solution).toEqual({
      operations: ['+', '*', '-'],
      numbers: [5, 6, 3, 2],
    });
  });

  it('should throw an error if puzzle is unsolvable', () => {
    expect(() => {
      solver(4, ['+'], [1, 2]);
    }).toThrow(/No solution found/);
  });
});
