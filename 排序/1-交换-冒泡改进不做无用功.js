/***
 *    当 数是 2 1 3 4 5 6 7 8 9
 *    第一趟之后就已经有序了
 *      1 2 3 4 5 6 7 8 9 
 *    本应该终止算法，然而却因为冒泡以只确定了最大的9
 *    还要继续 size-- 依次确定剩下的位数
 *    所以我们可以设定一个标识位
 *    ===》 当 该趟排序未发生交换时，则已有序，那么无需size--
 */
const swap = require('./swap');
console.log(bubbleSort([2,1,3,4,5,6,7,8,9]))
function bubbleSort(arr) {
    if (arr === null || arr.length < 2) {
        return;
    }
    let Flag = false; // 初始化为 false，尚未排完
    for (let len = arr.length; len > 0&&!Flag; len--) {
        Flag = true;// 每趟内部排序时又置于true 假设无需排序
        // 只有swap之后才是交换了顺序
        for (let i = 0; i < len; i++) {
            if(arr[i]>arr[i+1]){
                swap(arr,i,i+1);
                Flag = false;
            }
        }
    }
    return arr;
}