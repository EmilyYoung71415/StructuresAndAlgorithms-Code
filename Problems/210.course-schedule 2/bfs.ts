// 优化内存空间: 省去graph
function findOrder(n: number, edges: number[][]): number[] {
  const inDeg: number[] = new Array(n).fill(0);
  // const dp: number[] = [];
  const queue: number[] = [];

  // 统计入度
  for (let [x, y] of edges) {
    // edges: x依赖y
    inDeg[x]++;
  }

  // 初始化队列: 将入度为0的节点入队
  inDeg.forEach((val, index) => {
    if (val === 0) {
      queue.push(index);
    }
  });

  // 根据提供的先修课列表，删除入度为 0 的节点
  const dp: number[] = [];

  while (queue.length) {
    const x = queue.shift();
    dp.push(x); // 队列里的都是 入度为0的节点相当于直接学

    for (let [x1, y1] of edges) {
      // x1依赖y1， 找y1(x)的扩展点
      if (y1 === x) {
        inDeg[x1]--;
        if (inDeg[x1] === 0) {
          queue.push(x1);
        }
      }
    }
  }

  if (dp.length === n) return dp;

  return [];
}

function findOrder2(n: number, edges: number[][]): number[] {
  const graph: number[][] = new Array(n).fill(0).map(_ => []);
  const inDeg: number[] = new Array(n).fill(0);
  // const dp: number[] = [];
  const queue: number[] = [];

  // 统计入度
  for (let [x, y] of edges) {
    // edges: x依赖y
    graph[y].push(x); // y的扩展：x
    inDeg[x]++;
  }

  // 初始化队列: 将入度为0的节点入队
  inDeg.forEach((val, index) => {
    if (val === 0) {
      queue.push(index);
    }
  });

  // 根据提供的先修课列表，删除入度为 0 的节点
  const dp: number[] = [];

  while (queue.length) {
    const x = queue.shift();
    dp.push(x); // 队列里的都是 入度为0的节点相当于直接学

    for (let next of graph[x]) {
      inDeg[next]--;
      if (inDeg[next] === 0) {
        queue.push(next);
      }
    }
  }

  if (dp.length === n) return dp;

  return [];
}
