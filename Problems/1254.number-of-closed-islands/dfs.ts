export function closedIsland(grid: number[][]): number {
  const rowsLen = grid.length;
  const colsLen = grid[0].length;

  const dir: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  // 返回是否是封闭岛
  const dfs = (row: number, col: number): boolean => {
    const isInBound = 0 <= row && row < rowsLen && 0 <= col && col < colsLen;
    if (!isInBound) {
      return false;
    }

    if (grid[row][col] !== 0) {
      return true;
    }

    grid[row][col] = -1;

    // const isCloseLandFlags: boolean[] = [];
    let allDirectionsTrue = true;
    for (let [dx, dy] of dir) {
      const nextRow = row + dx;
      const nextCol = col + dy;
      const _isCloseLand = dfs(nextRow, nextCol);
      if (!_isCloseLand) {
        // 一旦有一个就立马置为false
        allDirectionsTrue = false;
      }
      // isCloseLandFlags.push(_isCloseLand);
    }

    return allDirectionsTrue;
    // return isCloseLandFlags.every(flag => flag);
  };

  let closeCount = 0;
  for (let i = 0; i < rowsLen; i++) {
    for (let j = 0; j < colsLen; j++) {
      if (grid[i][j] === 0 && dfs(i, j)) {
        closeCount++;
      }
    }
  }

  return closeCount;
}
