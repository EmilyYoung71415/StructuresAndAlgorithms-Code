import { quickSort } from './index';

const testData = [
  {
    input: [6, 3, 5, 9, 1, 4],
    output: [1, 3, 4, 5, 6, 9],
  },
  {
    input: [2, 0, 2, 1, 1, 0],
    output: [0, 0, 1, 1, 2, 2],
  },
];

test('quick sort should work', () => {
  testData.forEach(test => {
    quickSort(test.input);
    expect(test.input).toStrictEqual(test.output);
  });
});
