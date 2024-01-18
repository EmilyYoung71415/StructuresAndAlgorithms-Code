/*****
 * 希尔排序演化于插入排序
 * 插入排序:适用于基本有序的数据集，数据量不大的排序表
 * 希尔排序基本思想:
 * 1.将排序表分割成各长为d的子表，对子表分别进行插入排序
 * 2.当整个数据集近似有序的时候 再进行整体的插入排序
 */

let arr = [8,9,1,7,2,3,5,4,6,0];
console.log(shellSort(arr))
function shellSort(arr){
    if(arr==null||arr.length<2){
        return arr;
    }
    let len = arr.length;
    for(let grap=len>>1;grap>0;grap=grap>>1){
        for(let i=grap;i<len;i++){
            let index=i;
            while(index-grap>=0&&arr[index]<arr[index-grap]){
                swap(arr,index,index-grap)
                index -= grap;
            }
        }
    }
    return arr;
    function swap(arr,i,j){
        [arr[i],arr[j]] = [arr[j],arr[i]]
    }
}