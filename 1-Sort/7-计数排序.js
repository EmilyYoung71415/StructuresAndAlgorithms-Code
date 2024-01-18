/**
 * @desc 计数排序就是弱化的桶排序 即每个桶存储单一键值
 *  基本思想：
 *      如果所有的数是10以内的，然后申请10个桶，遍历到相应数时就在数组的相应下标计数。
 *      输出时遍历木桶，如果木桶里没有数则不输出，有数则遍历输出（有可能一个桶里有很多数）
 *      
 *      判断一串数中最大值。那么申请的数组空间就是maxValue + 1
 *      我们的桶排好就是0-maxvlue+1
 *      比如最大为9 ，arr[9]++; 所以需要10个桶(从0开始计数)
 *      
 *      非基于比较，对数据的位数和范围有限制。
 *      具体到实现可落地为： 计数排序(如下实现) 和基数排序(范围更大)
 *      时间复杂度O(N)，额外空间复杂度O(N)，实现做到稳定性
 * 总结：简单、快速      
 * 时间复杂度O(N)，额外空间复杂度O(N)，实现做到稳定性
 */
function countingSort(arr) {

    let maxValue = Math.max.apply(Math, arr);
    let bucket = new Array(maxValue + 1),
        sortedIndex = 0,
        arrLen = arr.length,
        bucketLen = maxValue + 1;
    // 遍历数组，初始化桶
    for (let i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }
    // 遍历桶输出数据
    for (let j = 0; j < bucketLen; j++) {
        while (bucket[j]-- > 0) {
            arr[sortedIndex++] = j;
        }
    }

    return arr;
}