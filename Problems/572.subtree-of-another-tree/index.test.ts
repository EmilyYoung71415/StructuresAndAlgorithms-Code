import { TreeUtil } from '@utils';
import { isSubtree } from './index';
import { isSubtree as isSubtree_Perf } from './perf-kmp';

describe('Problems/572.subtree-of-another-tree', () => {
  it('should pass the test case 1', () => {
    const root = TreeUtil.buildByLevel([3, 4, 5, 1, 2, null, null, null, null, 0]);
    const subRoot = TreeUtil.buildByLevel([4, 1, 2]);
    const isSame = isSubtree(root, subRoot);
    expect(isSame).toBeFalsy();
  });
});

describe('Problems/572.subtree-of-another-tree isSubtree_Perf', () => {
  it('should pass the test case 1', () => {
    const root = TreeUtil.buildByLevel([3, 4, 5, 1, 2, null, null, null, null, 0]);
    const subRoot = TreeUtil.buildByLevel([4, 1, 2]);
    const isSame = isSubtree_Perf(root, subRoot);
    expect(isSame).toBeFalsy();
  });

  it.only('should pass the test case 2', () => {
    const root = TreeUtil.buildByLevel([12]);
    const subRoot = TreeUtil.buildByLevel([1]);
    const isSame = isSubtree_Perf(root, subRoot);
    expect(isSame).toBeFalsy();
  });
});
