import { deepClone } from '@utils';
import { numIslands as numIslands_bfs } from './bfs';
import { numIslands as numIslands_dfs } from './dfs';

const testData: Array<{ input: string[][]; expected: number }> = [
  {
    input: [
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
    ],
    expected: 1,
  },
  {
    input: [
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1'],
    ],
    expected: 3,
  },
];

test('numIslands bfs should work', () => {
  const output = numIslands_bfs(deepClone(testData[0].input));
  expect(output).toBe(testData[0].expected);

  const output2 = numIslands_bfs(deepClone(testData[1].input));
  expect(output2).toBe(testData[1].expected);
});

test('numIslands dfs should work', () => {
  const output = numIslands_dfs(deepClone(testData[0].input));
  expect(output).toBe(testData[0].expected);
  const output2 = numIslands_dfs(deepClone(testData[1].input));
  expect(output2).toBe(testData[1].expected);
});
