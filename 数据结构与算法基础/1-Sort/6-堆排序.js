/**
 * @desc 堆排序---
 * 基本思想：堆是对简单选择排序的改进，
 *      ===》 选择排序并没有把每一趟的比较结果记录下来
 *           如果可以做到每次选择到最小记录时，并根据比较结果对其他记录进行调整
 *      堆(完全二叉树)，堆由数组模拟而得。
 *          已知父节点为i 
 *              左节点：2*i+1 右节点:2*i+2
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
let res = heapSort([1,3,4,5,2,6,9,7,8,0])
//console.log(res)
 function heapSort(arr){
    if(arr===null ||arr.length<2){
        return;
    }
    // 建立大根堆
    for(let i=0;i<arr.length;i++){
        heapInsert(arr,i)
    }
    console.log(arr)
    let size = arr.length;
    // 交换根与末尾的数 
    swap(arr,0,--size);
    // 开启每轮向下调整，
    //即每轮找到该范围堆的最大值，推至堆顶，再交换堆顶(最大元素至堆末)
    // 堆末为已确定的堆元素，缩小堆范围
    while(size>0){
        // 得到该轮比较的大值
        happify(arr,0,size);
        swap(arr,0,--size);
        console.log('-----交换堆顶------')
        console.log(arr)
        console.log('-----------')
    }
    return arr;
 }

/****
 * 建立的初始堆：
 *      过程：　遍历数组元素，每遇到当前节点就找他的父节点　~~((i-1)/2)
 *             如果当前节点　＞　父节点　，那么就交换
 *          　　同时　更替当前节点的索引，一直追溯，保证该链路上的　所有父节点都比当前节点大
 *                  （小的早被交换了）
 * 
 *      结果：
 *              由于每条链路都保卫了　最终端的父比子大，那么建堆会确定一个最大元素
 *              生成的堆是　堆顶为最大元素的　　无序堆
 *              同时还有个特征：        
 *                  每条链路　都能保证，父　＞　子
 */
function heapInsert(arr,index){
    // 如果当前节点 > 父节点 交换 向上溯 index = pIndex
    while(arr[index]>arr[~~((index-1)/2)]){
        swap(arr,index,~~((index-1)/2));
        index = ~~((index-1)/2);
    }
}
/****
 * 调整堆，swap，调整、swap，知道确定的元素满arr
 * 怎么灾后重建的?
 *      由于目前的灾是： 每一条路线下 都能保证当前元素大于子元素（除了顶元素）
 *              所以将 顶部元素 依次往下交换（与子节点最大元素）
 *              调整完之后，顶部元素来到了 数组末尾，
 *              而此时的顶元素亦然是最大的。
 *              所以又开始 交换顶部元素 与 末尾元素
 * 
 */
function happify(arr,index,size){
    let left = index * 2 + 1;// 对当前节点找子节点 
    while(left<size){
        // 子节点取最大值节点
        let largest = left+1<size&&arr[left+1]>arr[left]?left+1:left;
        // 最大子节点与当前节点比较
        largest = arr[largest]>arr[index]?largest:index;
        // 出现三种情况:最大的是 左子、右子、本身，只要本身不需要交换
        if(largest === index){
            break;
        }
        // 以下均是要交换的情景
        swap(arr,index,largest);
        console.log(arr)
        // 继续向下排查 当前节点  = 子节点
        index = largest;
        left = index * 2 + 1;
    }
    console.log('-----happify过程------')
}


function swap(arr,index1,index2){
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}







