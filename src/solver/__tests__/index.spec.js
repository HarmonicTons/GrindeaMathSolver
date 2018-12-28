const solver = require('../index');

describe('Puzzle solver', () => {
  it('should solve basic puzzle', () => {
    const solution = solver(3, [{ value: '+' }], [{ value: 1 }, { value: 2 }]);
    expect(solution).toEqual({
      operators: [{ value: '+' }],
      numbers: [{ value: 1 }, { value: 2 }],
    });
  });

  it('should solve complex puzzle', () => {
    const solution = solver(31, [
      { value: '-' },
      { value: '+' },
      { value: '*' },
    ], [
      { value: 5 },
      { value: 3 },
      { value: 6 },
      { value: 2 },
    ]);
    expect(solution).toEqual({
      operators: [
        { value: '+' },
        { value: '*' },
        { value: '-' },
      ],
      numbers: [
        { value: 5 },
        { value: 6 },
        { value: 3 },
        { value: 2 },
      ],
    });
  });

  it('should throw an error if puzzle is unsolvable', () => {
    expect(() => {
      solver(4, [{ value: '+' }], [{ value: 1 }, { value: 2 }]);
    }).toThrow(/No solution found/);
  });
});
