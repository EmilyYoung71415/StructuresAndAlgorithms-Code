// check: 右边: nums[i] > nums[i+1];
export function findPeakElement(nums: number[]): number {
  let [l, r] = [0, nums.length - 1];
  // [l, m][m+1, r]
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] > nums[m + 1]) {
      r = m;
    } else {
      l = m + 1;
    }
  }

  return l;
}
