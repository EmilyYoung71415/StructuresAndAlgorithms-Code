/****
 * https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/
 * 输入整数数组 arr ，找出其中最小的 k 个数。
 */
// 输入：arr = [3,2,1], k = 2
// 输出：[1,2] 或者 [2,1]

// 输入：arr = [0,1,2,1], k = 1
// 输出：[0]

/*****
 * 思路：
 *      way1、排序，返回前k个 O(nlogn)
 *      way2、O(n) partition启发 需要修改原数组
 *           [xxx,第k大的数字,xxx]
 *          即一直校正，直到有一次 随机选择的数 被调整后放在了k位
 *      way3、堆 O(nlogk)
 */
let arr = [0,0,2,3,2,1,1,2,0,4];
let k = 10;
console.log(getLeastNumbers(arr, k));
// way2: 注意case： k>=len时
function getLeastNumbers(arr, k) {
    let len = arr.length;
    if (k >= len) return arr;
    let start = 0;
    let end = len - 1;
    let randomIndex = partition(arr, start, end);
    while (randomIndex !== k) {
        if (randomIndex <= k) {
            start = randomIndex + 1;
            randomIndex = partition(arr, start, end);
        }
        else {
            end =  randomIndex - 1;
            randomIndex = partition(arr, start, end);
        }
    }

    return arr.slice(0,k);

    function partition(arr, l, r) {
        if (l>r) return;
        let pivot = arr[r];
        let bounder = l-1;
        
        for (let i=l; i<=r; i++) {
            if (arr[i] <= pivot) {
                bounder++;
                // swap(arr,bounder,i);
                [arr[bounder], arr[i]] = [arr[i], arr[bounder]];
            }
        }
        return bounder;
    }
}

// way3
/********************************
 *  维护容量为k的容器，
 *      当容器内的元素个数<k时候，直接push数据，
 *      当容器满了又想塞入新数据时，找出容器内最大值  与 待塞入值比较，谁小谁进来
 *      
 *      当容器满的时候，需要做的三件关键的事：
 *          1、k个数里找到最大数 ====> 大顶堆 O(1)
 *          2、在容器里删除最大数
 *          3、插入新的数
 *          删除 & 插入 O(logk)
 * 综上复杂度O(nlogk)
 * 优点： 适合 n很大，k很小的情景，在梳理海量数据面前有明显优势，找k大就只需要k容量的容器
 * ===>
 *      当需要在容器内频繁查找并替换最大值时，堆很适合
 */
// 伪码，具体的堆实现见堆
function getLeastNumbers(arr, k) {
    // MaxHeap.add peek poll
    let heap = new MaxHeap();
    
    arr.forEach(item => {
        if (heap.size < k) {
            head.add(item);
        }
        else {
            let curMax = heap.peek();
            if (curMax > item) {
                heap.poll();
                heap.add(item);
            }
        }
    });

    return heap.arr;
}