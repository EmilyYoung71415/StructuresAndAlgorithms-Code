/**
 *  @desc 冒泡排序
 *  基本思想: 每次比较两个相邻的元素，如果它们的顺序错误就把它们交换过来。
 *           如同一个气泡，一步步向后翻滚，直到最后一个
 *  双重嵌套循环，o(n2)
 */

function bubbleSort(arr) {　　
    var len = arr.length;　　
    for (var i = 0; i < len; i++) {　//n个数排序，只需进行n-1趟　　　
        for (var j = 0; j < len - 1 - i; j++) {//从第一个数开始直至比较到最后一个尚未归位的数(每次i循环后都会归位一个数)　　　　　　
            if (arr[j] > arr[j + 1]) { //相邻元素两两对比
                var temp = arr[j + 1]; //元素交换
                arr[j + 1] = arr[j];　　　　　　　　
                arr[j] = temp;　　　　　　
            }　　　　
        }　　
    }　　
    return arr;
}