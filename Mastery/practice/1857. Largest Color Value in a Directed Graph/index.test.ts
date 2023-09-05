import { largestPathValue } from './index';

const testData = [
  {
    colors: 'nnllnzznn',
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
      [3, 5],
      [4, 6],
      [3, 6],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
    expected: 5,
  },
];

test('should work', () => {
  testData.forEach(test => {
    const { colors, edges, expected } = test;
    const output = largestPathValue(colors, edges);
    expect(output).toBe(expected);
  });
});
