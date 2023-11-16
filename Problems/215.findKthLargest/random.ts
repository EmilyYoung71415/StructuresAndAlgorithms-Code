import { swap } from '@utils';

export function findKthLargest(nums: number[], k: number) {
  //将[l,r]按照枢轴分为三份
  const partition = (l: number, r: number) => {
    //1、根据枢轴讲数组中的数按照大小分成左右两半，并且中间为 pivot
    const pivotIndex = l + Math.floor(Math.random() * (r - l + 1));
    const pivot = nums[pivotIndex];
    swap(nums, pivotIndex, r);
    let mid = l; //M左边的数小于Pivot
    for (let i = l; i < r; i++) {
      if (nums[i] < pivot) {
        swap(nums, i, mid);
        mid++;
      }
    }
    swap(nums, mid, r);
    return mid;
  };

  const dfs = (l: number, r: number) => {
    //边界状态
    if (r - l <= 0) return;
    // 随机找个mid，以mid为划分，将数组分为 <mid, =mid, >mid
    const mid = partition(l, r);
    //[l, m-1]
    dfs(l, mid - 1);
    // m
    //[m+1, r]
    dfs(mid + 1, r);
  };

  dfs(0, nums.length - 1);
  return nums[nums.length - k];
}
