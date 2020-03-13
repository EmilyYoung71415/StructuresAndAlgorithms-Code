/*****
 * leecode:23
 * 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。
 */
// 输入:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 输出: 1->1->2->3->4->4->5->6

/****
 * 思路：
 *      way1: 小顶堆
 *      合并两个有序链表：两个链表的迭代指针，互相比较，谁小谁就往下走
 *      多个：
 *          1、多个迭代指针，找出最小的那个
 *          ===》 实时数据流里找出最小的那个数 典型的堆问题
 *      时间复杂度：Nlogk，空间：O(n) + O(k)
 * 
 *      way2: 分治
 */
// way1: 
class Heap {
    constructor(comparator) {
        this.data = [];
        this.comparator = comparator || ((parent, child) => parent - child);
    }

    get size() {
        return this.data.length;
    }

    bubbleUp(c) {
        if (c === 0) return;
        const p = Math.floor((c + 1) / 2) - 1;
        if (this.comparator(this.data[p], this.data[c]) > 0) {
            [this.data[p], this.data[c]] = [this.data[c], this.data[p]];
        }
        this.bubbleUp(p);
    }

    bubbleDown(p) {
        const c = 2 * (p + 1) - 1;
        if (c >= this.data.length) return;

        const leftDelta = this.comparator(this.data[p], this.data[c]);
        const rightDelta = c + 1 >= this.data.length ? 0 : this.comparator(this.data[p], this.data[c + 1]);
        if (leftDelta <= 0 && rightDelta <= 0) return;

        const swapChildIndex = c + (leftDelta <= rightDelta);
        [this.data[p], this.data[swapChildIndex]] = [this.data[swapChildIndex], this.data[p]];
        this.bubbleDown(swapChildIndex);
    }

    add(val) {
        this.data.push(val);
        this.bubbleUp(this.data.length - 1);
    }

    poll() {
        if (this.size < 2) return this.data.pop();
        [this.data[0], this.data[this.size - 1]] = [this.data[this.size - 1], this.data[0]];
        const val = this.data.pop();
        this.bubbleDown(0);
        return val;
    }
}

function mergeKLists(lists) {
    if (!lists.length) return null;
    
    const minHeap = new Heap((parent, child) => parent.val - child.val);
    // 将链表的头节点放入堆里 此后的遍历 根据各自的头节点找next节点 
    for (let node of lists) {
        node && minHeap.add(node);
    }
    
    let dummy = new ListNode();
    let p = dummy;

    while (minHeap.size) {
        p.next = minHeap.poll();
        p = p.next;
        p.next !== null && minHeap.add(p.next);
    }
    
    return dummy.next;
}


// way2 
function mergeKLists(lists) {
    return mergeKListsCall(lists, 0, lists.length - 1);

    function mergeKListsCall(lists, start, end) {
        if (start === end) {
            return lists[start];
        } 
        else if (start < end) {
            const mid = parseInt((start + end) / 2);
            const left = mergeKListsCall(lists, start, mid);
            const right = mergeKListsCall(lists, mid + 1, end);
            return mergeTwoLists(left, right);
        } 
        return null;
    }

    function mergeTwoLists(l1, l2) {
        if(l1==null) return l2;
        if(l2==null) return l1;
        if(l1.val<l2.val){
            l1.next = mergeTwoLists(l1.next,l2);
            return l1;
        }else{
            l2.next  = mergeTwoLists(l1,l2.next);
            return l2;
        }
    };
};