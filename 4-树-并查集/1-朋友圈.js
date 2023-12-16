/***
 * leetcode:547
 * 友谊具有是传递性。
 * 如果已知 A 是 B 的朋友，B 是 C 的朋友，那么我们可以认为 A 也是 C 的朋友
 * exp:
 * 
 * [[1,1,0],
    [1,1,0],
    [0,0,1]] out:2

    注意:
    N 在[1,200]的范围内。
    对于所有学生，有M[i][i] = 1。
    如果有M[i][j] = 1，则有M[j][i] = 1。
    ===> 沿 \ 对角线 对称
 * 
 */

/*****
 * 岛屿个数: 横竖临近都是1 即为一个集合
 *           走向是 以当前元素 上下左右 方向
 * 朋友圈:
 *     因为 m[i][i] 表示自己认识自己
 *     深度优先遍历: 横着拉通，表示当前人认识的所有朋友，
 *                  认识了(i,j) 则从(j,0...n)开始抹平0
 *
 *
 * 有两种解决方式 1.染色 2.集合
 *
 *
 */
// 这个输出为1
const m = [
  [1, 0, 0, 1],
  [0, 1, 1, 0],
  [0, 1, 1, 1],
  [1, 0, 1, 1],
];

const m2 = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
];

console.log(findCircleNum(m));
// 染色
function findCircleNum(m) {
  if (m == null || m.length < 1 || m[0].length < 1) {
    return 0;
  }

  const rowLen = m.length,
    colLen = m[0].length;
  let count = 0;

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (m[i][j] == 1) {
        // 以当前点扩散遍历得到 该集合
        count += dfs(i, j);
      }
    }
  }
  return count;

  function dfs(i, j) {
    if (i < 0 || j < 0 || i >= rowLen || j >= colLen || m[i][j] == 0) {
      return 0;
    }
    m[i][j] = m[j][i] = 0; // 置为已访问
    // 横着遍历 朋友的所有朋友
    for (let k = 0; k < colLen; k++) {
      if (m[j][k] == 1) {
        dfs(j, k);
      }
    }
    return 1;
  }
}
