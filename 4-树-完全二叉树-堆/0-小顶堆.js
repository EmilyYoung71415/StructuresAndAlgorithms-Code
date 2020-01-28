/****
 * 小顶堆：根<=左 && 根<=右
 * [1,2,3,17,19,36,7,25,100];         
 *           1
 *       /       \  
 *      2         3   
 *    /   \     /   \
 *   17   19   36    7
 *  / \
 * 25 100   
 * 
 */

const Heap = require('./0-heap');

class MinHeap extends Heap{
    compare(properIndex,index){
        return this.arr[properIndex] <= this.arr[index];
    }
}

module.exports = MinHeap

// let minheap = new MinHeap();
// const arr = [3,12,21];
// arr.forEach(item=>{
//     minheap.add(item)
// })
// console.log(minheap.arr)