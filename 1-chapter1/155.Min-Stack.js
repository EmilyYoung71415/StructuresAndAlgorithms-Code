/**
 *  思路即是设计两个栈
 *      stackData 
 *      stackMin
 */
var MinStack = function() {
    this.stackData = [];
    this.stackMin = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stackData.push(x);
    if(!this.stackMin.length){
        this.stackMin.push(x);
    }else if(x<=this.getMin()){
        this.stackMin.push(x);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if(!this.stackData.length){
        throw new Error('栈为空！');
    }
    // 如果栈顶元素<= 次栈栈顶，次栈栈顶也弹出
    let res = this.stackData.pop();
    if(res==this.getMin()){
        this.stackMin.pop();
    }
    return res;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stackData[this.stackData.length-1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    if(!this.stackMin.length){
        throw new Error('栈为空！')
    }
    return this.stackMin[this.stackMin.length-1];
};
