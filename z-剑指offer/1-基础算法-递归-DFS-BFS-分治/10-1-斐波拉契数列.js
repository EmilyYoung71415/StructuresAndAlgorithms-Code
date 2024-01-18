/****
 * https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/
 * 斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。
 * 输入n 求fn
 */
// F(0) = 0,   F(1) = 1
// F(N) = F(N - 1) + F(N - 2), 其中 N > 1.

/***
 * 思路1：
 *      递归，给的公式即是递归公式
 *      ===> 超出时间限制 复杂度2^n 以n为指数爆炸增长
 */
function fib(n) {
  if (n == 1 || n == 0) return n;
  return fib(n - 1) + fib(n - 2);
}

/***
 * 思路2：
 *      从题意上理解：斐波那契数就是由之前的两数相加而得出
 *      [0, 1, 0+1=1, 1+1=2, 2+1=3, 3+2=5,...]
 *      for 迭代
 */
fib(5);
function fib(n) {
  if (n == 1 || n == 0) return n;
  let pprev = 0;
  let prev = 1;
  let result = 0;
  for (let i = 2; i <= n; i++) {
    result = prev + pprev;
    // let tempprev = prev;
    // prev = result;
    // pprev = tempprev;
    // 改进：
    pprev = prev;
    prev = result;
  }
  return result % 1000000007;
}

// 错误：输入45 返回1134903170 right:134903163 通过一半的case
// 题意理解：答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
// 取模后通过 41/51 ==> 输入81错误 ===> 测试数据溢出 js 中的整数范围，使用大数（bigint）类型:创建BigInt，只需在整数的末尾追加n
function fib(n) {
  if (n == 1 || n == 0) return n;
  let pprev = 0n;
  let prev = 1n;
  let result = 0;
  for (let i = 2n; i <= n; i++) {
    result = prev + pprev;
    // let tempprev = prev;
    // prev = result;
    // pprev = tempprev;
    // 改进：
    pprev = prev;
    prev = result;
  }
  return result % 1000000007n;
}

// 评论里发现的有意思的知识点：
// 这个题对我来说难点在于，为什么可以边算边取模和最后再取模结果一样。。
// 证明： 要证（a+b）%c = （a%c+b%c）%c 即证a+b与a%c+b%c对c同余 则有c能整除(a+b-a%c-b%c)
// 设a=mc+p b=nc+q 则(a+b-a%c-b%c)=(m+n)c+p+q-p-q=(m+n)c 则证a+b与a%c+b%c对c同余，证毕
