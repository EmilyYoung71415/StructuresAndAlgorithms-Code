// f(n) = f(n-1) + f(n-2)
// 0
// 1
// 1
// 2
// 3
// f(n) = f(n-1) + f(n-2) 当前值依赖前面的值，那就把前面的值存起来
// 注意，由于这里刚好形成了拓扑排序的顺序，故而可以直接往后递推
export function fib_pre_for(n: number) {
  const dp = [0, 1];

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
