export function orangesRotting(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  let fresh = 0;
  let queue: [number, number][] = [];
  // 统计有多少新鲜的橘子，并且将腐烂的句子入队
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const orange = grid[i][j];
      if (orange === 2) {
        queue.push([i, j]);
        grid[i][j] = 0; // 访问标记 表示删除节点
      } else if (orange === 1) {
        fresh++;
      }
    }
  }

  // case1: 没有新鲜橘子
  if (fresh === 0) return 0;

  // case2.1 腐烂橘子能让矩阵全部腐烂
  let time = 0;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  while (queue.length) {
    if (fresh === 0) return time;
    const next: [number, number][] = [];
    for (let [i, j] of queue) {
      for (let [dx, dy] of directions) {
        const r = i + dx;
        const c = j + dy;
        if (r < 0 || c < 0 || r >= m || c >= n) continue;
        if (grid[r][c] === 0) continue;
        grid[r][c] = 0;
        fresh--;
        next.push([r, c]);
      }
    }
    // 下一层
    time++;
    queue = next;
  }

  // case2.2 腐烂橘子不能让全部腐烂
  return -1;
}
