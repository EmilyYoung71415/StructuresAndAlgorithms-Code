import { TreeUtil } from '@utils';
import { maxDepth as maxDepth_bfs, maxDepth_better as maxDepth_better_bfs } from './bfs-preorder';
import { maxDepth_backtrack, maxDepth as maxDepth_dfs } from './dfs-preorder';
import { maxDepth as maxDepth_dfs_post } from './dfs-postorder';

const root = TreeUtil.buildByLevel([3, 9, 20, null, null, 15, 7]);
const expected = 3;

describe('maxDep bfs should work', () => {
  test('bfs', () => {
    const output = maxDepth_bfs(root);
    expect(output).toBe(expected);
  });

  test('bfs better with using only one variable', () => {
    const output = maxDepth_better_bfs(root);
    expect(output).toBe(expected);
  });
});

describe('maxDep dfs preorder should work', () => {
  test('dfs', () => {
    const output = maxDepth_dfs(root);
    expect(output).toBe(expected);
  });

  test('dfs preorder better with using backtracking', () => {
    const output = maxDepth_backtrack(root);
    expect(output).toBe(expected);
  });
});

describe('maxDep dfs postorder should work', () => {
  test('dfs', () => {
    const output = maxDepth_dfs_post(root);
    expect(output).toBe(expected);
  });
});
