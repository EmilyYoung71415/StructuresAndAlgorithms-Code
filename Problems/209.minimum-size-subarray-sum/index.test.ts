import { minSubArrayLen } from './index';

describe('209.minimum-size-subarray-sum', () => {
  it('case 1', () => {
    const target = 7,
      nums = [2, 3, 1, 2, 4, 3];
    expect(minSubArrayLen(target, nums)).toEqual(2);
  });
  it('case 2', () => {
    const target = 4,
      nums = [1, 4, 4];
    expect(minSubArrayLen(target, nums)).toEqual(1);
  });
  it('case 3', () => {
    const target = 11,
      nums = [1, 1, 1, 1, 1, 1, 1, 1];
    expect(minSubArrayLen(target, nums)).toEqual(0);
  });
});
