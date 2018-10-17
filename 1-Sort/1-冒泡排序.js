/**
 *  @desc 冒泡排序
 *  基本思想: 每次比较两个相邻的元素，如果它们的顺序错误就把它们交换过来。
 *           如同一个气泡，一步步向后翻滚，直到最后一个,这样最后的元素即是最大的数
 *  算法复杂度
 *      时间复杂度   最优O(n)  最差O(n^2)  平均O(n^2) 
 *      空间复杂度 O(1) 
 *      稳定性 √
 * 
 * 深入：
 *      最差： 全部逆序
 *      那最优的情况：O(n)怎么来的？
 *      ==-> 正序，正序的时候，不会发生交换
 *          此时 如果 代码稍微改进一下就可以实现 O(n)
 * 
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


// 正序 时改进
function bubbleSort2(arr) {
    if (arr == null || arr.length < 2) {
        return;
    }　　
    let isSwap;
    for(let len = arr.length;len>0;len--){
        isSwap = false;
        for(let i=0;i<len;i++){
            // 开始比较 每一个邻居
            if(arr[i]>arr[i+1]){
                swap(arr,i,i+1);
                isSwap = true;// 一旦当轮发生了交换
            }
        }
        // 只要 以某数为指标的当前轮 没有发生交换 
        // 那么证明 在他之前的数都是有序的了
        // 所以就不需要 再缩小比较范围  进行下一轮比较了
        if(!isSwap){
            return arr;
        }
    }　
    return arr;
}