import { search } from './index';

test('search-in-rotated-sorted-arr should work', () => {
  const nums = [4, 5, 6, 7, 0, 1, 2],
    target = 0;
  const output = search(nums, target);
  expect(output).toBe(4);
});

test('search-in-rotated-sorted-arr should work2', () => {
  const nums = [4, 5, 6, 7, 0, 1, 2],
    target = 3;
  expect(search(nums, target)).toBe(-1);
});

test('search-in-rotated-sorted-arr should work3', () => {
  const nums = [1],
    target = 0;
  expect(search(nums, target)).toBe(-1);
});

test('search-in-rotated-sorted-arr should work3', () => {
  const nums = [1, 3],
    target = 3;
  const output = search(nums, target);
  expect(output).toBe(1);
});

test('search-in-rotated-sorted-arr should work3', () => {
  const nums = [1, 3, 5],
    target = 3;
  const output = search(nums, target);
  expect(output).toBe(1);
});

test('search-in-rotated-sorted-arr should work3', () => {
  const nums = [5, 1, 3],
    target = 3;
  const output = search(nums, target);
  expect(output).toBe(2);
});
