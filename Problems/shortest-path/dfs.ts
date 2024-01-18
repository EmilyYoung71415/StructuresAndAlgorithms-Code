export function shortestPath(matrix: number[][], start: [number, number], end: [number, number]) {
  const rowsLen = matrix.length;
  const colsLen = matrix[0].length;
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;
  const visited: boolean[][] = new Array(rowsLen)
    .fill(null)
    .map(row => new Array(colsLen).fill(false));

  let shortestPath = Infinity;
  const dir: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  // 1. pathLen: 前序传参，配合全局变量shortestPath求出最短路径
  // 2. visited变量回溯
  const dfs = (curRow: number, curCol: number, pathLen: number) => {
    if (curRow === endRow && curCol === endCol) {
      shortestPath = Math.min(shortestPath, pathLen);
      return;
    }

    visited[curRow][curCol] = true;

    // 扩展
    for (let [dx, dy] of dir) {
      const nextRow = curRow + dx;
      const nextCol = curCol + dy;

      const isInBoundary = nextRow >= 0 && nextRow < rowsLen && nextCol >= 0 && nextCol < colsLen;
      if (isInBoundary && matrix[nextRow][nextCol] === 0 && !visited[nextRow][nextCol]) {
        dfs(nextRow, nextCol, pathLen + 1);
      }
    }

    visited[curRow][curCol] = false;
  };

  dfs(startRow, startCol, 0);

  return shortestPath === Infinity ? -1 : shortestPath;
}
