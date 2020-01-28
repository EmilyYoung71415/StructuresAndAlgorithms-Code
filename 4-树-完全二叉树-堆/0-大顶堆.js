/****
 * 大顶堆：根>=左 && 根>=右
 * [100,36,25,19,17,7,3,2,1];         
 *          100
 *       /       \  
 *      19       36   
 *    /   \     /   \
 *   17    3   25    1
 *  / \
 * 2   7   
 * 
 */

const Heap = require('./0-heap');

class MaxHeap extends Heap{
    compare(properIndex,index){
        return this.arr[properIndex] >= this.arr[index];
    }
}


module.exports = MaxHeap
// let maxheap = new MaxHeap();
// const arr = [1,2,3,17,19,36,7,25,100];
// arr.forEach(item=>{
//     maxheap.add(item)
// })
// maxheap.add(55)
// maxheap.poll()
// maxheap.remove(36)
// console.log(maxheap.arr)