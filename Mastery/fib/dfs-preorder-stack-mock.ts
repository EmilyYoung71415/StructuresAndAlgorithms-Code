function fib(n: number) {
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
    const stack: [number, number][] = [[x, 0]]; //运行时栈
    while (stack.length) {
      const [x, vis] = stack[stack.length - 1]; //vis用来标记访问过几个邻接节点

      //出栈条件：当邻接节点访问完毕的时候，可以出栈
      const case1 = x === 0 && vis === 1; //当x == 0时，需要访问的邻接节点的个数为1
      const case2 = x !== 0 && vis === 2; //当x != 0时，需要访问的邻接节点的个数为2

      //case1：扩展入栈 → 先序传值
      if (!case1 && !case2) {
        const next = x === 0 ? 2 : x + vis + 1;
        stack[stack.length - 1][1]++; //代表扩展节点 + 1
        if (next > n) continue; //next
        inDeg[next]--;
        dp[next] += dp[x];
        if (inDeg[next] === 0) stack.push([next, 0]);
      }

      //case2：结束出栈 → 后序传值 → 出栈后将该值传递给栈顶节点
      else stack.pop();
    }
  };
  for (let x of begin) dfs(x);
  return dp[n];
}
