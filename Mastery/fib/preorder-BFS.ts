// 确实有点绕
// 除了用queue以外
// 还用了dp, inDeg
// queue记录已经求出结果的节点，但不是存储结果
// dp是存储结果
// inDeg统计入度辅助求出结果，控制该点是否符合入队条件
export function fib(n: number) {
  const dp = new Array(n + 1).fill(0); // 结果值
  dp[1] = 1;

  // 入度：先序遍历要统计入度，入度的意义代表：该点依赖多少个点
  const inDeg = new Array(n + 1).fill(2);
  inDeg[0] = 0;
  inDeg[1] = 0;

  // 队列：已在队列中的值表示已求出来的
  // queue里面就是放的 0,1,...n 一直到n的下标，用来标记节点
  // const x = queue.shift();
  // result = dp[x] // 下标为x的节点的结果是 dp[x] = fib(x);
  // inDeg[x] = // 下标为x的节点的入度是xxx

  const queue = [0, 1]; // [0, 1, ... , n] // 标记已求出来的节点的下标

  while (queue.length) {
    const x = queue.shift(); // x表示节点，已求出值的节点

    // 目标
    if (x === n) return dp[x];

    // 扩展
    // next表示_n的邻接节点
    // 下标为next的节点
    const next = x === 0 ? [2] : [x + 1, x + 2];
    for (let y of next) {
      dp[y] += dp[x]; // y已接收到_n传来的值了，这里的递推公式是求和
      inDeg[y] -= 1; // y所依赖的点个数-1
      if (inDeg[y] === 0) {
        // y不依赖任何点，y的值求出来
        queue.push(y);
      }
    }
  }
}

// 出队
// 出队-扩展：将该点的值传给下一个点，比如0出队传给2
