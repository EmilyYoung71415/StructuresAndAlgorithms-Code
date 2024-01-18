import { sortColors, type Color } from './index';

// 示例 1：
// 输入：nums = [2,0,2,1,1,0]
// 输出：[0,0,1,1,2,2]

// 示例 2：
// 输入：nums = [2,0,1]
// 输出：[0,1,2]

test('sortColors should work', () => {
  const input1: Color[] = [2, 0, 2, 1, 1, 0];
  const output2: Color[] = [0, 0, 1, 1, 2, 2];
  sortColors(input1);
  expect(input1).toStrictEqual(output2);
});

test('sortColors should work', () => {
  const input1: Color[] = [2, 0, 1];
  const output2: Color[] = [0, 1, 2];
  sortColors(input1);
  expect(input1).toStrictEqual(output2);
});
