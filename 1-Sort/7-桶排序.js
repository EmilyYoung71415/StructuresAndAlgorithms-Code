/**
 * @desc 桶排序
 *  桶排序就是强化版本的计数排序
 *  每个桶存储 一定范围类的键值，桶与桶之间的排序输出按照简单计数排序输出
 *  桶内部的数排序可选择插入排序或其他
 *  
 */
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

    　　
    let index = Math.floor(len / num);　　
    while (index < 2) {　　　　
        num--;　　　　
        index = Math.floor(len / num);　　
    }

    　　
    for (let i = 1; i < len; i++) {　　　　
        min = min <= array[i] ? min : array[i];　　　　
        max = max >= array[i] ? max : array[i];　　
    }　　
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
    while (n < num) {　　　　
        result = result.concat(buckets[n]);　　　　
        n++;　　
    }
    return result;
}