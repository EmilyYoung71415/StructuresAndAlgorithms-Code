/**
 * leetcode:200
 * 
 * 给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量
 * 水平方向或垂直方向的1 视为陆地互相联通，斜线上的1不视为连通
 * 
 * exp:
 *  11110       11000
    11010       11000
    11000       00100          
    00000       00011
 *   
 *  out:1       out:3   
 * 
 */

/*****
 * 思路:
 * way1:遍历矩阵，将不同的元素丢到相应集合的问题。[并查集]
 * 初始化:遍历第一行，第一个为1的为一个集合，
 *       之后的元素如果和其prev元素都为1则是在一个集合
 *       第一列 也可以在初始化的时候 确定
 *       集合的key 是 集合的root在矩阵的下标
 * 遍历每个元素 确定是否合并:
 *       先判断 左方元素;再判断 上方元素
 *
 * way2:染色问题
 * 遍历棋盘，如果是1 则不断扩散，将1周围的所有1给染色(将1 置为 0)-递归的过程
 * 这遇到一次染色， count++
 * 递归方法：
 * DFS
 * BFS
 */
// 这个应该是1 而不是2
const grid1 = [
  ['1', '0', '1', '1', '1'],
  ['1', '0', '1', '0', '1'],
  ['1', '1', '1', '0', '1'],
];

// 错误过的例子
// 因为新出现元素 我是尝试 合并它的左边 和 上边元素
// ==> 改变遍历方式，蛇形走位? 一直到矩阵当前集合的元素边界确定
//     但是没遍历到的元素 怎么捕捉
/**
 * ====> [改进1] 之前是碰到左边、上边为1的元素就合并。
 * 现在，上下左右 都合并一次。
 *      每次合并的时候  不仅 将当前元素的 parent指向 taget集合root
 *                     还需要将 本元素集合里的元素 扁平化 使其也指向root
 *
 * ===> 还是不行，校正 的过程有问题，无法保证之前走过的节点 在之后的校正里会遇到
 * =====>[改进2] 初始化 每个1都是一座孤岛，一个集合，一个共x个集合
 *        再次遍历的时候，只要当前岛可以合并，那么集合总数--
 */
const grid2 = [
  ['1', '1', '1'],
  ['0', '1', '0'],
  ['1', '1', '1'],
];

const grid3 = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
];

console.log(numIslands(grid3));
// 还是会出错，grid2对了 但是grid1又错了。这个方法 和 先怎么走有关
// ❌改进1
function numIslands1(grid) {
  if (grid == null || grid.length < 1 || grid[0].length < 1) {
    return 0;
  }
  let fatherMap = {};
  const rowLen = grid.length,
    colLen = grid[0].length;
  // 遍历第一行 初始化
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (grid[i][j] == '1') {
        let index = i + '-' + j;
        fatherMap[index] = index;
        // 将当前元素 与 周围元素可以为一个集合的 合并成一个集合
        !(i == 0 && j == 0) && getUnion(i, j, index);
      }
    }
  }
  return getCount(fatherMap);

  function getUnion(i, j, key) {
    // 上 左 右 下
    const dy = [0, -1, 1, 0],
      dx = [-1, 0, 0, 1];
    for (let k = 0; k < 4; k++) {
      let x = i + dx[k],
        y = j + dy[k],
        newIndex = x + '-' + y;
      if (x >= 0 && x < rowLen && y >= 0 && y < colLen && grid[x][y] == '1') {
        // 当前元素的parent指向 新集合的root
        let root = findRoot(newIndex);
        fatherMap[key] = root;
        flattenMap(key, root); // 将key为父的节点的parent都指向newIndex
        break;
      }
    }
  }
  // index元素所在集合的root
  function findRoot(index) {
    let parent = fatherMap[index] || index; // 还没存入fatherMap即认为是自己
    if (parent !== index) {
      parent = findRoot(parent);
    }
    return parent;
  }

  function flattenMap(prevParent, root) {
    for (let k in fatherMap) {
      if (fatherMap[k] == prevParent) {
        fatherMap[k] = root;
      }
    }
  }

  function getCount(fatherMap) {
    let arr = Object.values(fatherMap);
    return [...new Set(arr)].length;
  }
}

// 改进2
function numIslands2(grid) {
  if (grid == null || grid.length < 1 || grid[0].length < 1) {
    return 0;
  }
  const rowLen = grid.length,
    colLen = grid[0].length;
  const dx = [-1, 1, 0, 0],
    dy = [0, 0, -1, 1];
  let fatherMap = {},
    count = 0;

  // 初始化
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (grid[i][j] != '1') continue;
      let index = i + '-' + j;
      // makeset
      fatherMap[index] = index;
      count++;
    }
  }
  // 再次遍历 合并集合
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (grid[i][j] != '1') continue;
      for (let k = 0; k < 4; k++) {
        // 当前元素周围的元素都尝试是否可以合并
        let x = i + dx[k],
          y = j + dy[k];
        if (x >= 0 && y >= 0 && x < rowLen && y < colLen && grid[x][y] == '1') {
          getUnion(x + '-' + y, i + '-' + j);
        }
      }
    }
  }
  return count;
  function getUnion(keyX, keyY) {
    if (keyX == null || keyY == null) {
      return;
    }

    let rootX = findRoot(keyX);
    let rootY = findRoot(keyY);
    // 可合并
    if (rootX != rootY) {
      fatherMap[rootX] = rootY;
      count--;
    }
  }

  function findRoot(x) {
    let parent = fatherMap[x];
    if (parent !== x) {
      parent = findRoot(parent);
    }
    return parent;
  }
}

/***
 * way2:染色
 * 以当前点位扩散，找集合，同时维护一个记录已访问节点的map(也可以将1改为0)
 * DFS
 * bfs
 */

function numIslands_DBFS(grid) {
  if (grid == null || grid.length < 1 || grid[0].length < 1) {
    return 0;
  }

  const rowLen = grid.length,
    colLen = grid[0].length,
    dx = [-1, 1, 0, 0],
    dy = [0, 0, -1, 1];
  let visited = new Map(), //以元素的坐标为key
    count = 0;

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      count += Dfs(i, j); // 以当前元素 深度优先遍历 扩散找集合点
      // count += Bfs(i,j);
    }
  }
  return count;
  // 深度优先扩散：递归的向四周扩散
  function Dfs(i, j) {
    if (!isValid(i, j)) {
      return 0;
    }
    let key = i + '-' + j;
    visited.set(key, 1);
    for (let k = 0; k < 4; k++) {
      let x = i + dx[k],
        y = j + dy[k];
      Dfs(x, y);
    }
    return 1;
  }

  // 广度优先扩散:
  // 把相邻节点放在队列里，队列弹出一个节点，又将其节点的相邻节点放入queue
  function Bfs(i, j) {
    if (!isValid(i, j)) {
      return 0;
    }
    let key = i + '-' + j;
    visited.set(key, 1);
    let queue = [[i, j]]; //存放待访问的 扩散到的为1的点

    while (queue.length) {
      const [x, y] = queue.shift();
      for (let k = 0; k < 4; k++) {
        let new_x = x + dx[k],
          new_y = y + dy[k];
        if (isValid(new_x, new_y)) {
          let new_key = new_x + '-' + new_y;
          visited.set(new_key, 1);
          queue.push([new_x, new_y]);
        }
      }
    }
    return 1;
  }

  function isValid(x, y) {
    let key = x + '-' + y;
    if (x < 0 || x >= rowLen || y < 0 || y >= colLen) {
      return false;
    }
    if (grid[x][y] == '0' || visited.get(key)) {
      return false;
    }
    return true;
  }
}

// 精简版
function numIslands(grid) {
  if (grid == null || grid.length < 1 || grid[0].length < 1) {
    return 0;
  }
  let count = 0,
    rowLen = grid.length,
    colLen = grid[0].length;
  const dx = [-1, 1, 0, 0],
    dy = [0, 0, -1, 1];
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (grid[i][j] == '1') {
        count += dfs(i, j);
      }
    }
  }
  return count;

  function dfs(i, j) {
    if (i < 0 || i >= rowLen || j < 0 || j >= colLen || grid[i][j] == '0') {
      return 0;
    }
    grid[i][j] = '0'; // visited的作用
    for (let k = 0; k < 4; k++) {
      let x = i + dx[k],
        y = j + dy[k];
      dfs(x, y);
    }
    return 1;
  }
}
