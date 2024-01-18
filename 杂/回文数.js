/***
 * leetcode 9
 * 判断整数是否为回文数
 * 121 ——> true
 * -121 ——> false
 * 10  ——> false
 */
// 思路： 转换为字符串
// 思路2：
/**
 * @param {number} x
 * @return {boolean}
 */
console.log(isPalindrome(-1111));
// 双指针
function isPalindrome1(num) {
  num = num.toString();
  let i = 0;
  let j = num.length - 1;
  while (i <= j) {
    if (num[i] === num[j]) {
      i++;
      j--;
    } else {
      return false;
    }
  }
  return true;
}

// 同样可以优化为 j=>len-1-i
// 继续优化： 负数肯定为false
function isPalindrome(num) {
  if (num < 0) return false;
  num = num.toString();
  let i = 0;
  let mid = Math.floor(num.length / 2);
  while (i <= mid) {
    if (num[i] !== num[num.length - 1 - i]) {
      return false;
    }
    i++;
  }
  return true;
}
