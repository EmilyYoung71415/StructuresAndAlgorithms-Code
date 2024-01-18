import { maxSlidingWindow } from './index';

describe('239.sliding-window-maximum', () => {
  it('case 1', () => {
    expect(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([3, 3, 5, 5, 6, 7]);
  });

  it('case 2', () => {
    expect(maxSlidingWindow([1], 1)).toEqual([1]);
  });
});
