/**
 * @desc 桶排序
 *  桶排序就是强化版本的计数排序
 *  每个桶存储 一定范围类的键值，桶与桶之间的排序输出按照简单计数排序输出
 *  桶内部的数排序可选择插入排序或其他
 *  最差时间复杂度 ---- O(nlogn)或O(n^2)，只有一个桶，取决于桶内排序方式
    最优时间复杂度 ---- O(n)，每个元素占一个桶
    平均时间复杂度 ---- O(n)，保证各个桶内元素个数均匀即可
    所需辅助空间 ------ O(n + bn)
    稳定性 ----------- 稳定
 */

// arr num(生成几个桶)    



function bucketSort(array, num) {　　
    if (array.length <= 1) {　　　　
        return array;　　
    }　　
    let len = array.length,
        buckets = [],
        result = [],
        min = max = array[0],
        space, //步长
        n = 0;

    // 每桶有几个数
    let index = Math.floor(len / num);　　
    // 如果平均每桶最多只有1个或者0个
    // 降低桶的数量 增大每桶里的个数
    while (index < 2) {　　　　
        num--;　　　　
        index = Math.floor(len / num);　　
    }

    // 默认最大值为arr[0] 后面的值与其比较 得到数组最大最小的数　　
    for (let i = 1; i < len; i++) {　　　　
        min = min <= array[i] ? min : array[i];　　　　
        max = max >= array[i] ? max : array[i];　　
    }　　
    //每桶分配到的数值范围 如min为10 ，步长为20
    // 10~39 40~69 
    space = (max - min + 1) / num; //步长
    　　
    for (let j = 0; j < len; j++) {　　　　
        let index = Math.floor((array[j] - min) / space);　　　　
        if (buckets[index]) { // 非空桶，插入排序
            let k = buckets[index].length - 1;　　　　　　
            while (k >= 0 && buckets[index][k] > array[j]) {　　　　　　　　
                buckets[index][k + 1] = buckets[index][k];　　　　　　　　
                k--;　　　　　　
            }　　　　　　
            buckets[index][k + 1] = array[j];　　　　
        } else { //空桶，初始化
            　　　　　　
            buckets[index] = [];　　　　　　
            buckets[index].push(array[j]);　　　　
        }　　
    }　　
    // 输出result
    // 直接连接每桶，其中桶内部的数是排好序的
    // 因此直接处理arr整体
    while (n < num) {　　　　
        result = result.concat(buckets[n]);　　　　
        n++;　　
    }
    return result;
}