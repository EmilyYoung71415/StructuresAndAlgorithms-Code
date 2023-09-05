export function fib_pre_dfs(n: number) {
  // ⭐️ 可以预先return已知的
  if (n === 0 || n === 1) return n;

  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  const inDeg = new Array(n + 1).fill(2);
  inDeg[0] = 0;
  inDeg[1] = 0;

  const begin = [0, 1];

  // 更新dp
  const dfs = (x: number) => {
    if (x === n) return dp[n];

    const nexts = x === 0 ? [2] : [x + 1, x + 2];

    for (let next of nexts) {
      if (next > n) continue; //注意在这里写而不是在下面写
      dp[next] += dp[x];
      inDeg[next]--;
      if (inDeg[next] === 0) {
        dfs(next);
      }
    }
  };

  begin.forEach(x => {
    dfs(x);
  });

  // ⭐️: 要在这里return
  return dp[n];
}
