export function shortestPath(matrix: number[][], start: [number, number], end: [number, number]) {
  const rowsLen = matrix.length;
  const colsLen = matrix[0].length;
  const queue: [number, number][] = [start]; // curRow, curCol
  const visited: boolean[][] = new Array(rowsLen)
    .fill(null)
    .map(row => new Array(colsLen).fill(false));

  const dir: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;
  visited[startRow][startCol] = true;

  let resPathLen = 0;

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [curRow, curCol] = queue.shift();
      if (curRow === endRow && curCol === endCol) {
        // break; // for循环里break是break第一层，外面的while不能break出去
        return resPathLen;
      }

      for (let [dx, dy] of dir) {
        const nextRow = curRow + dx;
        const nextCol = curCol + dy;

        const isInBoundary = nextRow >= 0 && nextRow < rowsLen && nextCol >= 0 && nextCol < colsLen;

        if (isInBoundary && matrix[nextRow][nextCol] === 0 && !visited[nextRow][nextCol]) {
          queue.push([nextRow, nextCol]);
          visited[nextRow][nextCol] = true;
        }
      }
    }

    resPathLen++; // 按层
  }

  // return resPathLen === 0 ? -1 : resPathLen;
  return -1;
}
