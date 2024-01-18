/******
 * leetcode:50
 * 求解 x的n次方
 *
 * 思路1： 循环  O(n)
 * 思路2： 递归  O(N)
 * 思路3： 分治，多线程递归  O(logn)
 *         将数对半分
 * 思路4：位运算符优化代码
 */

console.log(Pow(3, 2));

function Pow1(x, n) {
  let res = 1;
  for (let i = 0; i < n; i++) {
    res *= x;
  }
  if (n < 0) {
    res = 1 / res;
  }
  return res;
}

function Pow2(x, n) {
  if (n < 0) {
    return 1 / Pow(x, -n);
  }
  if (n == 0) {
    return 1;
  }
  if (n == 1) {
    return x;
  }
  return Pow(x, n - 1) * x;
}

function Pow3(x, n) {
  if (n == 0) return 1;
  // if(n==1) {
  //     return x;
  // }
  // n<1 可能是 导数 2^-2 = 1/4
  if (n < 0) {
    return 1 / Pow(x, -n);
  }

  // 如果是奇数
  if (n % 2) {
    return x * Pow(x, n - 1);
  }
  return Pow(x * x, n / 2);
}

// 位运算
function Pow(x, n) {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let result = 1;
  while (n) {
    // 无论n原始是否为偶数 最终都会走到奇数这一步的 (因为迟早会变成0)
    // 而当n是奇数作为过程中时: 相当于 return x*Pow(x,n-1);
    if (n & 1) {
      // 如果当前n的二进制位==1 即是奇数
      result *= x;
    }
    x *= x;
    n >>= 1; // n=n>>1  除以2
  }
  return result;
}
