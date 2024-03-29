/**
 * 实现一个能够得到栈的最小元素的 min 函数在该栈中，
 * 调用 min、push 及 pop 的时间复杂度都是 O(1)。
 *
 */

/**
 * 难点：
 *      当我们进行 pop（移除栈顶元素）操作时如果删除的是当前最小值，
 *      那么我们如何寻找下一个最小值？要保证O(1)
 * ===》
 *  1、入栈时，元素放完后，永远保持最小元素在栈顶
 * ===> 如果 stackcuritem < cur，弹栈 让cur进去
 *      弹出来的栈一次调入stack里
 * 2、弹
 *
 */
