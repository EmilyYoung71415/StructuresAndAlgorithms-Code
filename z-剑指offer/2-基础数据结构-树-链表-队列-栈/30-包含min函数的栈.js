/****
 * https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/
 * 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。
 */
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack: [-2,0,-3]
// minStack.min();   --> 返回 -3.
// minStack.pop(); // -3
// minStack.top();      --> 返回 0.
// minStack.min();   --> 返回 -2.

/****
 * 思路：
 *      每次入栈2个元素，一个是入栈的元素本身，一个是当前栈元素的最小值 (这样每次取min的时)
 */

function MinStack() {
  this.stack = [];
}

MinStack.prototype = {
  push(val) {
    const { stack } = this;
    if (!stack.length) {
      stack.push(val);
      stack.push(val);
    } else {
      let curmin = this.min();
      stack.push(val);
      let min = Math.min(val, curmin);
      stack.push(min);
    }
  },
  pop() {
    this.stack.pop();
    return this.stack.pop();
  },
  top() {
    return this.stack[this.stack.length - 2];
  },
  min() {
    return this.stack[this.stack.length - 1];
  },
};

let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-1);
// console.log(minStack.stack)
console.log(minStack.min());
console.log(minStack.top());
console.log(minStack.pop());
console.log(minStack.min());
