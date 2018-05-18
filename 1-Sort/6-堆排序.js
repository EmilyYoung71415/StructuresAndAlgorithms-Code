/**
 * @desc 堆排序---
 * 基本思想：
 *      堆(完全二叉树)，堆由数组模拟而得。
 *          已知父节点为i 
 *              左节点：2*i-1 右节点:2*i+1
 *          已知子节点i
 *              父节点: (i-1)/2
 *      堆分为：大根堆和小根堆，升序排序采用大根堆，降序排序采用小根堆。
 *      大根堆:不断将值最大的节点调整至堆顶
 *      堆排序过程：(以升序为例
 *          1.初始化建立大根堆 得到无序大根堆，但堆顶可以确定是最大的元素
 *          2.交换堆顶与数组最后一位的数，得到最后一个元素是排好序的 待排序堆size--
 *          3.happify过程：0-待排序堆.size 为一轮，从0开始逐子往下排，
 *              确保当前节点是大于子节点的
 *              怎么确保？ 当前节点和子节点的最大值比较即可
 *              如果子节点最大值大于当前节点，则"篡位\换主"
 *              每一次范围为0-size的排查之后，总会确定一个最大的元素即排查后的堆顶元素
 *              交换堆顶与数组的最后一个数 将堆顶划为"排好序的队列中"
 *          4.当范围缩小为0时， 即排查完毕
 * 总结：
 *      关键就是两步：
 *      1.heapInsert()---初始化将普通数组对应为某特定堆
 *      2.heapify()---排查
 *      建立堆的操作O(N)         
 *      排查 基于二叉
 *      时间复杂度O(N*logN)，额外空间复杂度O(1)
 *      但不能做到稳定性
 *      每轮比较找到最大值的思想有点像冒泡过程，但是他是跳跃的 每轮是 left = 2*i+1 而不是left++
 *      排好序的划分 又有点像选择\插入排序
 * 
 *      注意Math.floor 一下
 * 时间复杂度   最优O(N*logN)  最差O(N*logN)  平均O(N*logN) 
 * 空间  O(1)
 * 稳定  实现不可以做到稳定性
 * 建堆操作o(N)
 */


 function heapSort(arr){
    if(arr===null ||arr.length<2){
        return;
    }
    // 建立大根堆
    for(let i=0;i<arr.length;i++){
        heapInsert(arr,i)
    }
    
    let size = arr.length;
    // 交换根与末尾的数 并缩小堆范围
    swap(arr,0,--size);
    // 开启每轮向下调整，
    //即每轮找到该范围堆的最大值，推至堆顶，再交换堆顶(最大元素至堆末)
    // 堆末为已确定的堆元素，缩小堆范围
    while(size>0){
        // 得到该轮比较的大值
        happify(arr,0,size);
        swap(arr,0,--size);
    }
    
 }

function heapInsert(arr,index){
    // 如果当前节点 > 父节点 交换 向上溯 index = pIndex
    while(arr[index]>arr[Math.floor((index-1)/2)]){
        swap(arr,index,Math.floor((index-1)/2));
        index = Math.floor((index-1)/2);
    }
}

function happify(arr,index,size){
    let left = index * 2 + 1;
    while(left<size){
        // 子节点取最大值节点
        let largest = left+1<size&&arr[left+1]>arr[left]?left+1:left;
        // 最大子节点与当前节点比较
        largest = arr[largest]>arr[index]?largest:index;

        if(largest === index){
            break;
        }
        // 以下均是要交换的情景
        swap(arr,index,largest);
        // 继续向下排查 当前节点  = 子节点
        index = largest;
        left = index * 2 + 1;
    }
}


function swap(arr,index1,index2){
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}







