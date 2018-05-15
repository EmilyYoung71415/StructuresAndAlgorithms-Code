/**
 *  @desc 冒泡排序
 *  基本思想: 每次比较两个相邻的元素，如果它们的顺序错误就把它们交换过来。
 *           如同一个气泡，一步步向后翻滚，直到最后一个,这样最后的元素即是最大的数
 *  算法复杂度
 *      时间复杂度   最优O(n)  最差O(n^2)  平均O(n^2)
 */

function bubbleSort(arr) {
    if (arr == null || arr.length < 2) {
        return;
    }　　
    for(let len = arr.length;len>0;len--){
        for(let i=0;i<len;i++){
            if(arr[i]>arr[i+1]){
                swap(arr,i,i+1);
            }
        }
    }　
    return arr;
}

function swap(arr,i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}