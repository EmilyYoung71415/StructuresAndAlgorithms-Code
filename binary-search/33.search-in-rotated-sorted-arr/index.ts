// arr is possibly rotated at an unknown pivot index k
// Input: (arr = [4, 5, 6, 7, 0, 1, 2]), (target = 0);
// Output: 4;

// 题解思路:
// 整数数组 nums 按升序排列
// 1.先找到旋转点pivot（同样二分)
// 2.以pivot划分的两个数组，找到目标数组L or R, 对数组进行二分找target
// 复杂度: 2 * NlogN
export function search(nums: number[], target: number): number {
  const pivotIndex = findPivot(nums);

  // 简单判断 target是属于 L or R
  // L: 升序
  // R: 降序
  if (nums[pivotIndex] === target) return pivotIndex;
  let l: number = 0;
  let r: number = nums.length - 1;

  if (pivotIndex !== 0) {
    if (target > nums[pivotIndex] && target <= nums[nums.length - 1]) {
      // if (nums[pivotIndex] =< target && nums[pivotIndex] > target) {
      [l, r] = [pivotIndex, nums.length - 1];
    } else {
      [l, r] = [0, pivotIndex - 1];
    }
  }

  const targetIndex = findTarget(nums, target, l, r);
  return nums[targetIndex] === target ? targetIndex : -1;

  // [4, 5, 6, 7, 0, 1, 2]
  // nums[m] < nums[len-1]
  function findPivot(arr: number[]): number {
    const len = arr.length;
    let [l, r] = [0, len - 1];
    // [l, m][m+1, r];
    // nums[m] > nums[m+1];
    while (l < r) {
      const m = Math.floor((l + r) / 2);
      if (arr[m] < arr[len - 1]) {
        r = m;
      } else {
        l = m + 1;
      }
    }

    return l;
  }

  function findTarget(arr: number[], target: number, l: number, r: number): number {
    if (!arr.length) return -1;

    while (l < r) {
      const m = Math.floor((l + r) / 2);
      if (target <= arr[m]) {
        r = m;
      } else {
        l = m + 1;
      }
    }

    return arr[l] === target ? l : -1;
  }
}
