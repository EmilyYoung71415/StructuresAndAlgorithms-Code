// 返回到达 nums[n - 1] 的最小跳跃次数
export function canJump(nums: number[]): boolean {
  let maxPos = 0;
  for (let curPos = 0; curPos < nums.length; curPos++) {
    if (curPos > maxPos) return false;
    const curMaxPos = curPos + nums[curPos]; // 从当前点出发能达到的最远距离
    maxPos = Math.max(maxPos, curMaxPos);
  }

  return true;
}

// 优化：提早退出
export function canJump2(nums: number[]): boolean {
  let maxPos = 0;
  // 改动1
  for (let curPos = 0; curPos <= maxPos; curPos++) {
    const curMaxPos = curPos + nums[curPos]; // 从当前点出发能达到的最远距离
    maxPos = Math.max(maxPos, curMaxPos);
    // 改动2
    if (maxPos >= nums.length - 1) return true;
  }

  return false;
}
