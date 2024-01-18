import { serializeMatrix } from '@utils';
import { subsetsWithDup } from './index';

test('subsetsWithDup should work', () => {
  const output = subsetsWithDup([1, 2, 2]);
  expect(serializeMatrix(output)).toBe(serializeMatrix([[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]));
});

test('subsetsWithDup should work2', () => {
  const output = subsetsWithDup([0]);
  expect(serializeMatrix(output)).toBe(serializeMatrix([[], [0]]));
});
