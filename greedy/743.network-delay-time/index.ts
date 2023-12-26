import { PriorityQueue } from '@utils';

// n个节点，从k出发到所有节点，到每个节点的最短路径里，找到最长的那个，即最短使所有节点都收到信号
export function networkDelayTime(edges: number[][], n: number, k: number): number {
  // 1.建图
  const graph: Array<[number, number][]> = new Array(n + 1).fill(0).map(() => []);
  // x到y 距离z
  for (const [x, y, z] of edges) {
    graph[x].push([y, z]);
  }

  // 2.dijk 路径短的在前面，优先级更高
  const pq = new PriorityQueue<[number, number]>((a, b) => a[0] < b[0]);
  const dist: number[] = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  pq.push([0, k]); // [distanceFromNodeToK, node]

  while (pq.size) {
    // x到k的距离
    const [dis_kx, x] = pq.shift();
    if (dis_kx > dist[x]) continue;

    // 扩展
    for (const [y, dis_xy] of graph[x]) {
      const nextDis = dis_kx + dis_xy;
      // 经过x由k到y的距离 > dis[y]
      if (nextDis >= dist[y]) continue;
      // 入队
      dist[y] = nextDis;
      pq.push([nextDis, y]);
    }
  }

  const res = Math.max(...dist.slice(1, n + 1));

  return res === Infinity ? -1 : res;
}
