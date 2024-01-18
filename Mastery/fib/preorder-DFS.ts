// DFS（深度优先搜索） DFS和BFS在先序拓扑排序中使用不同的方法来处理节点。
// BFS的队列中的节点是已经结束的状态，而DFS的栈中的函数是正在进行的状态

export function fib(n: number) {
  const len = n + 1;
  const dp = new Array(len).fill(0);
  dp[1] = 1;

  const inDeg = new Array(len).fill(2);
  inDeg[0] = 0;
  inDeg[1] = 0;

  // 起始点，dfs函数开始表示入栈开始进行运算，出栈表示运算结束
  // 执行栈中的函数是正在进行的状态，知道x=n的时候才返回
  // bfs: queue: 表示已知的节点
  const begin = [0, 1];

  const dfs = (x: number) => {
    if (x === n) return dp[x];

    // 扩展
    const next = x === 0 ? [2] : [x + 1, x + 2];
    for (let y of next) {
      dp[y] += dp[x];
      inDeg[y]--;
      if (inDeg[y] === 0) dfs(y);
    }
  };

  for (let x of begin) {
    dfs(x);
  }

  return dp[n];
}
