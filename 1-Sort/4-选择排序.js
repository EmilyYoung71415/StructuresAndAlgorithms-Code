/**
 * @desc 选择排序---扑克牌
 * 基本思想：
 *     每次循环在待排序的数据中选择最小的元素，排在已排序的最后
 *     如首次循环则找出最小的数据放在最前面，第二次循环以已排序的最小数据最为基准，后面的值依次比较
 * 总结：
 *      选择排序相当于在两个空间进行，每次从未排序的旧空间选择最新的值放到新的空间
 */

 function selectSort(arr){
    if(arr===null||arr.length<2){
        return;
    }
    for(let i=0;i<arr.length;i++){
        let minIndex = i;
        for(let j=i+1;j<arr.length;j++){
            minIndex =  arr[j]<arr[minIndex]?j:minIndex;
        }
        swap(arr,i,minIndex);
    }
 }

 function swap(arr,i,j){
     let temp = arr[i];
     arr[i] = arr[j];
     arr[j] = temp;
 }
