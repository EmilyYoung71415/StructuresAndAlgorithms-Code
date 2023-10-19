// 后序的体现在于：通过dfs的returnval向上传递表现targetIndex
export function binarySearch(nums: number[], target: number): number {
  const dfs = (l: number, r: number) => {
    if (l === r) {
      return l;
    }

    const mid = Math.floor((l + r) / 2);

    if (nums[mid] >= target) {
      return dfs(l, mid);
    } else {
      return dfs(mid + 1, r);
    }
  };

  const targetIndex = dfs(0, nums.length - 1);
  return nums[targetIndex] !== undefined ? targetIndex : -1;
}
