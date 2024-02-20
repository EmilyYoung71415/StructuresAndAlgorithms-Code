/**
 * https://leetcode.com/problems/number-of-1-bits/
 * Time O(k) | Space (1)
 * k最大32，所以 时间复杂度 O(1)
 * @param {number} n - a positive integer
 * @return {number}
 */
// 1.循环检查给定整数 n 的二进制位的每一位是否为 1
// n 与 2^i 进行 与 运算，仅当i位为1时，结果才不为0
export function hammingWeight(n: number): number {
  let [sum, mask] = [0, 1];

  for (let i = 0; i < 32; i++) {
    const hasBit = (n & mask) !== 0; // n & 1
    if (hasBit) {
      sum++;
    }
    // n = n >> 1; // 将 n 右移一位
    // 或者 mask 左移一位
    // mask = mask << 1;
    mask <<= 1;
  }

  return sum;
}
