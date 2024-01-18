import { swap } from '@utils';

// 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
export type Color = 1 | 2 | 0;

export function sortColors(nums: Color[]) {
  const n = nums.length;

  // [0, 0, p0, 1, 1,1,p1, 2,2,2]
  let p0 = 0; //左边 = ~0  // p0之前全0
  let p1 = 0; //左边 = ~0~1 // p1之前到p0全为1

  for (let i = 0; i < n; i++) {
    // 012[1]
    // 1直接放到p1位置
    if (nums[i] === 1) {
      swap(nums, i, p1);
      p1++;
    } else if (nums[i] === 0) {
      // 0需要放到p0的位置并且 如果被占据的位置是1还得把1放到p1
      //case1:012[0]
      swap(nums, i, p0);
      //case2:002[0]
      if (p0 < p1) {
        swap(nums, i, p1);
      }
      p0++;
      p1++;
    }
  }
}
