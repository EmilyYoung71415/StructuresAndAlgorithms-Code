/**
 * @desc 插入排序
 * 基本思想： 
 *      与选择排序类似只是插入排序是一个空间，即每次新来的数据与已经排好序的数据比较，
 *      在已经排好的序号中从后往前扫描，找到相应位置再插入(类比打扑克理牌，或梁山好汉排名)
 * 转换代码思维：
 *      默认已经排序的为第0个
 *      当前元素是否小于已排序列表的最后一个
 *      若小于则排序数列依次往右移动一格以便移出位置(下标)给新成员
 *      移出的位置赋值于新成员
 */
function insertSort(arr){
    if(arr===null||arr.length<2){
        return;
    }
    for(let i =1;i<arr.length;i++){
        for(let j=i-1;j>=0&&arr[j]>arr[j+1];j--){
            swap(arr,j,j+1)
        }
    }
 }

 function swap(arr,i,j){
     let temp = arr[i];
     arr[i] = arr[j];
     arr[j] = temp;
 }
