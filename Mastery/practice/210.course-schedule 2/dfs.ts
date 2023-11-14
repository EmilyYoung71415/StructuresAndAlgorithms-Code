function findOrder(n: number, edges: number[][]): number[] {
  const graph: number[][] = new Array(n).fill(0).map(_ => []);
  let hasCycle = false;
  const dp: number[] = [];
  // 访问状态：0-未访问，1-访问中，2-已访问
  const visited: number[] = new Array(n).fill(0);

  // 统计入度
  for (let [course, pre] of edges) {
    // edges: x依赖y
    graph[pre].push(course); // y的扩展：x
  }

  // 返回是否存在环
  const dfs = (x: number): void => {
    if (visited[x] === 1) {
      hasCycle = true;
      return;
    }

    if (visited[x] === 2) return;

    visited[x] = 1;

    for (let next of graph[x]) {
      if (hasCycle) return;
      dfs(next);
    }

    visited[x] = 2;
    dp.push(x); // 后序
  };

  for (let i = 0; i < n; i++) {
    if (!hasCycle && visited[i] === 0) {
      dfs(i);
    }
  }

  if (hasCycle) return [];

  return dp.reverse();
}
