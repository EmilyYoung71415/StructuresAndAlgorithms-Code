/****
 * https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/
 * 请定义一个队列并实现函数 max_value 得到队列里的最大值，要求函数max_value、push_back 和 pop_front 的时间复杂度都是O(1)。
 * 若队列为空，pop_front 和 max_value 需要返回 -1 
 */

// ["MaxQueue","push_back","push_back","max_value","pop_front","max_value"]
// [[],[1],[2],[],[],[]]
// 输出: [null,null,null,2,1,2]

/********************************
 * 思路:
 *  way1:
 *      队列的最大值 和 栈的最小值 很明显很类似
 *      同栈的最小值一样，队列元素在push的时候 在元素的前面保留最大值
 *      ===> 不好使，queue元素出队的时候 可能把最大元素给出队了，后面元素记录的最大值都会改变
 *  way2：
 *      本题本质上是求滑动窗口最大值的问题
 *      队列可以看成是一个滑动窗口，入队就是将窗口的右边界右移，出队就是将窗口的左边界右移
 *      ==> 单调队列模板
 *      维护一个最大值队列
 *      1、从队尾开始，依次比较队列中的数，将小于num的数全部清除
 *      2、队列的最大元素放在maxqueue的首元素
 *      3、如果queue出队时=最大值，需要刷新
 */
// ❌ 有点小问题 7 / 34
function MaxQueue() {
    this.queue = [];
    this.maxqueue = [];
}

MaxQueue.prototype = {
    push_back(val) {
        const {queue, maxqueue} = this;
        // 最近最大元素
        let peekLast = maxqueue[maxqueue.length-1];
        queue.push(val);
        while (maxqueue.length && peekLast < val) {
            maxqueue.pop();
        }
        maxqueue.push(val);
    },
    pop_front() {
        const {queue, maxqueue} = this;
        if (!queue.length) return -1;
        let popval = queue.shift();
        popval === maxqueue[0] && maxqueue.shift();
        return popval;
    },
    max_value() {
        return this.maxqueue[0] || -1;
    }
}

let q =  new MaxQueue();
q.push_back(15)
console.log(q.max_value());
q.push_back(9)
// console.log(q.pop_front());
console.log(q.max_value());