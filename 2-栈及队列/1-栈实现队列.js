/***
 * leetcode题号：232
 * 基本思想：使用两个栈，互相倒腾数据
 * 思路:
 *    维护push操作
 */

/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
    this.stack = [];
    this.help = [];
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    if(!this.stack.length){
        this.stack.push(x)
    }else{
        // 将stack栈里的数据弹出并放入help辅助栈
        while(this.stack.length){
            this.help.push(this.stack.pop())
        }
        this.stack.push(x)
        // 再将help的数据倒回给stack
        while(this.help.length){
            this.stack.push(this.help.pop())
        }
    }
};

/**
 * 弹出队列的第一个元素
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    return this.stack.pop()
};

/**
 * 获得队列第一个元素
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.stack[this.stack.length-1]
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.stack.length==0
};


/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = Object.create(MyQueue).createNew()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */