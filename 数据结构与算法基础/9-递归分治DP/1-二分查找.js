/**
 * 有序数组array中二分查找
 * 找到返回数组下标
 */

 // 非递归
let arr = [1,12,40,45,50,808,999];
//console.log(binarySearch(arr,50));
 function binarySearch(arr,key){
    let start = 0;
    let end =  arr.length-1;
    while(start<=end){
        let mid = ~~(end-start)/2 + start;
        if(arr[mid]>key){
            end = mid - 1;
        }else if(arr[mid]<key){
            start = mid +1;
        }else{
            return mid;
        }
    }
    return -1;
 }

 console.log(binarySearch(arr,-3));
 function binarySearch2(arr,key){
    if(arr===null||arr.length<1){
        return null;
    }
    binarySearchCall(arr,key,0,arr.length-1);
    function binarySearchCall(arr,key,start,end){
        if(start>end){
            return -1;
        }
        let mid = ~~(start - end)/2 + start;
        if(key === arr[mid]){
            return mid;
        }else if(key > arr[mid]){
            return binarySearchCall(arr,key,mid+1,end);
        }else{
            return binarySearchCall(arr,key,mid,mid-1);
        }
    }
 }