// 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。
// 在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，
// 其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。
// 例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
// 请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。

// 输入：numCourses = 2, prerequisites = [[1,0]]

export function canFinish(n: number, edges: number[][]): boolean {
  // 1. 建有向图：二维邻接表 & 统计节点入度
  const graph: number[][] = new Array(n + 1).fill(null).map(row => new Array());
  const inDeg: number[] = new Array(n + 1).fill(0);

  for (let [x, y] of edges) {
    graph[y].push(x); // y->x, graph[y]向x扩展
    inDeg[x]++;
  }

  // 2. 出发点：将入度为0的节点push进去 // queue初始化
  const queue: number[] = [];
  for (let i = 0; i < n; i++) {
    if (inDeg[i] === 0) {
      queue.push(i);
    }
  }

  // 3. bfs开始扩展，当入度为0的节点才能push，且统计出队的节点的个数 outCount
  let outCount = 0;
  while (queue.length) {
    const x = queue.shift();
    outCount++;

    // 找到x的依赖集合
    const nexts = graph[x];
    for (let next of nexts) {
      inDeg[next]--;
      if (inDeg[next] === 0) {
        queue.push(next);
      }
    }
  }

  // 4. return 是否所有节点能够出队
  return outCount === n;
}
