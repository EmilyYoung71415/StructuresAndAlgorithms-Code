/**
 * @desc 选择排序
 * 基本思想：
 *     每次循环在待排序的数据中选择最小的元素，排在已排序的最后
 *     如首次循环则找出最小的数据放在最前面，第二次循环以已排序的最小数据最为基准，后面的值依次比较
 * 转换为代码思维：
 *      每次在待排序的数据中==》时刻更新已排序数据中最近的数据下标
 *      在未排序的数据中选择最小的元素 ==》时刻更新最小值
 * 总结：
 *      选择排序相当于在两个空间进行，每次从未排序的旧空间选择最新的值放到新的空间
 */

 function selectSort(arr){
    var curIndex = 0;//当前已排序的最后一个元素下标
    while(curIndex!=arr.length-1){       
        var minIndex = curIndex;
        for(var i = curIndex+1;i<arr.length;i++){
            if(arr[i] < arr[minIndex]){
                minIndex = i; 
            } 
        }
        //将最小的值交换到已排序队列末尾
        var temp = arr[curIndex];
        arr[curIndex] = arr[minIndex];
        arr[minIndex] = temp;
        curIndex++;
    }
    return arr;
 }
var testData = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
selectSort(testData);