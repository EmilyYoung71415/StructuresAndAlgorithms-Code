/**
 * @desc 堆排序
 * 基本思想：(假设升序)
 *     堆(大顶堆)的基本知识回顾：
 *          堆满足每棵树的root > 左子树 && root>右子树。
 *          同样子树的也满足 root > left && root > right 
 *          所以，堆顶元素是最大的。
 *      
 *     堆排思想:
 *          遍历arr建立一个原始的堆，满足堆的基本性质，
 *          将堆顶元素与arr[arr.length-1]交换，此时确定有序数组最大的元素
 *          然后抛开最大的元素 剩下的树节点看作新堆，调整堆的顺序，得到新的大顶堆
 *          将新堆顶元素与 arr[arr.length-2]交换，确定第二大的元素
 *     
 *      关键步骤:
 *          1.初始化建立大根堆 得到无序大根堆，但堆顶可以确定是最大的元素
 *          2.交换堆顶与数组最后一位的数，得到最后一个元素是排好序的 待排序堆size--
 *          3.happify过程,恢复正常堆
 *          4.当范围缩小为0时， 即排查完毕
 * 
 * 总结：
 *      时间复杂度:建立堆的操作O(N)  排查基于二叉 时间复杂度O(N*logN)，
 *      额外空间复杂度O(1) 不能做到稳定性
 * 
 * 快在哪里?
 *      每次确定遍历当前轮不仅确定了最大元素过程，还实现了堆校正，
 *      将比较过程产生的效果给利用了下来。
 *      可以看成堆排序是对简单选择排序的改进
 * 
 */

const {Heap} =  require('../index');

let res = heapSort([1,3,4,5,2,6,9,7,8,0])
console.log(res)

/********************************
 * 1、建立堆：遍历数组元素 使得 数组元素 符合 堆的结构
 *      从第一个非叶子节点开始依次对数组中的元素进行下沉操作
 * 
 * 
 */
function heapSort1(arr){
    if(arr==null) return;
    
    // 建立堆（升序 则需要建立 大顶堆）：使得每个树都是父节点大于子节点
    // 堆调整：不断将堆顶元素放到数组末尾 后期adjust缩小范围的过程
    for(let i=0;i<arr.length;i++){
        heapInsert(arr,i);
    }

    // 最大的元素在arr[0] 将堆顶元素交换到数组末
    swap(arr,0,arr.length-1);

    // 调整堆节点
    let len = arr.length-1;
    while(len>0){
        // 将堆顶元素向下调整，交换当前数组最后一个与元素第0个
        happify(arr,0,len);
        swap(arr,0,--len);
    }
    return arr;
    // 将index下标的元素向下调整，边界为size
    function happify(arr,index,size){
        let lIndex = index*2+1;
        
        while(lIndex<size){
            // 在左右节点、本身找到更大的一个
            let largestIndex = lIndex+1<size && arr[lIndex+1]>arr[lIndex] ? lIndex+1 : lIndex;
            largestIndex = arr[largestIndex]>arr[index] ? largestIndex : index;
            // 如果是本身则不需要swap
            if(largestIndex == index) break;
            
            swap(arr,index,largestIndex);
            index = largestIndex;
            lIndex = index*2 + 1;
        }

    }
   
    function heapInsert(arr,index){
        let pIndex = (index/2)>>0;
        // 大顶堆 如果当前元素 > 父亲 则需要swap
        while(pIndex>=0 && arr[index]>arr[pIndex]){
            swap(arr,index,pIndex);
            index = pIndex;
            pIndex = (index/2)>>0;
        }
    }

    function swap(arr,i,j){
        [arr[i],arr[j]] = [arr[j],arr[i]];
    }
}



// 直接调heap
function heapSort(arr){
    if (!arr.length < 1) return;
    let result = []
    let heap = new Heap('min');
    // 建立堆
    arr.forEach(item => {
        heap.add(item)
    });
    while (!heap.isEmpty()) {
        result.push(heap.pop());
    }
    return result;
}