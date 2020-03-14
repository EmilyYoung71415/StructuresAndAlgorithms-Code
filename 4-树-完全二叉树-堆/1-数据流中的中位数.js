/***
 * https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/
 * 剑指offer 41 & leetcode: 295
 * 设计一个支持以下两种操作的数据结构：
        void addNum(int num) - 从数据流中添加一个整数到数据结构中。
        double findMedian() - 返回目前所有元素的中位数。
 */
// addNum(1)
// addNum(2)
// findMedian() -> 1.5
// addNum(3) 
// findMedian() -> 2

// 进阶
// 如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
// 如果数据流中 99% 的整数都在 0 到 100 范围内，你将如何优化你的算法？

/*******
 *  数据流的中位数
 *  思路：  数据流的第k大数=> 维护一个k大的小顶堆容器。堆顶元素就是第k大的
 *         中位数带来的变化： 5个数的时候 => 中位数是第3大的数
 *                          6个数的时候 => 中位数= 第3、4大的数的平均值
 *  容器的选择:
 *      1、数组
 *      无序数组找到中位数：partition函数 O(N)
 *      插入数：O(1)     
 *      
 *      有序数组：插入O(n) 找出中位数O(1)
 * 
 *      2、排序链表
 *      插入：O(N)
 *      找到：维护两个指针指向链表中间的节点，O(1)时间得到中位数
 * 
 *      3、二叉搜索
 *      插入：O(logn)，但是极度不平衡的状态下 二叉搜索会退化成排序的链表，此时仍为O(N)
 *      查找：二叉树节点新增 子树节点个数的字段， ==> logn
 *      =》 优化 AVL： 插入 logn，查找O(1)
 * 
 *      4、大顶堆 和 小顶堆 
 *      将数据平均分成两个部分，左边的<右边的  （中位数是根据数的个数来的 而不是平均值
 *      中位数：左边的最大的元素 & 右边最小的元素
 *      左边：大顶堆 、 右边：小顶堆
 *      时间效率：插入依赖于堆的插入：logn， 查找：O(1)
 * 
 *      实现细节：
 *          1、数据平均分配到两个堆，偶数时 数插入最小堆，奇数时最大堆
 *          2、左边的大顶堆的所有数据都要 < 右边的小顶堆的所有数据  
 *          ==> 当一个新数 由于分配规则 准备插入小顶堆时， 有可能数比 大顶堆的堆顶元素 还小
 *               ==> 数插入 大顶堆，大顶堆的堆顶元素 拿出来 插入到小顶堆
 */
const {Heap} =require('./index');


class MedianFinder {
    constructor() {
        this.maxHeap = new Heap('max');
        this.minHeap = new Heap('min');
    }
    addNum(num) {
        if(this.maxHeap.peek === null || num < this.maxHeap.peek) {
            this.maxHeap.add(num);
        } 
        else {
            this.minHeap.add(num);
        }
        
        if(this.maxHeap.size - this.minHeap.size > 1) {
            this.minHeap.add(this.maxHeap.poll());
        } 
        else if(this.minHeap.size - this.maxHeap.size > 1) {
            this.maxHeap.add(this.minHeap.poll());
        }
    }
    findMedian() {
        if (this.maxHeap.size > this.minHeap.size) {
            return this.maxHeap.peek;
        } 
        else if (this.maxHeap.size < this.minHeap.size) {
            return this.minHeap.peek;
        } 
        else {
            return (this.maxHeap.peek + this.minHeap.peek) / 2;
        }
    }
}