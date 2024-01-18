/****
 * https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/
 * 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，
 * 分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )
 */
// ["CQueue","appendTail","deleteHead","deleteHead"]
// [[],[3],[],[]]


/********************************
 * 思路：
 *     resultqueue=[1,2,3,4]
 *     append: [4,3,2,1].append(5) ====> [5,4,3,2,1] ===>  [5,4,3,2,1].deleteHead() = [5,4,3,2,1].deleteHead() = [5,4,3,2,1].pop()
 *          instack [1]
 *          outstack []     
 *         
 *          instack []        instack [2]         instack [2,1]
 *          outstack [1]  =>   outstack [1]  =>     outstack []
 *    deleteHead: instack.pop();
 *    appendTail: instack 的元素依次pop出来 然后push进outstack, instack.push(data), 
 *                instack 依次push outstack倒出来的元素
 */

function CQueue() {
    this.instack = [];
    this.outstack = [];
}

CQueue.prototype = {
    appendTail: function(val) {
        while (this.instack.length) {
            this.outstack.push(this.instack.pop());
        }

        this.instack.push(val);

        while (this.outstack.length) {
            this.instack.push(this.outstack.pop());
        }
    },
    deleteHead: function() {
        if (!this.instack.length) return -1;
        return this.instack.pop();
    }
}

// let queue = new CQueue();
// [1,2,3,4].forEach(item => queue.appendTail(item));
// console.log(queue.deleteHead()); 1
// console.log(queue.deleteHead()); 2
// console.log(queue.deleteHead()); 3
// console.log(queue.deleteHead()); 4
// console.log(queue.deleteHead()); -1
// console.log(queue.deleteHead()); -1

// 思路2： push简化， delete复杂化
function CQueue() {
    this.instack = [];
    this.outstack = [];
}

CQueue.prototype = {
    appendTail: function(val) {
        this.instack.push(val);
    },
    deleteHead: function() {
       const {instack, outstack} = this;
       if (outstack.length) return outstack.pop();
       while (instack.length) {
           outstack.push(instack.pop());
       }
       return outstack.pop() || -1;
    }
}