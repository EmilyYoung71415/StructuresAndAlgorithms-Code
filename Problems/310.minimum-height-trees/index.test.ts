import { findMinHeightTrees } from './index';

test('fidMinHeightTrees should work', () => {
  const output = findMinHeightTrees(4, [
    [1, 0],
    [1, 2],
    [1, 3],
  ]);
  expect(output).toStrictEqual([1]);
});

test('fidMinHeightTrees should work2', () => {
  const output = findMinHeightTrees(6, [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 4],
    [5, 4],
  ]);
  expect(output).toStrictEqual([3, 4]);
});
