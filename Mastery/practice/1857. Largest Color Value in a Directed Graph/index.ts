export function largestPathValue(colors: string, edges: number[][]): number {
  // 开始遍历，分别得到三种颜色的各自最大值
  const n = colors.length;
  const graph: number[][] = new Array(n + 1).fill(null).map(row => new Array());
  const inDeg: number[] = new Array(n + 1).fill(0);

  edges.forEach(edge => {
    // [0,1] 0->1
    const [x, y] = edge;
    inDeg[y]++;
    graph[x].push(y);
  });

  const queue: number[] = [];
  for (let i = 0; i < n; i++) {
    if (inDeg[i] === 0) {
      queue.push(i);
    }
  }

  let maxColorCount = 0;
  const colorsUnique = [...new Set(colors)]; // 对每个color进行查找

  // for (let i = 0; i < 26; i++) {
  for (let i = 0; i < colorsUnique.length; i++) {
    const _color = colorsUnique[i]; //String.fromCharCode(97 + i); // 对每个字母进行拓扑排序？
    // const _color = String.fromCharCode(97 + i); // 对每个字母进行拓扑排序？
    const ans = topo_bfs(_color, graph, inDeg.slice(), queue.slice(), colors);

    if (ans === -1) return -1;

    maxColorCount = Math.max(maxColorCount, ans);
  }

  return maxColorCount;
}

function topo_bfs(
  color: string,
  graph: number[][],
  inDeg: number[],
  queue: number[],
  colors: string,
): number {
  const n = colors.length;
  // const dp = new Array(n + 1).fill(0); // 到节点x的全部路径中，”最大颜色值“路径 里该节点对应的最大颜色值？
  const dp = new Array(n).fill(0); // 到节点x的全部路径中，”最大颜色值“路径 里该节点对应的最大颜色值？

  for (let x of queue) {
    if (colors[x] === color) {
      dp[x] = 1; // 边界状态， 入度为0的节点
    }
  }

  let outQueueCount = 0;

  while (queue.length) {
    const nextQueue: number[] = [];
    outQueueCount += queue.length;

    for (let cur of queue) {
      const nexts = graph[cur];
      for (let next of nexts) {
        if (--inDeg[next] === 0) {
          nextQueue.push(next);

          // ❌ 递推写在外面
        }
        // 递推公式
        dp[next] = Math.max(dp[next], dp[cur] + (colors[next] === color ? 1 : 0));
      }
    }

    queue = nextQueue;
  }

  if (outQueueCount !== n) return -1;

  return Math.max(...dp);
}
