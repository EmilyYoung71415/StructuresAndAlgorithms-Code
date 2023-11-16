// 如果是岛屿，则 删除岛屿节点，并加入队列，
// 并以该岛屿节点上下左右 扩散，扩散的节点都加入 队列 开始进行广度优先搜索
// 时间复杂度：O(MN)，其中 M 和 N 分别为行数和列数。
// 空间复杂度：O(min⁡(M,N))，在最坏情况下，整个网格均为陆地

// BFS 像树一样扩散, 怎么判断1围起来的岛屿到了临界点呢?
export function numIslands(grid: string[][]): number {
  const rowsLen = grid.length;
  const colsLen = grid[0].length;

  const dir: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const bfs = (i: number, j: number) => {
    const queue: [number, number][] = [[i, j]];

    while (queue.length) {
      const [curRow, curCol] = queue.shift();

      // 如果当前节点是岛屿： 在边界线内 且 =1，则开始向四周扩散 并 感染周围的岛屿都为0
      const isInBound = 0 <= curRow && curRow < rowsLen && 0 <= curCol && curCol < colsLen;
      const isLand = isInBound && grid[curRow][curCol] === '1';

      if (isLand) {
        grid[curRow][curCol] = '0';
        for (let [dx, dy] of dir) {
          const nextRow = curRow + dx;
          const nextCol = curCol + dy;
          queue.push([nextRow, nextCol]);
        }
      }
    }
  };

  let count = 0;
  for (let i = 0; i < rowsLen; i++) {
    for (let j = 0; j < colsLen; j++) {
      if (grid[i][j] === '1') {
        bfs(i, j); // 一次扩散为一次"BFS树"，即一个岛屿
        count++;
      }
    }
  }

  return count;
}
