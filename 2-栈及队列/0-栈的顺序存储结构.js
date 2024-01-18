/***
 * 栈：后进先出
 * 一般表示：
 *  let stack = []
 *  入栈-向数组尾部追加元素：stack.push(); 
 *  出栈-弹出数组尾部的元素：stack.pop();
 *  返回栈顶元素peek：stack[stack.length-1]
 * 这里基于数组实现栈这样的功能，即实现push、pop、peek等api
 * 期望
 *    let stack = new Stack();
 *    stack.push(4)
 *    stack.push(3)
 *    console.log(stack.pop())  // 3
 *    console.log(stack.peek()) // 4 
 */

class Stack{
    constructor(){
        this.data = [];// 存放栈中元素
        this.top = -1;// 栈顶指针
    }
    push(x){
        this.data[++this.top] = x;
    }
    pop(){
        if(this.top==-1){
            throw new Error('栈为空')
        }
        return this.data[this.top--];
    }
    peek(){
        if(this.top==-1){
            throw new Error('栈为空')
        }
        return this.data[this.top];
    }
}
/*
let stack = new Stack();
stack.push(4)
stack.push(3)
console.log(stack.pop())  // 3
console.log(stack.peek()) // 4 
*/