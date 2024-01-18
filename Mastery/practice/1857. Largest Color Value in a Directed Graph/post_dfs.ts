// 请参考207.课程表中DFS的实现，然后用DFS后序实现本题目，注意把课程表的后序DFS的visited的部分改成递推公式即可~

// 1. path：先序*邻接
// 2. memo：后序*邻接
// 3. 要点1：path的true和false是在做回溯，之间不允许break， continue，return！ ！
// 4. 要点2：path的无效判断一定要在memo重叠之前，否则memo重叠判断没有任何意义，因为自己返回了自己初始的赋值，不被允许！！！

export function largestPathValue(colors: string, edges: number[][]) {
  //1、建图
  const nodeCount = colors.length;
  const graph = new Array(nodeCount).fill(0).map(() => new Array());
  for (let [x, y] of edges) {
    graph[x].push(y);
    // graph[y].push(x);
  }

  //2、遍历
  let maxColorCount = 0;
  const colorsUnique = [...new Set(colors)]; // 对每个color进行查找

  const getMaxPathCountByColor = (color: string): number => {
    let hasCycle = false;
    const path = new Array(nodeCount).fill(false); // 回溯
    const memo: (number | null)[] = new Array(nodeCount).fill(null); // dp结果值的缓存

    const dfs = (cur: number): void => {
      if (path[cur]) {
        hasCycle = true;
        return;
      }

      if (memo[cur] !== null) return;

      path[cur] = true;
      memo[cur] = colors[cur] === color ? 1 : 0;

      for (let next of graph[cur]) {
        dfs(next);
        // 后序*邻接
        // 递推公式
        // memo[next] = Math.max(memo[next], memo[cur] + (colors[next] === color ? 1 : 0));这是错的，当先序处理了
        // 当dfs归的时候，DAG是反向访问的
        memo[cur] = Math.max(memo[cur], memo[next] + (colors[cur] === color ? 1 : 0));
      }

      path[cur] = false;
    };

    // 出发点：每个节点
    for (let i = 0; i < nodeCount; i++) {
      dfs(i);
      if (hasCycle) return -1;
    }

    return Math.max(...memo);
  };

  for (let color of colorsUnique) {
    const pathColorCount = getMaxPathCountByColor(color);
    if (pathColorCount === -1) return -1;
    maxColorCount = Math.max(maxColorCount, pathColorCount);
  }

  return maxColorCount;
}
