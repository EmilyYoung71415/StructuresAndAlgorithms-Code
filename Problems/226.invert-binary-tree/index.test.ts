import { TreeUtil } from '@utils';
import { invertTree } from './index';

describe('invertTree should work', () => {
  it('case 1', () => {
    const Input = [4, 2, 7, 1, 3, 6, 9];
    const expected = [4, 7, 2, 9, 6, 3, 1];
    const tree = TreeUtil.buildByLevel(Input);
    invertTree(tree);
    const Output = TreeUtil.traversalLevelOrder(tree);
    expect(Output).toEqual(expected);
  });

  it('case 2', () => {
    const Input = [2, 1, 3];
    const expected = [2, 3, 1];
    const tree = TreeUtil.buildByLevel(Input);
    invertTree(tree);
    const Output = TreeUtil.traversalLevelOrder(tree);
    expect(Output).toEqual(expected);
  });
});
