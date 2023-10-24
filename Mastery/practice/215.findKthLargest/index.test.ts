import { findKthLargest as findKthlargest_random } from './random';
import { findKthLargest as findKthlargest_tree_color } from './three-color';
import { findKthLargest as findKthlargest_half } from './half';

type TestInput = [number[], number];
const testData: { input: TestInput; output: number }[] = [
  {
    input: [[3, 2, 1, 5, 6, 4], 2],
    output: 5,
  },
  {
    input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4],
    output: 4,
  },
];

test('findKthlargest_random should work', () => {
  testData.forEach(test => {
    const [nums, k] = test.input;
    const output = findKthlargest_random(nums, k);
    expect(output).toBe(test.output);
  });
});

test('findKthlargest_tree_color should work', () => {
  testData.forEach(test => {
    const [nums, k] = test.input;
    const output = findKthlargest_tree_color(nums, k);
    expect(output).toBe(test.output);
  });
});

test('findKthlargest_half should work', () => {
  testData.forEach(test => {
    const [nums, k] = test.input;
    const output = findKthlargest_half(nums, k);
    expect(output).toBe(test.output);
  });
});
