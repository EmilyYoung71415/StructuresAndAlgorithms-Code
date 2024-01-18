import { shortestPath as shortestPath_bfs } from './bfs';
import { shortestPath as shortestPath_dfs } from './dfs';

const matrix = [
  [0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
];

test('shortestPath_bfs should work', () => {
  const output = shortestPath_bfs(matrix, [0, 0], [4, 4]);
  expect(output).toBe(12);
});

test('shortestPath_dfs should work', () => {
  const output = shortestPath_dfs(matrix, [0, 0], [0, 1]);
  expect(output).toBe(1);

  const output2 = shortestPath_dfs(matrix, [0, 0], [2, 1]);
  expect(output2).toBe(5);

  const output3 = shortestPath_dfs(matrix, [0, 0], [4, 4]);
  expect(output3).toBe(12);
});
