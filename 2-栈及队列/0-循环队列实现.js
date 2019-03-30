/***
 * 队列：先进先出
 * 一般表示：
 *  let queue = []
 *  入队-向数组尾部追加元素：queue.push(); 
 *  出队-弹出数组第一个元素：queue.shift();
 *  返回队首元素head：queue[0]
 * 这里基于数组实现队列这样的功能，即实现push、shift、head这俩api
 * 之前设计了队列：带有两个指针 front、rear
 * 麻烦的地方:
 *  1、q.rear=q.front=0 可以作为判空条件，
 *  but q.rear=this.size 并不能作为队列满的条件判断
 *  实际上是一种假溢出、
 * 所以引入环状队列，环形队列首尾相连，当front==size-1,再进一个
 * 就为0：即 front = (front+1)%size;
 * 那么循环队列的判满条件：
 * 1、初始的时候q.front = q.rear=0
 * 2、当入队速度大于出队速度时，始终会遇到两者相遇
 * 区分方法：
 * 1、【推荐】浪费一个空间.进队的时候少用一个空间，
 *    当队尾指针+1等于队首空间的时候，队满
 * 队满的条件：(q.rear+1)%maxsize = q.front
 * 队空：q.front = q.rear
 * 队里元素个数: (q.rear-q.front+maxsize)%maxsize
 * 2、维护一个变量size，记录当前队列里数的个数，
 * 队空：q.size = 0
 * 队满：q.size = maxsize
 * 3、维护一个tag区分是队满还是队空
 *  初始0，当tag为0，因为删除元素导致q.rear=q.front 则队空
 *  当因为新加元素导致q.rear = q.fron 则是队满
 */

class Dequeue{
    constructor(size){
        this.maxSize = size||100;
        this.data = [];
        this.front = 0;
        this.rear = 0;
    }
    push(x){
        // 牺牲一个队列空间
        if((this.rear+1)%this.maxSize==this.front){
            throw new Error('队列满')
        }
        this.data[this.rear] = x;
        this.rear = (this.rear+1)%this.maxSize;
    }
    pop(){
        if(this.rear==this.front){
            throw new Error('队列空')
        }
        let e = this.data[this.front];
        this.front = (this.front+1)%this.maxSize;
        return e;
    }
 }
/*
let queue = new Dequeue();
queue.push(4)
queue.push(3)
console.log(queue.pop())  // 4
console.log(queue.pop())
*/