/**
 * @desc 归并排序
 * 基本思想：
 *         分而治之，即判断一整块数的排序很难，但是我可以不断迭代得到最后两两的组合
 *         排好序的两个数再依次和另外两个相合并
 * 
 * 代码思维：
 *         先分而治之：不断分解，直到只剩最后两个一组
 *          对排好的序两队进行合并
 */

function mergeSort(arr) { // 采用自上而下的递归方法
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}