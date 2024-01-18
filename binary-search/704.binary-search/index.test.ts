import { binarySearch } from './index';

test.only('searchInsert should work', () => {
  expect(binarySearch([-1, 0, 3, 5, 9, 12], 9)).toBe(4);
  expect(binarySearch([1, 3, 5, 6], 4)).toBe(-1);
  expect(binarySearch([1, 3, 5, 6, 8], 3)).toBe(1);
});
