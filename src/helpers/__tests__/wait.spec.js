const wait = require('../wait');

describe('Wait', () => {
  it('should resolve after a moment', () => {
    expect.assertions(1);
    return expect(wait(10)).resolves.toEqual(undefined);
  });

  it('should resolve with a value after a moment', () => {
    expect.assertions(1);
    const result = 'result';
    return expect(wait(10, result)).resolves.toEqual(result);
  });

  it('should reject with an error after a moment', () => {
    expect.assertions(1);
    const error = new Error('err');
    return expect(wait(10, error, true)).rejects.toEqual(error);
  });
});
