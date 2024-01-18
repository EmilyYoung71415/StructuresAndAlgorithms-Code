// import { largestPathValue } from './index';
import { largestPathValue as largestPathValue_bfs } from './bfs';
import { largestPathValue as largestPathValue_dfs } from './post_dfs';

const testData = [
  {
    colors: 'abaca',
    edges: [
      [0, 1],
      [0, 2],
      [2, 3],
      [3, 4],
    ],
    expected: 3,
  },
  // {
  //   colors: 'nnllnzznn',
  //   edges: [
  //     [0, 1],
  //     [1, 2],
  //     [2, 3],
  //     [2, 4],
  //     [3, 5],
  //     [4, 6],
  //     [3, 6],
  //     [5, 6],
  //     [6, 7],
  //     [7, 8],
  //   ],
  //   expected: 5,
  // },
];

test('largestPathValue_bfs should work', () => {
  testData.forEach(test => {
    const { colors, edges, expected } = test;
    const output = largestPathValue_bfs(colors, edges);
    expect(output).toBe(expected);
  });
});

test.skip('largestPathValue_dfs should work', () => {
  testData.forEach(test => {
    const { colors, edges, expected } = test;
    const output = largestPathValue_dfs(colors, edges);
    expect(output).toBe(expected);
  });
});
