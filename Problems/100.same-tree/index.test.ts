import { TreeUtil } from '@utils';
import { isSameTree } from './index';
import { isSameTree as isSameTree_bfs } from './bfs';

describe('100.isSameTree', () => {
  it('case 1', () => {
    const tree1 = TreeUtil.buildByLevel([1, 2, 3]);
    const tree2 = TreeUtil.buildByLevel([1, 2, 3]);
    const output = isSameTree(tree1, tree2);
    expect(output).toBeTruthy();
  });
  it('case 2', () => {
    const tree1 = TreeUtil.buildByLevel([1, 2, 1]);
    const tree2 = TreeUtil.buildByLevel([1, 1, 2]);
    const output = isSameTree(tree1, tree2);
    expect(output).toBeFalsy();
  });
});

describe('100.isSameTree bfs', () => {
  it('case 1', () => {
    const tree1 = TreeUtil.buildByLevel([1, 2, 3]);
    const tree2 = TreeUtil.buildByLevel([1, 2, 3]);
    const output = isSameTree_bfs(tree1, tree2);
    expect(output).toBeTruthy();
  });
  it('case 2', () => {
    const tree1 = TreeUtil.buildByLevel([1, 2, 1]);
    const tree2 = TreeUtil.buildByLevel([1, 1, 2]);
    const output = isSameTree_bfs(tree1, tree2);
    expect(output).toBeFalsy();
  });
});
