import { swap } from '@utils';

// 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
export type Color = 1 | 2 | 0;

export function sortColors(nums: Color[]) {
  const n = nums.length;
  const pivot = 1;

  let ll = 0; // < p的边界指针
  let i = 0;
  let rr = n - 1; // > p 的边界指针

  while (i <= rr) {
    if (nums[i] < pivot) {
      swap(nums, i, ll);
      i++;
      ll++;
    } else if (nums[i] > pivot) {
      swap(nums, i, rr);
      rr--;
    } else {
      i++;
    }
  }
}
