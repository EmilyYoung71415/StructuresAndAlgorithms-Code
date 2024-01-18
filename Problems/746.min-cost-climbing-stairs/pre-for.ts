export function minCostClimbingStairs(costs: number[]): number {
  const n = costs.length;
  const dp = new Array(n + 1).fill(0);

  // 注意边界值的理解
  dp[0] = dp[1] = 0;

  // 即dp[i] = min(dp[i - 2] + cost[i - 2], dp[i - 1] + cost[i - 1]); ✅
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i - 2] + costs[i - 2], dp[i - 1] + costs[i - 1]);
  }

  return dp[n];
}

// 使用滚动数组优化内存空间
function minCostClimbingStairs2(costs: number[]): number {
  const n = costs.length;
  // dp[0] = dp[1] = 0;
  let prev = 0;
  let pprev = 0;
  let minCost = 0;

  for (let i = 2; i <= n; i++) {
    // dp[i] = Math.min(dp[i - 2] + costs[i - 2], dp[i - 1] + costs[i - 1]);
    minCost = Math.min(pprev + costs[i - 2], prev + costs[i - 1]);
    pprev = prev;
    prev = minCost;
  }

  return minCost;
}
