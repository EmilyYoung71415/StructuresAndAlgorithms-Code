export function binarySearch(nums: number[], target: number): number {
  // 全局变量targetIndex 来进行先序传递， dfs作用: 利用栈扩展
  let targetIndex = -1;

  const dfs = (l: number, r: number) => {
    if (l === r) {
      targetIndex = l;
      return;
    }

    const mid = Math.floor((l + r) / 2);
    if (nums[mid] >= target) {
      dfs(l, mid);
    } else {
      dfs(mid + 1, r);
    }
  };

  dfs(0, nums.length - 1);
  return nums[targetIndex] !== undefined ? targetIndex : -1;
}
