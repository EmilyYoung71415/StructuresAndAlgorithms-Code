import { binarySearch as binarySearch_for } from './preorder-for';
import { binarySearch as binarySearch_bfs } from './preorder-bfs';
import { binarySearch as binarySearch_dfs } from './preorder-dfs';
import { binarySearch as binarySearch_post_dfs } from './postorder-dfs';
import { binarySearch_left, binarySearch_right } from './bounder-left-right';

const tests: Array<[[number[], number], number]> = [[[[1, 2, 8, 4], 8], 2]];

test('binarySearch_for should work', () => {
  tests.forEach((test, index) => {
    const [input, expected] = test;
    const output = binarySearch_for(...input);
    expect(output).toBe(expected);
  });
});

test('binarySearch_bfs should work', () => {
  tests.forEach((test, index) => {
    const [input, expected] = test;
    const output = binarySearch_bfs(...input);
    expect(output).toBe(expected);
  });
});

test('binarySearch_dfs should work', () => {
  tests.forEach((test, index) => {
    const [input, expected] = test;
    const output = binarySearch_dfs(...input);
    expect(output).toBe(expected);
  });
});

test('binarySearch_post_dfs should work', () => {
  tests.forEach((test, index) => {
    const [input, expected] = test;
    const output = binarySearch_post_dfs(...input);
    expect(output).toBe(expected);
  });
});

describe('binary search boundary should work', () => {
  const input = [1, 2, 3, 3, 3, 4, 5];
  const target = 3;
  test('left boundary', () => {
    const output = binarySearch_left(input, target);
    expect(output).toBe(2);
  });

  test('right boundary', () => {
    const output = binarySearch_right(input, target);
    expect(output).toBe(4);
  });
});
