// 三色优化： 用于大量重复数字
import { swap } from '@utils';

export function findKthLargest(nums: number[], k: number) {
  //将[L,R]按照枢轴分为三份  三色问题 → > pivot | = pivot | > pivot
  const partition = (L: number, R: number): number[] => {
    //1、根据枢轴将数组中的数按照大小分成左右两半，并且中间为pivot
    const pivotIndex = L + Math.floor(Math.random() * (R - L + 1));
    const pivot = nums[pivotIndex];
    let p0 = L; //左边 = ~0
    let p1 = L; //左边 = ~0~1
    for (let i = L; i <= R; ++i) {
      //012[1]
      if (nums[i] == pivot) {
        swap(nums, i, p1);
        p1++;
      } else if (nums[i] < pivot) {
        //case1:012[0]
        swap(nums, i, p0);
        //case2:002[0]
        if (p0 < p1) swap(nums, i, p1);
        p0++;
        p1++;
      }
    }
    return [p0, p1 - 1];
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
