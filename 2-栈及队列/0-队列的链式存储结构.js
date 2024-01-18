/***
 * 队列：先进先出
 * 一般表示：
 *  let queue = []
 *  入队-向数组尾部追加元素：queue.push(); 
 *  出队-弹出数组第一个元素：queue.shift();
 *  返回队首元素head：queue[0]
 * 这里基于数组实现队列这样的功能，即实现push、shift、head这俩api
 * 设计：
 *  队列需要向队尾追加元素==> 需要指向队尾的指针
 *  队列会从队首弹出元素==> 记录队首元素的指针
 * 解惑：在其他语言里，数组结构是存储地址是连续的且固定的
 *       并不是弹出队首元素之后，后面的元素都会自动移动到数组前面补齐位置
 *      即不是弹出之后访问arr[0]总是会取到当前队列的实际上的第一个元素
 *      弹出元素后很有可能会是[undefined,undefined,1,1,2]这样的情况，
 *      此时逻辑上的队首其实是1
 *      和arr=[1,2,3,4] 然后delete arr[2]==>arr=[1,2,empty,4];arr[2]=undefined是一样的道理
 * 
 * 队列的链式存储 就是尾插法建立链表
 */

 function Node(data){
    this.data = data;
    this.next = null;
 }
 
class Queue{
   constructor(){
      this.front = null;
      this.rear = null;
   }
   push(x){
      let p = new Node(x);
      // 如果链队为空 则即使队首又是队尾
      if(this.rear==null){
         this.rear = this.front = p;
      }
      else{
         this.rear.next = p;
         this.rear = p;// 更新链尾
      }
   }
   pop(){
      //如果链队为空
      if(this.rear==null){
         throw new Error('队列为空')
      }
      let p  = this.front;
      // 如果只有一个节点
      if(this.rear==this.front){
         this.rear = this.front = null;
      }
      else{
         this.front = this.front.next;
      }
      return p.data;
   }
}
/*
let queue = new Queue();
queue.push(4)
queue.push(3)
console.log(queue.pop())  // 4
console.log(queue.pop())

module.exports = Queue;
*/