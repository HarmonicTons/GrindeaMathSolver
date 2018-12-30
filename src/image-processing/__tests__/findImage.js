const findImage = require('../findImage');

jest.mock('../imageReader');

const raw1 = `
......
..0...
.01..0
....02
`;

const img1 = {
  '1,0': '0',
  '0,1': '0',
  '1,1': '2',
};

const img2 = {
  '1,0': '9',
  '0,1': '0',
  '1,1': '2',
};

function getImageFromRaw(raw) {
  return raw.split('\n').slice(1, -1).map(l => l.split(''));
}

describe('Image finder', () => {
  it('should find an image', () => {
    const img = getImageFromRaw(raw1);
    const position = findImage(img, img1);
    expect(position).toEqual({
      x: 5,
      y: 2,
    });
  });

  it('should return undefined if the image cannot be found', () => {
    const img = getImageFromRaw(raw1);
    const position = findImage(img, img2);
    expect(position).toBeUndefined();
  });
});
