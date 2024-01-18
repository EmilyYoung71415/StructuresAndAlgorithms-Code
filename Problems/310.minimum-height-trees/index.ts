export function findMinHeightTrees(n: number, edges: number[][]): number[] {
  const queue: number[] = []; // 出度为1的节点
  const graph: number[][] = new Array(n).fill(null).map(row => new Array());
  const outDeg: number[] = new Array(n).fill(0); //[];
  let result: number[] = [];

  // 无向图
  edges.forEach(edge => {
    const [x, y] = edge;
    outDeg[y]++;
    outDeg[x]++;
    graph[x].push(y);
    graph[y].push(x);
  });

  outDeg.forEach((outDegCount, node) => {
    if (outDegCount === 1) {
      queue.push(node);
    }
  });

  while (queue.length) {
    let levelSize = queue.length;
    result = []; // 每次循环都new 一个集合

    while (levelSize--) {
      const node = queue.shift();
      result.push(node); // 得到BFS树最后一层的节点
      const nexts = graph[node];

      for (let next of nexts) {
        outDeg[next]--;

        if (outDeg[next] === 1) {
          queue.push(next);
        }
      }
    }
  }

  return result;
}
