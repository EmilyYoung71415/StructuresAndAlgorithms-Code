/***
 * https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/
 * 实现函数double Power(double base, int exponent)，求base的exponent次方。不得使用库函数，同时不需要考虑大数问题。
 * base ^ exponent
 */
// 输入: 2.00000, 10
// 输出: 1024.00000

// 输入: 2.10000, 3
// 输出: 9.26100

// 输入: 2.00000, -2
// 输出: 0.25000
// 解释: 2-2 = 1/22 = 1/4 = 0.25

/***
 * x的n次方: 即n个x相乘
 *      问题：
 *          1、怎么获取输入的小数点后面的位数，结果值 toFixed 相应位数
 *                 数字转换为字符串的方式： x.toString后 .1000变成.1
 *          ===> leetcode 处理了小数后面位数的保留问题
 *          2、考虑n为负数的时候
 *          3、超时问题，如果n个x相乘，那么算n次
 *          失败的case：2.00000, -2147483648;
 *          ===>  快速幂算法 O(log₂N) 3^11
 *              11的二进制: 1011
 *              指数11 = 2^3*1 + 2^2*0 + 2^1*1 + 2^0*1
 *            快速幂算法的实现可以通过递归 也可以利用二进制
 */
console.log(myPow(2, -3));
// way1: O(N) n个x依次相乘==》 超出时间限制
function myPow(x, n) {
  if (n == 0) return 1;
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let res = 1;
  while (n--) {
    res *= x;
  }
  return res;
}

// way2：快速幂的递归实现
function myPow(x, n) {
  if (n == 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);
  // 如果是奇数
  if (n % 2) return x * myPow(x, n - 1);
  return myPow(x * x, n / 2);
}

// way2：快速幂的位运算实现
function myPow(x, n) {
  if (n == 0 || x == 1) return 1;
  let isNegative = n < 0;
  n = Math.abs(n);
  let result = 1;
  while (n) {
    if (n & 1) {
      // 如果是奇数
      result = result * x;
    }
    x = x * x;
    n = n >> 1; // n=n>>1  除以2
  }
  return isNegative ? 1 / result : result;
}
