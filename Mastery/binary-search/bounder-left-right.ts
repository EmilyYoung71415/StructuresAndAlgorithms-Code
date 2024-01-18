export function binarySearch_left(nums: number[], target: number) {
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

export function binarySearch_right(nums: number[], target: number) {
  let [l, r] = [0, nums.length - 1];

  while (l < r) {
    const mid = Math.ceil((l + r) / 2); // 向上取整
    if (nums[mid] > target) {
      // >
      r = mid - 1;
    } else {
      l = mid;
    }
  }

  return nums[l] !== undefined ? l : -1;
}
