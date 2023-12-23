import { jump } from './index';

describe('jump', () => {
  test('Example 1', () => {
    const nums = [2, 3, 1, 1, 4];
    const expected = 2;
    const result = jump(nums);
    expect(result).toBe(expected);
  });

  test('Example 2', () => {
    const nums = [2, 3, 0, 1, 4];
    const expected = 2;
    const result = jump(nums);
    expect(result).toBe(expected);
  });
});
