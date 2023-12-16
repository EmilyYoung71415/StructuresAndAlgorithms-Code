import { Heap } from '@utils';
// times[i] = (ui, vi, wi) // 源节点, 目标节点， 信号从源节点到目标节点需要的时间
// n: n个点
// k: 从点k出发
function networkDelayTime(times: number[][], n: number, k: number): number {
  // 1. 建图
  // graph[x] = [y, z][] //  从节点 x 到节点 y 有一个权重为 z 的边
  const graph: number[][][] = new Array(n + 1).fill(Infinity).map(() => new Array());
  for (const [x, y, z] of times) {
    graph[x].push([y, z]);
  }

  // 2. 迪斯 优先队列
  // [minDist, target]  从源点到目标点，最短路径。
  // 优先队列里是根据元素 arr[0]进行排序的，所以先放dist
  const pQueue = new Heap<[number, number]>((a, b) => a[0] < b[0]); // 路径短的在前面

  // begin：自身到自身 最近 0，加入优先队列
  // 从优先队列出发，距离最小的节点开始拉取节点，被拉到的节点加入队列
  const dist = new Array(n + 1).fill(Infinity);
  // 自身
  dist[k] = 0; // dist存 节点到k的距离
  pQueue.push([0, k]);

  while (pQueue.size) {
    // 1. 出队
    const data = pQueue.shift();
    // if (!data) continue;
    const [dist_kx, x] = data;
    if (dist_kx > dist[x]) continue;

    // 2. 扩展
    for (let [y, dist_xy] of graph[x]) {
      const dist_ky = dist_kx + dist_xy;
      if (dist_ky >= dist[y]) {
        // 3. 入队
        dist[y] = dist_ky;
        pQueue.push([dist_ky, y]);
      }
    }
  }

  // 1开始计数
  const res = Math.max(...dist.slice(1, n + 1));
  return res === Infinity ? -1 : res;
}
