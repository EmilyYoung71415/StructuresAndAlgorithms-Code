/***
 * leetcode:338
 * 给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，
 * 计算其二进制数中的 1 的数目并将它们作为数组返回
 *
 * 即二进制位1的个数 的进阶问题:如果对连续的数多次调用怎么优化
 * 给出时间复杂度为O(n*sizeof(integer))的解答非常容易。
 * 但你可以在线性时间O(n)内用一趟扫描做到吗？
 * 要求算法的空间复杂度为O(n)。
 *
 *
 * exp:
 * n=3
 * return [0,1,1]
 * 0:0 0
 * 1:1 1
 * 2:10 1
 *
 */

/****
 * 思路:
 * 1、从0遍历n，每个数字计算一下 二进制位数的1的个数
 * ==>但是会有计算冗余，比如3，4可以在前者的基础上叠加的
 *
 * 2、只统计1的个数，所以3，5等对数量不会产生影响
 *     2,4才是分割点
 *     n(4) = n(2)+1.
 *  4 => 2 (4可以通过 i^(i-1) 去除最近1的方式得到2.
 *         i&(i-1)可以保证不会小于0.当i>=1
 */
console.log(countBits(2));
// n*sizeof(integer)复杂度
function countBits(num) {
  if (num == null) return;
  let res = new Array(num + 1).fill(0);

  for (let i = 1; i <= num; i++) {
    res[i] = hammingWeight(i);
  }

  function hammingWeight(n) {
    return n > 0 && (n & 1) + hammingWeight(~~(n / 2));
  }

  return res;
}

function countBits2(num) {
  if (num == null || num < 0) return;
  let res = new Array(num + 1).fill(0);

  for (let i = 1; i <= num; i++) {
    res[i] += 1 + res[i & (i - 1)];
  }

  return res;
}
