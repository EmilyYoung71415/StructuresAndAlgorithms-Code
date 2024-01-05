import { threeSum } from './index';

describe('15.3Sum', () => {
  it('use case1', () => {
    const nums = [-1, 0, 1, 2, -1, -4];
    // [-4, -1, -1, 0 , 1, 2]
    const result = threeSum(nums);
    expect(result).toEqual([
      [-1, -1, 2],
      [-1, 0, 1],
    ]);
  });

  it('use case2', () => {
    const nums = [0, 1, 1];
    const result = threeSum(nums);
    expect(result).toEqual([]);
  });

  it('use case3', () => {
    const nums = [0, 0, 0];
    const result = threeSum(nums);
    expect(result).toEqual([[0, 0, 0]]);
  });

  // 多个相同的解去重
  it('use case4', () => {
    const nums = [0, 0, 0, 0];
    const result = threeSum(nums);
    // [[0,0,0],[0,0,0]]
    expect(result).toEqual([[0, 0, 0]]);
  });

  // 一个tart, [l, r]可能有多个解
  it('use case5', () => {
    const nums = [-2, 0, 1, 1, 2];
    const result = threeSum(nums);
    expect(result).toEqual([
      [-2, 0, 2],
      [-2, 1, 1],
    ]);
  });
});
