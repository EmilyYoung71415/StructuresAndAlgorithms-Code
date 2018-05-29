/**
 * @desc 利用数组实现栈结构
 *      栈先进后出，类似弹夹
 *      队列先进先出，即排队
 * 一个数组：
 *      进： 调用arr.push(1) 方法
 *      出：arr.pop() //从尾部删除数据 冒泡嘛
 * 另：
 *      shift() 是头部删除  shift移动，即删除
 *      unshift(4)  头部插入       unshift 是插入
 * 
 * @function 栈的方法
 *      前提：创建一个固定大小的栈
 *      push 尾部添加数
 *      peek 获得栈顶元素
 *      pop  弹出元素（从栈顶开始
 */

 class Stack {
     constructor(initSize){
         if(initSize<0){
             throw new Error('size 不能小于0');
         }
         this.arr = new Array(initSize);
         this.size = 0;  // 记录当前栈里元素的数量       
     }

     push(value){
        if(this.size===this.arr.length){
            throw new Error('栈已经满了');
        }
        this.arr[this.size++] = value;
     }

     pop(){
         if(this.size===0){
             throw new Error('栈已经是空的了！')
         }
         return this.arr[--this.size];
     }

     peek(){
         if(this.size===0){
             return null;
         }
         //return this.arr;
         return this.arr[this.size-1];// -1和-- 不一样
     }
     
 }


 let stack  = new Stack(4);
 stack.push(2);
 stack.push(4);
 stack.push(8);

 stack.push(12);
 console.log(stack.peek()) ;// 12
 
 stack.push(15);// 栈已经满了
 