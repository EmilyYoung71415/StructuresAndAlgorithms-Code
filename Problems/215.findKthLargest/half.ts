// 折半优化： 用于求top k问题
import { swap } from '@utils';

//将[L,R]按照枢轴分为三份  三色问题 → > pivot | = pivot | < pivot
// < pivot | = pivot | > pivot
// 将数组分成 [ <left, (left, right) , >right]
const partition = (nums: number[], left: number, right: number) => {
  const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
  const p = nums[pivotIndex];

  let l = left;
  let r = right;
  let i = l;

  // 求k大的， return nums[k-1]; nums降序
  while (i <= r) {
    if (nums[i] < p) {
      swap(nums, i, r--);
    } else if (nums[i] > p) {
      swap(nums, i++, l++);
    } else {
      i++;
    }
  }

  return [l, r];
};

export function findKthLargest2(nums: number[], k: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const [l, r] = partition(nums, left, right);

    if (k - 1 >= l && k - 1 <= r) {
      return nums[k - 1];
    } else if (k - 1 < l) {
      right = l - 1;
    } else {
      left = r + 1;
    }
  }

  return nums[left];
}

export function findKthLargest_dfs(nums: number[], k: number): number {
  const dfs = (left: number, right: number): void => {
    if (left > right) return;

    const [l, r] = partition(nums, left, right);

    if (k - 1 >= l && k - 1 <= r) return;
    if (k - 1 < l) {
      dfs(left, l - 1);
    } else {
      dfs(r + 1, right);
    }
  };

  dfs(0, nums.length - 1);
  return nums[k - 1];
}
