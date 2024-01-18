import { TreeUtil } from '@utils';
import { isSameTree } from './index';

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
