/**
 *   冒泡排序 选择排序 插入排序 希尔排序 归并排序  
 *   快速排序 堆排序(二叉树排序)  计数排序  桶排序    基数排序
 */

// 测试数据
var testdata = [4, 5, 8, 9, 2, 1, 7, 4, 8]

/**
 *  @desc 冒泡排序
 *  最快输入条件：输入数据为正序
 *  最慢输入条件： 输入数据为逆序
 *  优化：立一个 flag，当在一趟序列遍历中元素没有发生交换，则证明该序列已经有序
 */
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) { //每排i轮，确定最右的那i轮数最大即可不必比较
            if (arr[j] > arr[j + 1]) { // 相邻元素两两对比
                var temp = arr[j + 1]; // 元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
//console.log(bubbleSort(testdata));

/**
 *  @desc 选择排序
 *  无论什么数据进去都是 O(n²) 的时间复杂度
 *  不占用额外的内存空间
 */
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i; //最小索引初始化为新轮比较的第一个
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) { // 寻找最小的数
                minIndex = j; // 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

/**
 *  @desc 插入排序
 *  类比扑克理牌
 *  优化算法：拆半插入
 */

function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex]; //依次向右移
            preIndex--; //索引向左移
        }
        //直到找到一个小于等于当前数的元素，替补到那个位置
        arr[preIndex + 1] = current;
    }
    return arr;
}

//console.log(insertionSort(testdata))


/**
 *  @desc 希尔排序
 *  插入排序的一种更高效的改进版本 非稳定排序
 *      插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到线性排序的效率；
 *      但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位；
 *  思想：
 *      先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，
 *      待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序
 */

function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while (gap < len / 3) { //动态定义间隔序列
        gap = gap * 3 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;
}
//console.log(shellSort(testdata))



/**
 *  @desc 归并排序
 *  分治法 
 *  和选择排序一样,归并排序的性能不受输入数据的影响，但表现比选择排序好的多
 *  O(nlogn) 复杂度
 *  需要额外的内存空间
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

//console.log(mergeSort(testdata))

/**
 *  @desc 快速排序
 * 本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法。
 */

function paritition(arr, low, high) {
    let pivot = arr[low];
    while (low < high) {
        while (low < high && arr[high] > pivot) {
            --high;
        }
        arr[low] = arr[high];
        while (low < high && arr[low] <= pivot) {
            ++low;
        }
        arr[high] = arr[low];
    }
    arr[low] = pivot;
    return low;
}


function quickSort(arr, low, high) {
    if (low < high) {
        let pivot = paritition(arr, low, high);//基准
        quickSort(arr, low, pivot - 1);
        quickSort(arr, pivot + 1, high);
    }
    return arr;
}

/**
 *  @desc 堆排序
 * 本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法。
 */

 /**
 *  @desc 计数排序
 * 本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法。
 */


 /**
 *  @desc 桶排序
 * 本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法。
 */



  /**
 *  @desc 基数排序
 * 本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法。
 */