/****
 * 插入排序
 * 待排序元素每次取第一个元素，在已排序元素中找到自己的位置，插入
 */
let arr = [1,2,3,4,5,7,8,9,6]
console.log(insertSort(arr))
function insertSort(arr){
    if(arr==null||arr.length<2){
        return arr;
    }
    // 假设第一
    for(let i=1;i<arr.length;i++){
        for(let j=i-1;j>=0&&arr[j]>arr[j+1];j--){
            swap(arr,i,j);
        }
    }
    function swap(arr,i,j){
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
