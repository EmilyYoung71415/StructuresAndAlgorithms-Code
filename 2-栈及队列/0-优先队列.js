/***
 * 优先队列
 * 类似于常规的队列或栈, 但每个元素都有与之关联的“优先级”
 * 优先队列的排列顺序：优先级越高越在前面
 *  -------优先级 由高到低 ----------->
 *  [队首]n1、n2、n3......nx [队尾]
 * 
 * 优先队列虽通常用堆来实现,但它在概念上与堆不同。
 * 优先队列是一个抽象概念，就像“列表”或“图”这样的抽象概念一样;
 * 
 * 正如列表可以用链表或数组实现一样，优先队列可以用堆或各种其他方法实现,
 *     例如无序数组。
 * 
 * 设计api：
 *     let p = new PriorityQueue(func)
 *     p.add({name:xxx,age:18}) //add 仅支持传入对象
 *     p.add({name:xx,age:75})
 *     p.printf()//=> [75,18]
 *     用户可以传入优先级判断函数，比如设定年龄大的优先级高
 *     优先队列作用结果就是:p.arr = [75,18]
 *                        p.shift() // 弹出队首元素
 *     传入的函数应该是 
 *              func = (node1,node2)=>node2.age-node1.age 
 * 插入思路：
 *     遍历当前元素，类似于插入排序
 */

class PriorityQueue{
    constructor(cb){
        this.arr = [];// 保存对象
        this.cb = cb;
    }
    add(node){
        this.arr.push(node)
        // 如果队列不只一个元素 从后到前按照优先级插入
        if(this.arr.length){
            // 最后一个元素是新进的元素/从倒数第二个开始排查 node优先级比
            for(let i= this.arr.length-2;i>=0&&this.cb(this.arr[i],node);i--){
                // swap 交换 
                let temp = this.arr[i];
                this.arr[i] = node;
                this.arr[i+1] = temp;
            }
        }
    }
    shift(){
        this.arr.shift()
    }
    print(){
        console.log(this.arr)
    }
}
/*
let pQueue = new PriorityQueue((node1,node2)=>{
    if(node1.age>node2.age){
        return -1
    }
    return 1
});
const data = [
    {name:'xiaoming',age:15},
    {name:'xiaohe',age:32},
    {name:'xiaowang',age:72}
]
data.forEach(item=>{
    pQueue.add(item)
})
pQueue.print()
*/
module.exports = PriorityQueue