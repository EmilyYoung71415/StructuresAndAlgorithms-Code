import { binarySearch as binarySearch_dfs } from './dfs';
import { binarySearch as binarySearch_iterator } from './iterator';

test('searchInsert dfs should work', () => {
  expect(binarySearch_dfs([-1, 0, 3, 5, 9, 12], 9)).toBe(4);
  expect(binarySearch_dfs([1, 3, 5, 6], 4)).toBe(-1);
  expect(binarySearch_dfs([1, 3, 5, 6, 8], 3)).toBe(1);
});

test('binarySearch_iterator should work', () => {
  expect(binarySearch_iterator([-1, 0, 3, 5, 9, 12], 9)).toBe(4);
  expect(binarySearch_iterator([1, 3, 5, 6], 4)).toBe(-1);
  expect(binarySearch_iterator([1, 3, 5, 6, 8], 3)).toBe(1);
});
