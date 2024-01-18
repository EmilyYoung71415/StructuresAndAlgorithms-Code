// 三色优化： 用于大量重复数字
import { swap } from '@utils';
// reference: 75.sort-colors

export function findKthLargest(nums: number[], k: number) {
  //将[L,R]按照枢轴分为三份  三色问题 → > pivot | = pivot | > pivot
  const partition = (left: number, right: number): [number, number] => {
    //1、根据枢轴将数组中的数按照大小分成左右两半，并且中间为pivot
    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const pivot = nums[pivotIndex];
    let l = left; // < p的边界指针
    let r = right; // > p 的边界指针
    let i = l;

    while (i <= r) {
      if (nums[i] < pivot) {
        swap(nums, i++, l++);
      } else if (nums[i] > pivot) {
        swap(nums, i, r--);
      } else {
        i++;
      }
    }

    return [l, r];
  };

  const dfs = (L: number, R: number) => {
    //边界状态
    if (R - L <= 0) return;
    const [l, r] = partition(L, R);
    dfs(L, l - 1);
    dfs(r + 1, R);
  };

  dfs(0, nums.length - 1);
  return nums[nums.length - k];
}
