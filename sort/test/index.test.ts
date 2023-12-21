import { bubbleSort } from '../bubble-sort';
import { mergeSort } from '../merge-sort';
import { quickSort, quickSort2 } from '../quick-sort';

const sortFuncs = [bubbleSort, mergeSort, quickSort, quickSort2];

const testCases = [
  { input: [4, 2, 7, 1, 5], expected: [1, 2, 4, 5, 7] },
  { input: [9, 3, 6, 2, 1], expected: [1, 2, 3, 6, 9] },
  { input: [5, 8, 2, 9, 4], expected: [2, 4, 5, 8, 9] },
  { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
  { input: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] },
];

describe('Sorting Algorithms with bubbleSort', () => {
  testCases.forEach(({ input, expected }) => {
    it(`should sort ${input} correctly`, () => {
      const result = bubbleSort([...input]);
      expect(result).toEqual(expected);
    });
  });
});

describe('Sorting Algorithms with mergeSort', () => {
  testCases.forEach(({ input, expected }) => {
    it(`should sort ${input} correctly`, () => {
      const result = mergeSort([...input]);
      expect(result).toEqual(expected);
    });
  });
});

describe('Sorting Algorithms with quickSort', () => {
  describe('quickSort1', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should sort ${input} correctly`, () => {
        const result = quickSort([...input]);
        expect(result).toEqual(expected);
      });
    });
  });

  describe('quickSort iterative', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should sort ${input} correctly`, () => {
        const result = quickSort2([...input]);
        expect(result).toEqual(expected);
      });
    });
  });
});
