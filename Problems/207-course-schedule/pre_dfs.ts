export function canFinish(n: number, edges: number[][]): boolean {
  //1、建图 邻接表-有向图
  const graph: number[][] = new Array(n).fill(0).map(() => new Array());
  const inDeg: number[] = new Array(n).fill(0);
  for (let [x, y] of edges) {
    graph[y].push(x); //y → x
    inDeg[x]++;
  }

  //2、起点
  const begin: number[] = [];

  for (let i = 0; i < n; i++) {
    if (inDeg[i] === 0) {
      begin.push(i);
    }
  }

  let outCount = 0;

  const dfs = (x: number) => {
    if (x === n) return;
    outCount++;
    const nexts = graph[x];
    for (let next of nexts) {
      if (--inDeg[next] === 0) {
        dfs(next);
      }
    }
  };

  for (let y of begin) {
    dfs(y);
  }

  return outCount === n;
}
