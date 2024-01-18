import { orangesRotting } from './bfs';

test('orangesRotting should work1', () => {
  const output = orangesRotting([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ]);
  expect(output).toBe(4);
});

test('orangesRotting should work2', () => {
  const output = orangesRotting([
    [2, 1, 1],
    [0, 1, 1],
    [1, 0, 1],
  ]);
  expect(output).toBe(-1);
});

test('orangesRotting should work3', () => {
  const output = orangesRotting([[0, 2]]);
  expect(output).toBe(0);
});
