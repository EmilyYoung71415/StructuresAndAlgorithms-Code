/****
 * 选择排序
 * 
 * 同样是 每一轮使得一个元素正确归位，需要确认n轮
 * 每一轮确认归位的实现:
 * 遍历下标指向当前 已排好序的数组末尾，
 * 然后内部循环 在 剩下的未排序的元素里 找最小的元素放在 已排好序的数组的下一个元素
 * 
 */
let arr = [1,-3,2,6,4,9,0];
console.log(selectSort(arr));
function selectSort(arr){
    if(arr==null||arr.length<2){
        return arr;
    }

    // 前0~(i-1)个元素是已经排好序的，i指向未排序元素里最靠前的那个元素
    for(let i=0;i<arr.length;i++){
        let minIndex = i;// 暂定i所在元素是未排序元素里 最小的那个
        for(let j=i+1;j<arr.length;j++){
            minIndex = arr[j]>arr[minIndex]?minIndex:j;
        }
        swap(arr,minIndex,i);// 将最小的元素放在 已排序数组的末尾
    }
    return arr;

    function swap(arr,i,j){
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}