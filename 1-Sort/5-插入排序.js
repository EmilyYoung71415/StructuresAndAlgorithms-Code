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
    var len = arr.length,
        preIndex,//已排序数列的最后一项
        curItem;//当前扫描对象
    for(var i = 1;i<len;i++){
        preIndex = i-1;
        curItem = arr[i];
        while(preIndex >= 0 && arr[preIndex]>curItem){
            //依次移动一位腾出位置
            arr[preIndex+1] = arr[preIndex];
            preIndex --;
        }
        //当扫描的值等于或小于当前值时，当前值归位
        arr[preIndex+1] = curItem;
    }
    return arr;
}
var testData = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
insertSort(testData)