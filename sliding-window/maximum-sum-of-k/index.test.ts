import { maxSum } from './sliding-window';

describe('maxSum', () => {
  it('should return the maximum sum of k consecutive elements in the array', () => {
    const arr = [1, 4, 2, 10, 2, 3, 1, 0, 20];
    const k = 4;
    expect(maxSum(arr, k)).toEqual(24);
  });
});
