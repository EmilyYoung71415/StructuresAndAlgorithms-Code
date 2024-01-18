import { TreeUtil } from '@utils';
import { isCousins } from './index';

test('hasCousin should work', () => {
  const root = TreeUtil.buildByLevel([1, 2, 3, 4, null, null, null]);
  const output = isCousins(root, 3, 4);
  expect(output).toBe(false);
});

test('hasCousin should work2', () => {
  const root = TreeUtil.buildByLevel([1, 2, 3, null, 4, null, null]);
  const output = isCousins(root, 2, 3);
  expect(output).toBe(false);
});
