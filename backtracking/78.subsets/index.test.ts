import { subsets } from './index';
import { serializeArr } from '@utils';

test('subsets should work', () => {
  const nums = [1, 2, 3];
  const output = subsets(nums);
  const str1 = serializeArr(output);
  const str2 = serializeArr([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]);
  expect(str1).toBe(str2);
});

test('subsets should work2', () => {
  const nums = [0];
  const output = subsets(nums);
  const str1 = serializeArr(output);
  const str2 = serializeArr([[], [0]]);
  expect(str1).toBe(str2);
});
