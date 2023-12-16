// 一堆数字字符串组成最大数是多少[50, 2, 5, 9] => 95502 (字典序+贪心)

let arr = [50, 2, 5, 9];
/****
 * 思路：
 *      1、以字典序的顺序排序  [2, 5, 50, 9]
 *      2、每次选当前步最佳的 (贪心)
 *      3、使用字符串拼接的形式简化代码
 */
function getMaxNumber(arr) {
  return arr.sort().reduce((acc = '', cur) => Math.max(+`${acc}${cur}`, +`${cur}${acc}`));
}
