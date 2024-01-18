/*****
 * 递归是一种循环，只是循环的是函数体
 * 复用了函数的逻辑
 *
 * 可以看做，for循环是横向循环，而递归是竖着的循环
 * 代替for循环终止条件的 就是 递归的 base case
 * 代替for循环的计数的: 递归的当前层 一般是 函数的参数
 *
 * 递归的思想：复用函数代码、通过函数体进行的循环
 *
 * 简单的递归：
 * 计算n的阶乘： 一个调用栈
 * 斐波拉契： 一个展开的树
 */

function recursion(level, params1, params2, ...arguments) {
  // base case
  if (level > MAX_LEVEL) {
    //.... 返回结果
    return;
  }

  // 逻辑 处理data的主要逻辑
  process_data(level, ...arguments);

  // 进入下一层函数
  recursion(level + 1, p1, p2, ...arguments); // p1可能是逻辑加工后的params

  // 下一层函数处理完之后返回到此层函数 需要做的事
  somethingtofinished(level);
}
