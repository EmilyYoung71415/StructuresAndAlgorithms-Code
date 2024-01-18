import { TreeUtil } from '@utils';
import { isSubtree } from './index';

describe('Problems/572.subtree-of-another-tree', () => {
  it('should pass the test case 1', () => {
    const root = TreeUtil.buildByLevel([3, 4, 5, 1, 2, null, null, null, null, 0]);
    const subRoot = TreeUtil.buildByLevel([4, 1, 2]);
    const isSame = isSubtree(root, subRoot);
    expect(isSame).toBeFalsy();
  });
});
