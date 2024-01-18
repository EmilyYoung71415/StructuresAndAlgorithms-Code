import { TreeUtil } from '@utils';
import { sumNumbers } from './index';

test('sum root to leaf numbers should work', () => {
  const root = TreeUtil.buildByLevel([1, 2, 3, null, null, null, null]);
  const output = sumNumbers(root);
  expect(output).toBe(25);
});

test('sum root to leaf numbers should work2', () => {
  const root = TreeUtil.buildByLevel([4, 9, 0, 5, 1, null, null]);
  const output = sumNumbers(root);
  expect(output).toBe(1026);
});
