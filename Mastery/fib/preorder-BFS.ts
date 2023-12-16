// 先序BFS
/****
 * 状态1: 入度inDeg
 *    - 状态: inDeg[x] 表示x点需要接受多少个前置状态点的值才能向后更新
 *    - 递推: 每次访问到了前置状态点更新值后，当前x点的入度 -1
 *    - 顺序: 先序*邻接（DAG的值依赖节点顺序
 *
 * 状态2: 斐波拉契的求和dp
 *    - 状态: dp[n]表示fib(n)
 *          边界：dp[0], dp[1]已知
 *          目标: dp[n]
 *    - 递推:
 *        dp[n] = dp[n-1] + dp[n-2]
 *    - 顺序:
 *        先序*邻接 -> BFS
 */
export function fib_pre_bfs(n: number) {
  // dp, inDeg, nexts 都是存index表示节点的唯一性
  if (n === 0) return 0;
  if (n === 1) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;

  // 构建入度统计
  const inDeg = new Array(n + 1).fill(2);
  inDeg[0] = 0;
  inDeg[1] = 0;

  // 什么时候入队确定已计算出的节点：当入度为0时
  // queue[index] = index;
  const queue = [0, 1]; // 已经求出来的点，即被依赖的数据已知，以此来做扩展，dp[next] += dp[cur]; 此时的dp[cur]是准确的

  while (queue.length) {
    const cur = queue.shift(); // 前值

    // ⭐️ 在这里return, 可以少计算
    if (cur === n) {
      return dp[n];
    }

    const nexts = cur == 0 ? [2] : [cur + 1, cur + 2]; // 扩展值

    for (let next of nexts) {
      // ⭐️ 防止访问越界
      if (next > n) {
        continue;
      }
      // 扩展的点的值 依赖于cur的值
      dp[next] += dp[cur];
      inDeg[next]--;
      if (inDeg[next] === 0) {
        queue.push(next);
      }
    }
  }

  // return dp[n];
}
