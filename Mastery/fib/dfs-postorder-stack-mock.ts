// export function fib(n: number) {
//   const dp = [0, 1];

//   const dfs = (i: number) => {
//     if (dp[i] !== undefined) return dp[i]; // 重叠优化
//     dp[i] = dfs(i - 1) + dfs(i - 2);
//     return dp[i];
//   };

//   return dfs(n);
// }

export function fib(n: number) {
  const dp = [0, 1];
  const dfs = i => {
    const stack = [[i, 0]]; //代表代码扩展了几次，可以用来推断目前执行到哪一行
    const returnVal = [];
    while (stack.length) {
      //执行栈顶的函数
      const [i, vis] = stack[stack.length - 1];

      //执行到if(dp[i] !== undefined)
      if (dp[i] !== undefined) {
        stack.pop();
        returnVal[i] = dp[i];
      }

      //执行到dfs(i-1)
      else if (vis == 0) {
        stack[stack.length - 1][1]++;
        stack.push([i - 1, 0]);
      }

      //执行到dfs(i-2)
      else if (vis == 1) {
        stack[stack.length - 1][1]++;
        stack.push([i - 2, 0]);
      } else if (vis == 2) {
        stack.pop();
        dp[i] = returnVal[i - 1] + returnVal[i - 2];
        returnVal[i] = dp[i];
      }
    }
  };
  dfs(n);
  return dp[n];
}
