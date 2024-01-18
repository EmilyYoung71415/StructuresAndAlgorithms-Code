import { closedIsland } from './dfs';

describe('closedIsland dfs', () => {
  test('closedIsland should work1', () => {
    const grid = [
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0, 1, 1, 0],
      [1, 0, 1, 0, 1, 1, 1, 0],
      [1, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0],
    ];
    const output = closedIsland(grid);
    expect(output).toBe(2);
  });

  test('closedIsland should work2', () => {
    const grid = [
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
    ];
    const output = closedIsland(grid);
    expect(output).toBe(1);
  });

  test('closedIsland should work3', () => {
    const grid = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const output = closedIsland(grid);
    expect(output).toBe(2);
  });
});
