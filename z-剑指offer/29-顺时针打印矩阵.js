/***
 * https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/
 * leetcode: 54 螺旋矩阵
 *
 * 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
 */

// 输入:
// [
//  [ 1, 2, 3 ],
//  [ 4, 5, 6 ],
//  [ 7, 8, 9 ]
// ]
// 输出: [1,2,3,6,9,8,7,4,5]

/***
 *  思路：
 *      每次负责打印最外围，然后内层交给递归实现
 */
let arr = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
console.log(spiralOrder(arr));
// wrong
// 测试case：最后一圈可以退化成只有一行、一列、甚至只有一个数字
function spiralOrder(matrix) {
  if (matrix == null || matrix.length < 1 || matrix[0].length < 1) return [];
  let result = [];
  spiralOrderCall(matrix, 0, 0, matrix[0].length - 1, matrix.length - 1);
  return result;
  function spiralOrderCall(matrix, startX, startY, endX, endY) {
    if (startX > endX || startY > endY) return;

    // 第一行： 从左到右
    for (let i = startX; i <= endX; i++) {
      result.push(matrix[startY][i]);
    }
    // 最右列: 从上到下 (只有一行则省略此步)
    for (let j = startY + 1; j <= endY; j++) {
      result.push(matrix[j][endX]);
    }
    // 最后一行：从右到左 (至少当前是两行两列)
    for (let i = endX - 1; i >= startX; i--) {
      result.push(matrix[endY][i]);
    }
    // 第一列：从下到上 (至少是三行两列)
    for (let j = endY - 1; j >= startY + 1; j--) {
      result.push(matrix[j][startX]);
    }
    ++startX, ++startY, --endX, --endY;
    // return spiralOrderCall(arr, startX++, startY++, endX--, endY--);
    if (startX == endX || startY === endY) return; // ===》 6、7也不会输出了
    spiralOrderCall(matrix, startX, startY, endX, endY);
  }
}

// 错误用例 => [1,2,3,4,8,12,11,10,9,5,6,7,6] 结尾重复输出了6
// 6、7的时候 输出后 就不必再递归了
// [
//  [ 1, 2, 3, 4],
//  [ 5, 6, 7, 8],
//  [ 9, 10, 11, 12]
// ]
// ===> 最后一圈可以退化成只有一行、一列、甚至只有一个数字
// 仔细考虑输出每一步打印的条件

// 纠正版
function spiralOrder(matrix) {
  if (matrix == null || matrix.length < 1 || matrix[0].length < 1) return [];
  let result = [];
  spiralOrderCall(matrix, 0, 0, matrix[0].length - 1, matrix.length - 1);
  return result;
  function spiralOrderCall(matrix, startX, startY, endX, endY) {
    if (startX > endX || startY > endY) return;

    // 第一行： 从左到右
    for (let i = startX; i <= endX; i++) {
      result.push(matrix[startY][i]);
    }

    // 最右列: 从上到下 (只有一行则省略此步)
    if (startY < endY) {
      for (let j = startY + 1; j <= endY; j++) {
        result.push(matrix[j][endX]);
      }
    }

    // 最后一行：从右到左 (至少当前是两行两列)
    if (startX < endX && startY < endY) {
      for (let i = endX - 1; i >= startX; i--) {
        result.push(matrix[endY][i]);
      }
    }

    // 第一列：从下到上 (至少是三行两列)
    if (startX < endX && startY < endY - 1) {
      for (let j = endY - 1; j >= startY + 1; j--) {
        result.push(matrix[j][startX]);
      }
    }
    spiralOrderCall(matrix, ++startX, ++startY, --endX, --endY);
  }
}
