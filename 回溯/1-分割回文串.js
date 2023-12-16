/***
 * leetcode:131
 * 给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串
 * "aab"
 * [
    ["aa","b"],
    ["a","a","b"]
   ]
 * 
 */

/******
 * 思路:
 * 1、将字符串所有可能分割的结果枚举出来，将符合回文串的push到result
 *    原型是子集问题 且原集里元素是可重复的那种
 * ===> 但是要返回分割方案！！！
 *
 * 2、倒树
 *                  aab        ['aab']
 *                   |
 *             a  ab    aa  b  ['a','ab']     ['aa','b']
 *             |  /\    /\  |
 *             a a  b  a  a b  ['a','a','b']
 *
 *     递归结束的终点：每个元素都是单元素
 * ==> pathArr []
 *     循环是确定 字符串的分割点
 *     需要判重吗。这样的分割会产生重复的解吗
 */
let str = 'aab';
// console.log(str.slice(0,3))
// console.log(str.slice(3)) //从下标1之后开始分割

console.log(partition(str));

/*****
 * ❗一顿操作猛如虎
 *  写出来逻辑饶逻辑 又把自己绕死了
 *
 */
function partition1(str) {
  let result = [];
  // 字符串排序
  str = str
    .split('')
    .sort((a, b) => a.localeCompare(b))
    .join('');
  partitionCall([str]);
  return result;

  function partitionCall(pathArr) {
    // 如果pathArr存在任意一个 '' 则返回
    if (pathArr.every(s => s.length == 1)) {
      return;
    }
    let flag = true; // 初始设置为符合回文串要求
    for (let i = 0; i < pathArr.length; i++) {
      // 有一个不是回文那么 pathArr都不符合
      if (!isPalindrome(pathArr[i])) {
        flag = false;
        break;
      }
    }
    if (flag) {
      result.push(pathArr);
    }

    let tempArr = [];
    for (let i = 0; i < pathArr.length; i++) {
      let str = pathArr[i];
      if (str.length > 1) {
        // 需要分割
        // [a,ab] 分割ab应该递归的
        // let lstr = str.slice(0,i+1),
        //     rstr = str.slice(i+1);
        tempArr.concat([lstr, rstr]);
      } else {
        // 不分割单个字符 直接传递下去
        tempArr.push(str);
      }
    }
    partitionCall(tempArr);
  }

  function isPalindrome(str) {
    let i = 0,
      j = str.length - 1;
    while (i <= j) {
      if (str[i] != str[j]) {
        return false;
      }
    }
    return true;
  }
}

/*****
 * 思路2：
 * for循环是循环切几刀，len= str.length; 最多切 len-1 刀
 * for循环里面是 getlevelArrs(str,k) 返回切当前刀的所有结果
 * 然后再判断是否合乎约束条件-回文串
 *
 * 关键:
 * 已知 str = aabba 传入k=2 表示当前砍3刀
 * 期望返回所有砍三刀的不重复结果
 * [
 *   [a,a,baa]
 *   [a,ab,aa]
 *   [a,aba,a]
 *   [aa,b,aa]
 *   [aa,ba,a]
 *   [aab,a,a]
 * ]
 * ==> 双重循环
 *
 */
// 但是这是切两次...
function getlevelArrs(str, k) {
  let result = [];
  let len = str.length;
  for (let i = 0; i < len; i++) {
    // i=0,j=1 ==>[a,a,bba]
    // i=0,j=2 ==>[a,ab,aa]
    for (let j = i + 1; j < len - 1; j++) {
      result.push([str.slice(0, i + 1), str.slice(i + 1, j + 1), str.slice(j + 1)]);
    }
  }
  return result;
}

/****
 * 思路3:
 *
 * 理清了的 回溯，
 * 横向是循环，竖向是递归. 递归树如下
 *                 aab
 *            /     |   \
 *          a       aa   aab(√)
 *         / \      |
 *        a   ab    b(√)
 *       /     |
 *      b(√)  (ab不是 所以这条支路被放弃)
 */

function partition3(str) {
  let result = [],
    curlist = [];
  partitionCall(0);
  return result;

  function partitionCall(start) {
    if (curlist.length > 0 && start >= str.length) {
      result.push(curlist.slice());
    }

    for (let i = start; i < str.length; i++) {
      if (isPalindrome(str, start, i)) {
        if (start == i) {
          curlist.push(str[i]);
        } else {
          curlist.push(str.slice(start, i + 1));
        }
        partitionCall(i + 1);
        curlist.pop();
      }
    }
  }

  function isPalindrome(str, l, r) {
    while (l < r) {
      if (str[l] != str[r]) {
        return false;
      }
      l++;
      r--;
    }
    return true;
  }
}

// 优化

function partition(str) {
  if (str.length == 0) return [[]];
  let result = [];
  partitionCall([], 0);
  return result;

  function partitionCall(pathArr, start) {
    if (start == str.length) {
      result.push(pathArr);
    } else {
      for (let i = start; i < str.length; i++) {
        if (isPalindrome(str, start, i)) {
          let tempArr = pathArr.slice();
          tempArr.push(str.slice(start, i + 1));
          partitionCall(tempArr, i + 1);
        }
      }
    }
  }

  function isPalindrome(str, l, r) {
    while (l < r) {
      if (str[l] != str[r]) {
        return false;
      }
      l++;
      r--;
    }
    return true;
  }
}
