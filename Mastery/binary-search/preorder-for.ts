export function binarySearch(nums: number[], target: number) {
  let [l, r] = [0, nums.length - 1];

  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] >= target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return nums[l] !== undefined ? l : -1;
}
