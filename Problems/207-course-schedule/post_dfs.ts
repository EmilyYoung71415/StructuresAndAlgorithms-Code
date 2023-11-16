export function canFinish(n: number, edges: number[][]): boolean {
  //1、建图 邻接矩阵-有向图
  const graph = new Array(n).fill(0).map(() => new Array());

  for (let [x, y] of edges) {
    //注意拓扑排序是 y → x
    graph[y].push(x);
  }

  //2、深搜
  let hasCycle = false;
  const path: boolean[] = new Array(n).fill(false); // 判圈剪枝：正在进行
  const memo: boolean[] = new Array(n).fill(false); // 访问剪枝：已经结束 → 有时候访问剪枝需要携带访问完毕的返回结果
  // const topo = [];

  function dfs(x: number): void {
    if (hasCycle) return; //直接结束

    //在dfs(x)还没结束的时候又来了一个dfs(x),代表有圈
    if (path[x]) {
      hasCycle = true;
      return;
    }

    //判重：dfs(x)已经完成，不用再做一次
    if (memo[x]) return; //代表dfs(x)已经发生过一次，不用再来一次了

    //判圈：dfs(x)还未完成，又来了一次dfs(x)
    //5 6 1 2 3

    path[x] = true; // 等价于path.push(x) → 回溯的思想

    for (let next of graph[x]) {
      dfs(next); //这里可以嵌入各种递推公式
    }

    path[x] = false; // 等价于path.pop()   → 回溯的思想

    memo[x] = true; // 缓存思想：代表从该节点出发的后序结点全部访问完毕，注意这里可以做记忆化

    // topo.push(x);
  }

  //出发点：直接遍历所有点
  for (let i = 0; i < n; i++) {
    dfs(i);
  }

  return !hasCycle;
}
