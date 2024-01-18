/****
 * 类型：大顶堆、小顶堆
 * 特点：
 *     大顶堆：每个root结点元素不 小 于其子节点
 *     小顶堆：每个root结点元素不 大 于其子节点
 * 结构：
 *     堆的底层是一棵完全二叉树, 每个节点与满二叉中结点一一对应，所以可以用数组实现 空间复杂度O(1)
 *     数组表示的完全二叉树的结点特点：
 *       左子节点: 2*index+1，
 *       右子节点: 2*index-1，
 *       父节点：  Math.floor(index-1)/2;
 * 方法：
 *      插入、移除、弹出堆顶元素poll、get堆顶元素peek，遍历
 *      建立堆：O(n)
 *      插入删除类似都取决于堆的调整：O(logn)
 *      遍历：
 *          堆是为了实现排序而设计，一般堆不遍历，因为子节点没有相互约束的关系无法决定下个节点走向
 *          遍历每个元素时，堆相当于无序结构
 * 实现：
 *      大顶堆：
 *          从第一个非叶子节点开始依次对数组中的元素进行下沉操作
 *          1、
 * 与二叉搜索树对比：
 *     堆只是限定了某结点的值大于（或小于）其左右孩子结点的值，
 *     没有限定左右孩子结点之间的大小关系
 */

class Heap {
  constructor(type) {
    // type === max or min 大顶堆 or 小顶堆
    this.type = type;
    this.arr = [];
  }
  get size() {
    return this.arr.length;
  }

  get peek() {
    if (this.size == 0) return null;
    return this.arr[0];
  }
  add(x) {
    this.arr.push(x);
    this.heapifyUp();
  }
  heapifyUp(childIndex = this.size - 1) {
    let pIndex = this.getPIndex(childIndex); //父节点index
    while (pIndex >= 0 && !this.compare(pIndex, childIndex)) {
      //有父节点
      this.swap(this.arr, childIndex, pIndex);
      childIndex = pIndex;
      pIndex = this.getPIndex(childIndex);
    }
  }
  heapifyUp_r(childIndex = this.size - 1) {
    if (childIndex === 0) return;
    let pIndex = this.getPIndex(childIndex); //父节点index
    if (pIndex >= 0 && !this.compare(pIndex, childIndex)) {
      this.swap(this.arr, childIndex, pIndex);
    }
    this.heapifyUp_r(pIndex);
  }
  poll() {
    if (this.size === 0) return null;
    if (this.size === 1) return this.arr.pop();
    let peek = this.peek;
    this.arr[0] = this.arr.pop();
    this.heapifyDown();
    return peek;
  }
  // 向下跳转堆顶元素 堆顶出现新元素之后的调整堆
  heapifyDown(pIndex = 0) {
    // 该节点的两个子节点的下标
    let len = this.size,
      nextIndex = null,
      rIndex = pIndex * 2 + 2,
      lIndex = pIndex * 2 + 1;

    while (lIndex < len) {
      // 以大顶堆为例
      // 左子、右子、自身 三个元素的大小比较，选择了最大的元素 和 自身比较，如果仍是自身大的话 就无需ajust
      nextIndex = rIndex < len && this.compare(rIndex, lIndex) ? rIndex : lIndex;
      if (this.compare(pIndex, nextIndex)) break;

      // 其余情况都要交换
      this.swap(this.arr, pIndex, nextIndex);
      pIndex = nextIndex;
      rIndex = pIndex * 2 + 2;
      lIndex = pIndex * 2 + 1;
    }
  }
  heapifyDown_r(pIndex = 0) {
    if (pIndex >= this.size) return;
    let rIndex = pIndex * 2 + 2;
    let lIndex = pIndex * 2 + 1;
    let swapChildIndex = rIndex < len && this.compare(rIndex, lIndex) ? rIndex : lIndex;
    if (lIndex >= len || this.compare(pIndex, swapChildIndex)) return;
    this.swap(this.arr, pIndex, swapChildIndex);
    this.heapifyDown_r(swapChildIndex);
  }
  getPIndex(index) {
    return (index / 2) >> 0;
  }
  compare(properIndex, index) {
    // 更适合的元素
    if (this.type === 'max') {
      return this.arr[properIndex] >= this.arr[index];
    }
    return this.arr[properIndex] <= this.arr[index];
  }
  swap(arr, index1, index2) {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  }
  // isEmpty(){
  //     return !this.arr.length;
  // }
  // find(x){
  //     let result = [];
  //     this.arr.forEach((item,index)=>{
  //         if(item == x){
  //             result.push(index);
  //         }
  //     })
  //     return result;
  // }
  // remove(x){
  //     // 遍历数组找到 值等于x的所有元素，存放元素下标
  //     const removeIndexArr = this.find(x);
  //     for(let i=0;i<removeIndexArr.length;i++){
  //         // 预删除元素的最新下标 (每次遍历的时候 需要新find一下 因为堆调整要改变数组元素的位置)
  //         let itemIndex = this.find(x).pop();

  //         // 最后一个元素 直接Pop 无需堆调整
  //         if(itemIndex ==  this.arr.length-1){
  //             this.arr.pop()
  //         }
  //         else{
  //             // 将堆末尾的元素 移至预删除元素位置
  //             // 转换为删除末尾元素
  //             this.arr[itemIndex] = this.arr.pop();

  //             // 找当前删除元素的父元素
  //             // 如果父元素是合适的 or 没有父元素 就向下调整 (并且孩子节点存在)
  //             // 父元素不合适 向上调整
  //             let pIndex = this.getPIndex(itemIndex),
  //                 lIndex = itemIndex*2 + 1;
  //             if(lIndex < this.arr.length-1 && (!this.arr[pIndex] || this.compare(pIndex,itemIndex))) {
  //                 this.heapifyDown(itemIndex);
  //             }
  //             else {
  //                 this.heapifyUp(itemIndex);
  //             }
  //         }
  //     }
  // }
}
module.exports = Heap;
