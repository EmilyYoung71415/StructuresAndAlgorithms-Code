/**
 * 
 * @desc 不仅先来先走，还有可以设置优先级。(就像银行会员卡一样)
 * 设置优先级，然后在正确的位置添加元素
 * 
 * @example:
 *  q.push('xiaoming',2) //优先级越高越在前面
 * 
 * 
 * 插入思路：
 *  splice ： 插入元素索引，删除元素个数（从索引开始） 插入的数
 *  每次插入新元素时，遍历当前元素的优先级，遇到优先级更大的，就插入在他的前面
 *  
 * // 遍历完 仍没有插入 则两种情况
 *  1.  队列为空 直接入队
 *  2.  自己优先级最低，尾插入
 */



 function Queue(elem,prio){
    this.elem = elem;
    this.prio = prio;
 }
 function PriorityQueue(){
    this.arr = [];
    this.insertFlag = false;
 }


 PriorityQueue.prototype = {
    add:function(elem,prio){
        let newNode = new Queue(elem,prio);
        for(let i in this.arr){
            if(newNode.prio<this.arr[i].prio){
                this.arr.splice(i,0,newNode);
                this.insertFlag = true;
                break;
            }
        }

        // 未插入情况
        if(!this.insertFlag){
            this.arr.push(newNode);
        }
    },
    poll:function(){
        return this.arr.shift();
    },
    size:function(){
        return this.arr.length;
    },
    print:function(){
        for(let i in this.arr){
            console.log(this.arr[i]);
        }
    }
 }

 let arr2 = new PriorityQueue();
 arr2.add('xiaohong',9);
 arr2.add('xiaohong1',38);
 arr2.add('xiaohong3',2);
arr2.print();