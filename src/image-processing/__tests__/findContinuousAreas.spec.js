const findContiunousAreas = require('../findContinuousAreas');

jest.mock('../imageReader');

const raw1 = `
020305
021411
111110
006011
`;

const raw2 = `
..1..
111..
..1..
..1..
11111
`;

const raw3 = `
..........
.4...1..2.
.44111.22.
..4.51.22.
.....1.2..
...11111..
.333..3..4
...3333..4
`;

function getImageFromRaw(raw) {
  return raw.split('\n').slice(1, -1).map(l => l.split(''));
}

describe('Large Continuous Areas finder', () => {
  it('should find an area', () => {
    const img = getImageFromRaw(raw1);
    const continuousAreas = findContiunousAreas(img, 3);
    expect(continuousAreas).toEqual([{
      hash: '7bb635d6072c3cd14d7caed358b63b0a',
      size: 10,
      position: {
        x: 0,
        y: 1,
      },
    }]);
  });

  it('should find patterns in images', () => {
    const img1 = getImageFromRaw(raw2);
    const img2 = getImageFromRaw(raw3);
    const patterns = findContiunousAreas(img1);
    expect(patterns.length).toBe(1);
    const pattern = patterns[0];
    const continuousAreas = findContiunousAreas(img2, 3);
    const patternFound = continuousAreas.find(ca => ca.hash === pattern.hash);
    expect(patternFound).toBeDefined();
    expect(patternFound.position).toEqual({
      x: 3,
      y: 1,
    });
  });
});
