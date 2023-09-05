// export function fib_post_dfs(n: number) {
//   if (n === 0 || n === 1) return n;
//   return fib_post_dfs(n - 1) + fib_post_dfs(n - 2);
// }

export function fib_post_dfs(n: number) {
  const dp = [0, 1];

  const dfs = (i: number) => {
    if (dp[i] !== undefined) {
      return dp[i]; // 重叠优化
    }

    dp[i] = dfs(i - 1) + dfs(i - 2);
    return dp[i];
  };

  return dfs(n);
}
