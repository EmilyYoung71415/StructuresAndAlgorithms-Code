/**
 * @desc 逆序对
 *       已知数列 1 6 3 7 2 4 9，如果数列中的两个数满足a[i]>a[j] && i<j,那么我们就说这两个数构成了逆序
 *       在一个数列中逆序对的总共个数是逆序数。求逆序对个数
 * 
 * @example      
 *      1 6 3 7 2 4 9
 *      ===> [6 3] [6 2] [6 4]
 *           [3 2] 
 *           [7 2] [7 4]
 *      return 6 
 * 
 *  思路：
 *      1. 双重循环思想 挨个比较
 *      2. 仔细分析可知，该题实际求的是排序过程 相邻两数两两比较时的交换次数
 *          ==> 归并合并化用了解一下？
 *              每次合并时如果交换了次数则记录下来  排完序后整个数列的总交换次数就出来了
 */
let arr = [1,6,3,7,2,4,9];
let res = mergeNum(arr)
//console.log(res)
function mergeNum(arr){
    if(arr===null||arr.length<2){
        return 0;
    }

    return mergeNumCal(arr,0,arr.length);
}

function mergeNumCal(arr,left,right){
    if(left===right){
        return 0;
    }
    let mid = left + ((right - left) >> 1);
    return mergeNumCal(arr, left, mid) + mergeNumCal(arr, mid + 1, right) +  merge(arr, left, mid, right);
}


function merge(arr,left,mid,right){
    let
        temp = [],
        i = 0,
        p1 = left,
        p2 = mid + 1,
        res = 0;// 逆序个数

    while (p1 <= mid && p2 <= right) {
        res += arr[p1]>arr[p2]?(mid-p1+1):0;
        temp[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
    }
    while (p1 <= mid) {
        temp[i++] = arr[p1++];
    }
    while (p2 <= right) {
        temp[i++] = arr[p2++];
    }

    for (let i = 0; i < temp.length; i++) {
        arr[left + i] = temp[i];
    }
    return res;
}