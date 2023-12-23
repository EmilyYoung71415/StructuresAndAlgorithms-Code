export function jump(nums: number[]): number {
  let maxPos = 0;
  let jumpCount = 0;
  let border = 0; // 当前能跳跃到的位置的边界下标

  // 注意是 < nums.length - 1，因为最后一步不需要跳
  for (let curPos = 0; curPos < nums.length - 1; curPos++) {
    const curMaxPos = curPos + nums[curPos]; // 从当前点出发能达到的最远距离
    maxPos = Math.max(maxPos, curMaxPos);

    // 到了边界，即一定要跳了
    if (curPos === border) {
      border = maxPos;
      jumpCount++;
    }
  }

  return jumpCount;
}
