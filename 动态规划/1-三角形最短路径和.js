/****
 * leetcode:120
 * 给定一个三角形，找出自顶向下的最小路径和。
 * 每一步只能移动到下一行中相邻的结点上
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
 * 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。 
 *
 * 进阶: 如果你可以只使用 O(n) 的额外空间（n 为三角形的总行数）
 *       来解决这个问题，那么你的算法会很加分。
 * 
 */

/******
 * 思路1:
 * 递归从上到下: 每个点可以从两个方向，相当于遍历出每条路径求出最佳
 *              f(i,j) 里会调用 f(i+1,j) f(i+1,j+1)
 * 复杂度： 2^n
 *
 * 思路2:
 * dp: 从三角形底层向上堆叠
 * 状态定义:dp[i,j]表示从底层 到节点i，j 的最短路径和
 * 状态转换方程:
 *      dp[i][j] = min{dp[i+1,j],dp[i+1][j+1]} + 节点[i,j]的值
 * 初始值:
 *     底层: dp[0][j] = 节点本身的值
 *
 * ===> 观察递推矩阵发现新的一层其实只由上一层+cij决定
 * 所以可以压缩成 一维数组dp
 *
 */

let triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]];

console.log(minimumTotal(triangle));

/****
 * 超时了
 * 通过 42/43个测试用例
 *
 */
function minimumTotal(triangle) {
  let level = triangle.length;
  let min = Infinity;
  minimumTotalCall(0, 0, 0);
  return min;
  function minimumTotalCall(pathSum, i, j) {
    if (i == level - 1) {
      pathSum += triangle[i][j];
      min = pathSum < min ? pathSum : min;
    } else {
      minimumTotalCall(pathSum + triangle[i][j], i + 1, j);
      minimumTotalCall(pathSum + triangle[i][j], i + 1, j + 1);
    }
  }
}

// way2
function minimumTotal(triangle) {
  let n = triangle.length;
  // 从底层向上递推 默认为
  let dp = triangle[n - 1];

  for (let i = n - 2; i >= 0; i--) {
    let temp = triangle[i]; // 微缓存
    for (let j = 0; j < triangle[i].length; j++) {
      dp[j] = Math.min(dp[j], dp[j + 1]) + temp[j];
    }
  }
  return dp[0];
}

// 改进： 貌似dp都不用申请了直接利用原矩阵
function minimumTotal(triangle) {
  let n = triangle.length;
  // 从底层向上递推 默认为
  // let dp = triangle[n-1];

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      // dp[j] = Math.min(dp[j],dp[j+1]) + triangle[i][j];
      triangle[i][j] = Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]) + triangle[i][j];
    }
  }
  return triangle[0][0];
}
