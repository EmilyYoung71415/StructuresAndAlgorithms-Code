// 请参考207.课程表中DFS的实现，然后用DFS后序实现本题目，注意把课程表的后序DFS的visited的部分改成递推公式即可~

// 1. path：先序*邻接
// 2. memo：后序*邻接
// 3. 要点1：path的true和false是在做回溯，之间不允许break， continue，return！ ！
// 4. 要点2：path的无效判断一定要在memo重叠之前，否则memo重叠判断没有任何意义，因为自己返回了自己初始的赋值，不被允许！！！

function largestPathValue(colors, edges) {
  //1、建图
  const n = colors.length;
  const graph = new Array(n).fill(0).map(() => new Array());
  for (let [x, y] of edges) {
    graph[y].push(x);
  }

  //2、遍历
  let res = 0;

  const colorsUnique = [...new Set(colors)]; // 对每个color进行查找

  for (let i = 0; i < colorsUnique.length; i++) {
    const ans = doDFS(colorsUnique[i], graph, colors);
    if (ans === -1) return -1;
    res = Math.max(res, ans);
  }

  return res;
}

function doDFS(color, graph, colors) {
  const n = colors.length;
  const memo = new Array(n);
  const path = new Array(n).fill(false);

  let cycle = false;

  const dfs = y => {
    if (path[y]) return (cycle = true);
    if (memo[y] !== undefined) return memo[y];
    path[y] = true;
    memo[y] = colors[y] === color ? 1 : 0;
    for (let x of graph[y]) {
      dfs(x);
      memo[y] = Math.max(memo[y], memo[x] + (colors[y] === color));
    }
    path[y] = false;
  };

  for (let i = 0; i < n; i++) {
    dfs(i);
    if (cycle) return -1; //有环路
  }

  return Math.max(...memo);
}
