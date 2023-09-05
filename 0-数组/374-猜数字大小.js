/***
 * https://leetcode-cn.com/problems/guess-number-higher-or-lower/
 * leetcode: 374
 * 我从 1 到 n 选择一个数字。 你需要猜我选择了哪个数字。
 * 每次你猜错了，我会告诉你这个数字是大了还是小了。
 * 调用一个预先定义好的接口 guess(int num)，它会返回 3 个可能的结果（-1，1 或 0）：
 */
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/***
 * 思路：
 *      二分查找
 *      坑点：这里的「我的数字」 指的你要猜的数字，不是你输入的数字
 *      标准二分查找的基础、经典模板
 */

// function guess(cur) {
//     if (cur===target) return 0;
//     else if (cur < target) return 1;
//     else return -1;
// }

function guessNumber(n) {
  return guessNumberCall(1, n);
  function guessNumberCall(l, r) {
    // if (l>r || l<1 || r>n) return;
    // let mid = Math.floor((r + l)/2);
    let mid = l + Math.floor((r - l) / 2);
    let g = guess(mid);
    if (g === -1) return guessNumberCall(l, mid - 1);
    else if (g === 1) return guessNumberCall(mid + 1, r);
    return mid;
  }
}

// 迭代版本
function guessNumber(n) {
  let l = 1;
  let r = n;

  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);
    let g = guess(mid);
    if (g === 0) return mid;
    else if (g === -1) {
      r = mid - 1;
    } else {
      l = mid - 1;
    }
  }

  return -1;
}
