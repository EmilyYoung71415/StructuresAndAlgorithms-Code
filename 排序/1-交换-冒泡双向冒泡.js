/****
 * 双向冒泡排序
 * 在正反两个方向交替进行扫描
 * 第一趟把最大的放在末尾，第二趟把最小的放在队首，如此反复
 * 传统冒泡仅仅是从低到高 改进的：从低到高再从高到低
 * 
 * 以序列(2,3,4,5,1)为例
 *     鸡尾酒排序只需要访问一次序列就可以完成排序
 *     冒泡排序则需要四次
 * 
 */
const swap = require('./swap');
console.log(cocktailSort([2,3,4,5,1]));
function cocktailSort(arr) {
    if (arr == null || arr.length < 2) {
        return;
    }　　

    let 
        left = 0,
        right = arr.length-1;
    while(left<right){
        // 一轮中的 从左至右 将最大元素至于右边
        for(let i = left;i<right;i++){
            if(arr[i]>arr[i+1]){
                swap(arr,i,i+1);
            }
        }
        right --;
        // 一轮中的 从右至左 将最小元素至于左边
        for(let i = right;i>left;i--){
            if(arr[i-1]>arr[i]){
                swap(arr,i,i-1);
            }
        }
        left ++;

    }
    return arr;
}