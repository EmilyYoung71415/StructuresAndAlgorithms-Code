export function binarySearch(nums: number[], target: number): number {
  const queue = [[0, nums.length - 1]];
  // let targetIndex = -1;

  while (queue.length) {
    let [l, r] = queue.shift();
    if (l === r) {
      // targetIndex = l;
      // break;
      return nums[l] !== undefined ? l : -1;
    }

    const mid = Math.floor((l + r) / 2);
    if (nums[mid] >= target) {
      // r = mid;
      queue.push([l, mid]);
    } else {
      // l = mid + 1;
      queue.push([mid + 1, r]);
    }
  }

  return -1;
}
