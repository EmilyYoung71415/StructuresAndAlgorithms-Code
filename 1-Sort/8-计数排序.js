/**
 * @desc 计数排序就是弱化的桶排序 即每个桶存储单一键值
 * 转为程序思维：
 *      申请一个等同大小的空间 每个桶放一类数据    
 *      元素值与桶下标对应(打印时对着桶下标开始打印)
 *      如果桶没有值则初始化为0；否则++
 *      打印输出时桶的计数有几个打印几次数(输出依次排好队)
 */

function countingSort(arr, maxValue) {
    var bucket = new Array(maxValue + 1),
        sortedIndex = 0,
        arrLen = arr.length,
        bucketLen = maxValue + 1;

    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (var j = 0; j < bucketLen; j++) {
        while (bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }

    return arr;
}