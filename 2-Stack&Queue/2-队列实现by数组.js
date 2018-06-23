/**
 * @desc 利用数组实现队列结构
 *      队列先进先出，即排队
 * 一个数组：
 * 另：
 *      shift() 是头部删除  shift移动，即删除
 *      unshift(4)  头部插入       unshift 是插入
 * 
 * @function 栈的方法
 *      前提：创建一个固定大小的栈
 *      push 尾部添加数
 *          |———— end指向 最后进的元素
 *      peek 获得栈顶元素
 *      poll 删除元素(从数组底部开始
 *          |———— start 指向 众数中最先进的元素
 *              7 3 5 
 *      [7]
 *      [3]
 *      [5]
 * 思路：
 *      size 约束first 和end指针
 *      加数时：
 *          
 */

 class Queue {
     constructor(initSize){
         this.arr =  new Array(initSize);
         this.size = 0;
         this.start = 0;
         this.end = 0;
     }

     push(value){
        if(this.size===this.arr.length){
            throw new Error('栈已经满了');
        }
        this.size++;
        this.arr[this.end] = value;
        this.end = this.end===this.arr.length-1?0:this.end+1;
     }
     poll(){
        if(this.size===0){
            throw new Error('队列已经是空的了！')
        }
        // 弹出最先进来的元素 并size--
        this.size--;
        let res = this.arr[this.start];
        this.start = this.start===this.arr.length-1?0:this.start+1;
        return res;
     }
     peek(){    
        if(this.size===0){
            return null;
        }
        return this.arr[this.start];
     }
     isEmpty(){
        return this.size===0;
     }
 }

/*
 let queue = new Queue(3);
 queue.push(7);
 queue.push(5);
 queue.push(3);
 console.log(queue.poll());// 7
 console.log(queue.arr);// 7
 console.log(queue.push(13));// 7
 console.log(queue.arr);// 7

 */