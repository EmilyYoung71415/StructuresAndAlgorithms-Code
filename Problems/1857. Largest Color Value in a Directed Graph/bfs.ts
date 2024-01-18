export function largestPathValue(colors: string, edges: number[][]): number {
  // 1. 构建 graph
  const nodeCount = colors.length;
  const graph = new Array(nodeCount).fill(0).map(node => new Array());
  const inDeg = new Array(nodeCount).fill(0);

  for (const [x, y] of edges) {
    // x->y， x到y有路径
    graph[x].push(y);
    inDeg[y]++;
  }

  // 2.出发点：入度为0的节点
  // const begins = inDeg.filter(val => val === 0); // 这是不对的. begins里面保存node节点, 而不是inDegValue
  const begins: number[] = [];
  inDeg.forEach((val, nodeIndex) => {
    if (val === 0) {
      begins.push(nodeIndex);
    }
  });

  let maxColorCount = 0;
  const colorsUnique = [...new Set(colors)]; // 每次只处理一个颜色
  // 图，找路径
  const bfs = (color: string, _inDeg: number[]): number => {
    const dp = new Array(nodeCount).fill(0);
    // 初始化dp： 入度为0的节点，如果是当前颜色就1，其余的是0
    for (let x of begins) {
      if (colors[x] === color) {
        dp[x] = 1; // 边界状态
      }
    }

    // 开始对graph做遍历，顺便统计是否有环路
    let queue = begins;
    let outNum = 0; // 出队个数

    while (queue.length) {
      const nextLevelQueue: number[] = [];
      outNum += queue.length;

      for (let x of queue) {
        // 从root节点开始遍历
        for (let next of graph[x]) {
          _inDeg[next]--;

          if (_inDeg[next] === 0) {
            nextLevelQueue.push(next);
          }

          // 递推公式
          // 最长路径
          dp[next] = Math.max(dp[next], dp[x] + (colors[next] === color ? 1 : 0));
        }
      }

      queue = nextLevelQueue;
    }

    if (outNum !== nodeCount) return -1; // 节点没有全部出队

    return Math.max(...dp);
  };

  for (let color of colorsUnique) {
    //  const ans = topo_bfs(_color, graph, inDeg.slice(), queue.slice(), colors);
    const pathColorCount = bfs(color, inDeg.slice());
    if (pathColorCount === -1) return -1;
    maxColorCount = Math.max(pathColorCount, maxColorCount);
  }

  return maxColorCount;
}
