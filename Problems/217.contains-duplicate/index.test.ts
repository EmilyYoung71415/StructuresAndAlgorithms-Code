import { containsDuplicate } from './index';

describe('containsDuplicate', () => {
  test('should return true if the array contains duplicate elements', () => {
    const nums = [1, 2, 3, 1];
    const result = containsDuplicate(nums);
    expect(result).toBe(true);
  });

  test('should return false if the array does not contain duplicate elements', () => {
    const nums = [1, 2, 3, 4];
    const result = containsDuplicate(nums);
    expect(result).toBe(false);
  });

  test('should return true if the array contains duplicate elements', () => {
    const nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2];
    const result = containsDuplicate(nums);
    expect(result).toBe(true);
  });
});
