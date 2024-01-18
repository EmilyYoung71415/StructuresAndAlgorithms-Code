// nums[i] > nums[len-1]
export function findMin(nums: number[]): number {
  const len = nums.length;

  let [l, r] = [0, nums.length - 1];

  // [l,m-1][m,r]
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] < nums[len - 1]) r = m;
    else l = m + 1;
  }

  return nums[l];
}
