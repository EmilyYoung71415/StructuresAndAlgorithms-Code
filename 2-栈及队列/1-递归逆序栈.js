/****
 * 一个栈依次压入1、2、3、4、5，那么栈顶到栈底分别为：5、4、3、2、1。 
    将这个栈逆置后栈顶到栈底分别为1、2、3、4、5。 
    用递归函数来实现，不能用其他数据结构。
 * 
 */
let stack = [1, 2, 3, 4, 5];
reverse(stack);
console.log(stack);
function reverse(stack) {
  if (stack.length < 1) {
    return;
  }
  // 第一层1 第二层2 最后一层5，最开始压 5
  let item = getAndRemoveLastElement(stack);
  reverse(stack); //获取栈底元素并删除，栈为空的时候再依次压入
  // 当栈为空的时候 开始压入 [5]
  stack.push(item);

  // 将栈底元素删除并返回 每一轮调用后[1,2,3,4,5]=>[2,3,4,5] return 1
  function getAndRemoveLastElement(stack) {
    let result = stack.pop();
    if (stack.length < 1) {
      return result;
    } else {
      let last = getAndRemoveLastElement(stack);
      stack.push(result);
      return last;
    }
  }
}
