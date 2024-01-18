/**
 * @desc 鸡尾酒冒泡
 *      改进点：
 *          传统冒泡仅仅是从低到高
 *          改进的：从低到高再从高到低
 *      以序列(2,3,4,5,1)为例
 *          鸡尾酒排序只需要访问一次序列就可以完成排序
 *          冒泡排序则需要四次
 * 
 *   时间复杂度   最优O(n)  最差O(n^2)  平均O(n^2)   
 */

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
}

function swap(arr,i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}