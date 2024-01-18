/****
 * 堆排：
 *      在排序过程中将[0...n]看成一个完全二叉树，利用父子节点之间的关系
 *      升序:大顶堆,降序:小顶堆
 *      堆经常被用来实现优先级队列
 *      堆排序关键:构建堆、堆调整
 *      nlogn
 */
let arr = [1,3,4,5,2,6,9,7,8,0];
console.log(heapSort(arr))
function heapSort(arr){
    if(arr==null) return;
    
    // 建立堆
    for(let i=0;i<arr.length;i++){
        heapInsert(arr,i);
    }

    // 最大的元素在arr[0] 将堆顶元素交换到数组末
    let len = arr.length;
    swap(arr,0,--len);

    // 调整堆节点
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
            
            // ❗ let largestIndex = lIndex+1<size&&arr[lIndex]>arr[lIndex+1]?lIndex:lIndex+1;
            // 体会两句差别:下面这句才是正确的 当右子节点存在且右子节点 > 左子节点
            let largestIndex = lIndex+1<size&&arr[lIndex+1]>arr[lIndex]?lIndex+1:lIndex;
            largestIndex = arr[largestIndex]>arr[index]?largestIndex:index;
            // 如果是本身则不需要swap
            if(largestIndex == index){
                break;
            }
            
            swap(arr,index,largestIndex);
            index = largestIndex;
            lIndex = index*2 + 1;
        }

    }
   
    function heapInsert(arr,index){
        let pIndex = (index/2)>>0;
        // 大顶堆 如果当前元素 > 父亲 则需要swap
        while(pIndex>=0&&arr[index]>arr[pIndex]){
            swap(arr,index,pIndex);
            index = pIndex;
            pIndex = (index/2)>>0;
        }
    }

    function swap(arr,i,j){
        [arr[i],arr[j]] = [arr[j],arr[i]];
    }
}
