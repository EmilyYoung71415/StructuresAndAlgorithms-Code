/****
 * 冒泡：
 * 每一轮确定一个当前最大元素，一共需要n轮
 * 每一轮比较的实现:
 * 从首元素开始，当前标记的元素与其后紧随的元素 比较大小
 * 让大的元素 在标记.next位置，同时更新标记点
 * 视觉上看起来就像是 小的气泡逐渐变大冒出水面(因为移动过程就是每次移动的最大的那个元素)
 * 
 */

let arr = [1,-3,2,6,4,9,0];
console.log(bubbleSort(arr));
function bubbleSort(arr){
    if(arr==null||arr.length<2){
        return arr;
    }

    // 一共需要比较n轮 i表示 前0~i个元素都是没被排序的
    for(let i=arr.length-1;i>=0;i--){
        for(let j=0;j<=i;j++){
            if(arr[j]>arr[j+1]){
                swap(arr,j,j+1);
            }
        }
    }
    return arr;

    function swap(arr,i,j){
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

