import { TreeUtil } from '@utils';
import { pathSum } from './index';

test('pathSum should work', () => {
  const root = TreeUtil.buildByLevel([
    5,
    4,
    8,
    11,
    null,
    13,
    4,
    7,
    2,
    null,
    null,
    null,
    null,
    5,
    1,
  ]);
  const output = pathSum(root, 22);
  expect(output).toStrictEqual([
    [5, 4, 11, 2],
    [5, 8, 4, 5],
  ]);
});
