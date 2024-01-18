/***
 * 栈：后进先出
 * 一般表示：
 *  let stack = []
 *  入栈-向数组尾部追加元素：stack.push(); 
 *  出栈-弹出数组尾部的元素：stack.pop();
 *  返回栈顶元素peek：stack[stack.length-1]
 * 这里基于链表实现栈这样的功能，即实现push、pop、peek等api
 * 链栈的好处：便于多个栈共享存储空间、不存在栈满上溢的情况
 * 设计：
 *     [头结点] ——> [栈顶节点] ——>......——> [栈底节点]
 *     进栈：在头结点之后插入新节点 
 *     出栈：删除头结点之后的节点
 * 整体类似于头插法建立的单链表过程
 * 期望
 *    let stack = new Stack();
 *    stack.push(4)
 *    stack.push(3)
 *    console.log(stack.pop())  // 3
 *    console.log(stack.peek()) // 4 
 */

 function Node(data){
    this.data = data;
    this.next = null;
 }

 class Stack{
    constructor(){
        this.head = new Node()// 一个空值的头结点
    }
    push(x){// 将新节点插入到头结点后面
        let p = new Node(x)
        p.next = this.head.next;
        this.head.next = p;
    }
    pop(){
        let p =  this.head.next;
        if(p==null){
            throw new Error('栈为空')
        }
        let e = p.data;
        this.head.next = p.next;
        return e;
    }
    peek(){
        let p =  this.head.next;
        if(p==null){
            throw new Error('栈为空')
        }
        return p.data;
    }
    printf(){
        if(!this.head.next){
            console.log('栈为空')
            return;
        }
        let p = this.head;
        p = p.next;
        while(p){
            console.log(p.data)
            p = p.next;
        }
    }
    clear(){
        this.head.next = null
    }
 }

let stack = new Stack();
stack.push(4)
stack.push(3)
stack.printf()// 3 4
console.log(stack.pop())  // 3
// stack.printf()
// console.log(stack.peek()) // 4 
module.exports = Stack