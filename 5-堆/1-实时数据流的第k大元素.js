/*****
 * leetcode:703
 * 设计一个找到数据流中第K大元素的类。注意是排序后的第K大元素，不是第K个不同的元素
 * 每次调用 KthLargest.add，返回当前数据流中第K大的元素
 * 
 *  int k = 3;
    int[] arr = [4,5,8,2];
    KthLargest kthLargest = new KthLargest(3, arr);
    kthLargest.add(3);   // returns 4
    kthLargest.add(5);   // returns 5
    kthLargest.add(10);  // returns 5
    kthLargest.add(9);   // returns 8
    kthLargest.add(4);   // returns 8
 * 
 * 思路：
 * 1、新来元素找到最大的很容易实现，新进一个与max比较即可
 *    而这里是第k个最大的，所以相仿思路，保存k个数据 = arr
 *    新进来的元素会与arr的最小值比较 如果比最小值大，则把最小值剔除，sort更新arr，
 *  时间复杂度: n * k* logk 
 * 
 * 
 * 
 * 2、第k大的元素，可以一个k大的堆，堆顶是最小元素，即是第k大的元素
 *  时间复杂度：n * (1 or log2k) 堆调整：log2k
 * 
 * 
 * 2、建立一个二叉搜索树 中序遍历得到第k大。
 * 
 */

// way1:
class KthLargest1{
    constructor(k,nums){
        this.k = k;
        // 升序 取得后k个 。最小的元素是this.nums[0]
        nums.sort((a,b)=>a-b);
        if(nums.length>k){
            nums = nums.splice(nums.length-k);
        }
        this.nums = nums;
    }
    add(x){
        // nums没满 或 第k元素小于x 都需要push新数据并调整
        if(this.nums.length<this.k){
            this.nums.push(x);
            this.nums.sort((a,b)=>a-b);
        }   
        else if(this.nums[0]<x){
            this.nums.shift()
            this.nums.push(x);
            this.nums.sort((a,b)=>a-b);
        }
        console.log(this.nums[0])
        return this.nums[0];

    }
}



// 改进
/***
 * 降序排序 每次返回arr[k-1]
 * 每次add的时候 遍历数组，插入排序的思想，在有序数组合适位置插入
 *  if(x > arr[i]) 在i之前插入 x
 *  如果x是最小的 push
 */
class KthLargest{
    constructor(k,nums){
        this.k = k;
        this.nums = nums.sort((a,b)=>b-a);//降序 每次返回arr[k-1]
    }

    add(x){
        let len = this.nums.length;

        if(len<1){
            this.nums.push(x)
            return x;
        }

        for(let i=0;i<len;i++){
            if(this.nums[i] < x){
                this.nums.splice(i,0,x);
                break;
            }
            // x 最小 
            if(i==len-1){// 这样可以保证push的时候也是有序push的
                this.nums.push(x)
            }
        }

        return this.nums[this.k-1];
    }

}


// way2
const {MinHeap} = require('../index');
class KthLargest2{
    constructor(k,nums){
        this.k = k;
        this.heap = new MinHeap();
    
        nums.forEach(item => {
            this.heap.add(item);
        });   
        
        // 如果堆大小超过k了  弹出堆顶元素 只保留最大的k个元素
        while(this.heap.getLen()>k){
            this.heap.poll()
        }
    }

    add(x){
        if(this.heap.getLen()<this.k){
            this.heap.add(x)
        }
        // 如果当前堆顶元素第k大的 < 新来元素 剔除旧的新来元素是最大的
        else if(this.heap.peek()<x){ 
            this.heap.poll();
            this.heap.add(x)
        }
        // 返回堆顶元素
        console.log(this.heap.peek())
        return this.heap.peek()
    }
}

let arr = [5,-1],k=3;
let p = new KthLargest(k,arr);
p.add(2);   // returns 4
p.add(1);   // returns 5
p.add(-1);  // returns 5
p.add(3);   // returns 8
p.add(4);   // returns 8
