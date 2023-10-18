export function fib(n: number) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;

  //入度：先序遍历要统计入度，入度的意义代表该点依赖于多少个点，当一个状态点接收到一个点的值，那么入度-1
  const inDeg = new Array(n + 1).fill(2);
  inDeg[0] = 0;
  inDeg[1] = 0;

  //队列：队列中的状态点的值已经求出来了
  const begin = [0, 1];

  const dfs = (x: number) => {
    // stack: [x, visitedCount][]
    const stack: [number, number][] = [[x, 0]]; //运行时栈

    while (stack.length) {
      const [x, visitedCount] = stack[stack.length - 1]; // vis用来标记访问过几个邻接节点

      //出栈条件：当邻接节点访问完毕的时候，可以出栈
      const case1 = x === 0 && visitedCount === 1; //当x == 0时，已访问的邻接节点的个数为1
      const case2 = x !== 0 && visitedCount === 2; //当x != 0时，已访问的邻接节点的个数为2

      //case1：扩展入栈 → 先序传值
      if (!case1 && !case2) {
        // const nexts = x === 0 ? [2] : [x + 1, x + 2];
        // 因为在for( next of nexts) 循环里调用了dfs，用栈模拟的时候就是展开
        // 所以nexts => 每次取一个next
        const next = x === 0 ? 2 : x + visitedCount + 1;
        stack[stack.length - 1][1]++; // 代表扩展节点 + 1
        if (next > n) continue; //next
        inDeg[next]--;
        dp[next] += dp[x];
        if (inDeg[next] === 0) {
          // 每新入栈开始访问的节点，他已访问的肯定都是0
          stack.push([next, 0]);
        }
      } else {
        //case2：结束出栈 → 后序传值 → 出栈后将该值传递给栈顶节点
        stack.pop();
      }
    }
  };

  for (let x of begin) {
    dfs(x);
  }

  return dp[n];
}
