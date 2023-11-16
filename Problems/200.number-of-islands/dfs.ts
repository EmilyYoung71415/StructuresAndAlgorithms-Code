// 时间复杂度: O(M * N)
// 空间复杂度: O(M * N) // 栈深度
export function numIslands(grid: string[][]): number {
  // dfs(i, j);
  // 临界点: 非岛屿点 or 越界 = (i,j)越界 || grid[i][j] === 0;
  // 递推: 从当前岛屿点向四周扩散，每访问一个岛屿点就删除岛屿节点，避免重复扩散
  // 如何解决多个岛屿判断问题的? 主循环里遍历，决定dfs的起点
  const rowsLen = grid.length;
  const colsLen = grid[0].length;

  const dir: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const dfs = (row: number, col: number) => {
    const isInBound = 0 <= row && row < rowsLen && 0 <= col && col < colsLen;
    if (!isInBound || grid[row][col] === '0') {
      return;
    }

    grid[row][col] = '0';

    for (let [dx, dy] of dir) {
      const nextRow = row + dx;
      const nextCol = col + dy;
      dfs(nextRow, nextCol);
    }
  };

  let count = 0;
  for (let i = 0; i < rowsLen; i++) {
    for (let j = 0; j < colsLen; j++) {
      if (grid[i][j] === '1') {
        dfs(i, j);
        count++;
      }
    }
  }

  return count;
}
