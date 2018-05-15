/**
 * @desc 插入改进之二分插入
 * 
 *  采用二分查找法来减少比较操作的次数 
 *  因为左边的数总是排好序的 所以在和左边比较时，可以采用二分
 * 
 * 时间复杂度   最优O(nlogn)  最差O(n^2)  平均O(n^2) 稳定
 * 
 */


let arr = [2, 5, 160, 1, 20]
insertionSortDichotomy(arr)

function insertionSortDichotomy(arr) {
    if (arr === null || arr.length < 2) {
        return;
    }
    for (let i = 1; i < arr.length; i++) {
        // i 从1开始表示每次新的元素

        // 二分法查找左边的已排好序的数 与新元素比较
        let
            temp = arr[i],
            left = 0,
            right = i - 1;
        while (left <= right) {
            let mid = ~~((left + right) / 2);
            if (arr[mid] > temp) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        //将欲插入新牌位置右边的牌整体向右移动一个单位
        for (let j = i - 1; j >= right+1; j--) {
            arr[j + 1] = arr[j];
        }
        arr[left] = temp;
    }
}