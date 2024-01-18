export function climbStairs1(n: number): number {
  if (n <= 2) return n;

  // [0, 1, 2]
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// 如果是算每个节点的 前累计值的写法: （不用dp存, 更小内存消耗的话 // 滚动数组
// cur  = prev + pprev; 随着滚动不断更新这俩值即可
export function climbStairs(n) {
  if (n < 3) return n;

  // 从3开始for
  let prev = 2; // dp[2]
  let pprev = 1; // dp[1]
  let sum = 0;

  for (let i = 3; i <= n; i++) {
    sum = prev + pprev;
    pprev = prev;
    prev = sum;
  }

  return sum;
}
