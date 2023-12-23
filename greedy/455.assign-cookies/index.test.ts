import { findContentChildren, findContentChildren2 } from './index';

describe('findContentChildren', () => {
  it('returns the maximum number of content children', () => {
    expect(findContentChildren([1, 2, 3], [1, 1])).toBe(1);

    expect(findContentChildren([1, 2], [1, 2, 3])).toBe(2);

    expect(findContentChildren([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toBe(5);

    expect(findContentChildren([1, 2, 3], [3])).toBe(1);
  });
});

describe('findContentChildren loop chid first', () => {
  it('returns the maximum number of content children', () => {
    expect(findContentChildren2([1, 2, 3], [1, 1])).toBe(1);

    expect(findContentChildren2([1, 2], [1, 2, 3])).toBe(2);

    expect(findContentChildren2([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toBe(5);

    expect(findContentChildren2([1, 2, 3], [3])).toBe(1);
  });
});
