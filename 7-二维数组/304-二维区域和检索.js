// 给定一个二维矩阵，计算其子矩形范围内元素的总和，
// 该子矩阵的左上角为 (row1, col1) ，右下角为 (row2, col2) 。
// sumRange会被反复调用无数次，请设计一个时间复杂度最低的算法降低时间消耗
// 用例
// const matrix = [
//        0  1  2  3  4
//  0    [3, 0, 1, 4, 2],
//  1    [5, 6, 3, 2, 1],
//  2    [1, 2, 0, 1, 5],
//  3    [4, 1, 0, 1, 7],
//  4    [1, 0, 3, 0, 5]
// ]
// sumRegion(2, 1, 4, 3) -> 8
// sumRegion(1, 1, 2, 2) -> 11
// sumRegion(1, 2, 2, 4) -> 12

// 这个可用于？
// 棋盘里给定range范围，计算range里每个cell的x属性之和
function NumMatrix1(matrix) {
  this.matrix = matrix;
}

// base: 最容易想到的 for循环嵌套遍历 时间复杂度:O(n*m)
// 每次调用sum计算，就要花费O(n*m)时间
// 当然可以想个缓存：ij计算过的 存进缓存里 下次直接拿
NumMatrix1.prototype.sumRegion = function (row1, col1, row2, col2) {
  // 判断参数 都合法
  // 二维数组遍历？
  const matrix = this.matrix;
  let res = 0;
  for (let i = row1; i <= row2; i++) {
    for (let j = col1; j <= col2; j++) {
      res += matrix[i][j];
    }
  }
  // console.log(res);
  return res;
};

// 思路： 构建前缀和，利用公式，直接出
// 求出整个矩阵每一行的一维preSum数组
// 时间复杂度：第一次：n*m；之后计算n行O(n)，1行O(1)
// 空间复杂度: O(n) 需要创建一个长度为 n+1 的前缀和数组
function NumMatrix(matrix) {
  this.matrix = matrix;
  const preSumArr = [];
  const len = matrix.length;
  for (let i = 0; i < len; i++) {
    preSumArr[i] = [];
    const colLen = matrix[i].length;
    for (let j = 0; j < colLen; j++) {
      // 因为用j-1需要考虑多个情况 所以使用j+1 移位记录了一下
      // preSumArr[i][j] = j === 0 ? matrix[i][j] : preSumArr[i][j - 1] + matrix[i][j];
      preSumArr[i][j + 1] = (preSumArr[i][j] || 0) + matrix[i][j];
    }
  }
  this.preSumArr = preSumArr;
  console.log(preSumArr);
}

NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  const preSumArr = this.preSumArr;
  let res = 0;
  for (let i = row1; i <= row2; i++) {
    // res += preSumArr[i][col2] - (preSumArr[i][col1-1] || 0);
    res += preSumArr[i][col2 + 1] - (preSumArr[i][col1] || 0);
  }
  console.log(res);
  return res;
};

// TODO:再次优化：O(1) 构建二维前缀和

// const matrix = [
//     [3, 0, 1, 4, 2],
//     [5, 6, 3, 2, 1],
//     [1, 2, 0, 1, 5],
//     [4, 1, 0, 1, 7],
//     [1, 0, 3, 0, 5]
// ]
// var obj = new NumMatrix(matrix);
// obj.sumRegion(2, 1, 4, 3)
// obj.sumRegion(1, 1, 2, 2)
// obj.sumRegion(1, 2, 2, 4)

const matrix = [[-4, -5]];
var obj = new NumMatrix(matrix);
obj.sumRegion(0, 0, 0, 1);
obj.sumRegion(0, 1, 0, 1);
