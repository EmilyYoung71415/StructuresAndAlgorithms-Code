/***
 * leetcode:224
 * 写一个包含+、-、(、)、非负整数、空格的基本计算器
 * 思路：
 *      先将中缀表达式转为后缀表达式
 *      比如中缀的 a+(c-d)*b-e/f
 *        对应后缀：abcd-*+ef/-
 * 后缀求值:
 *    遍历字符串
 * 1、如果是操作数push入栈
 * 2、操作符，则依次弹出栈的两个元素a、b,计算b-a的值再push入栈
 *
 * 中缀转后缀:
 *  let str; // 后缀表达式
 * 1、如果是操作数 str+=xx
 * 2、如果是操作符&&不是)
 *      当前操作符优先级>栈顶 push入栈
 *      否则(<=) 弹栈直到满足进栈条件
 *             str += stack.pop()
 * 3、如果是)
 *      弹栈直到 遇到左括号
 *              str += stack.pop()
 */
let str = ' 2-1 + 2 ';
console.log(calculate(str));
function calculate(str) {
  let map = { '+': 1, '-': 1, '*': 2, '/': 2, '(': -1 };
  let str_r = getPolishNotation(str); //返回数组形式存储的后缀表达式
  let result = getRes(str_r); // 根据后缀表达式求值
  return result;
  // 操作符入栈
  function getPolishNotation(str) {
    let len = str.length;
    let res = [], // 存放后缀表达式的每个字符
      stack = []; // 存放操作符
    for (let i = 0; i < len; i++) {
      let s = str[i];
      if (s == ' ') continue;
      // 是数值
      if (!isNaN(1 * s)) {
        let ss = s; // 获取连续的数值
        for (let j = i + 1; j < len && !isNaN(1 * str[j]); j++, i++) {
          ss += str[j];
        }
        res.push(ss);
      }
      // 是操作符
      else {
        if (!stack.length) {
          stack.push(s);
        } else if (s == ')') {
          while (stack.length && stack[stack.length - 1] !== '(') {
            res.push(stack.pop());
          }
          stack.pop(); // 弹出(
        }
        // (在入栈的时候优先级是最高的
        // 其他元素在(之后进栈的时候 (优先级又特别低
        else if (s == '(') {
          stack.push(s);
        } else {
          // 栈顶元素比当前元素优先级高
          while (stack.length && map[s] <= map[stack[stack.length - 1]]) {
            res.push(stack.pop());
          }
          // push 新来的操作符
          stack.push(s);
        }
      }
    }
    while (stack.length) {
      res.push(stack.pop());
    }
    return res;
  }

  // 操作数入栈
  function getRes(arr) {
    let stack = [];
    arr.forEach(s => {
      // 数值
      if (!isNaN(1 * s)) {
        stack.push(1 * s);
      } else {
        let pFirst = stack.pop(),
          pSecond = stack.pop(),
          rev = 0;
        switch (s) {
          case '+':
            rev = pSecond + pFirst;
            break;
          case '-':
            rev = pSecond - pFirst;
            break;
          case '*':
            rev = pSecond * pFirst;
            break;
          case '/':
            rev = ~~(pSecond / pFirst);
            break;
        }
        stack.push(rev);
      }
    });
    return stack.pop();
  }
}
