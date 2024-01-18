/**
 *  @desc 二分查找
 *  基本思想：优先与数组的中间元素比较，如果等于中间元素则直接返回，否则取半递归查找  
 * 
 *  代码思维：
 *          循环不变的条件
 *          边界？
 *          数值中相同值的处理      
 */

function binarySearch(data, target, start, end){  
    if(start>end) return start;
    var end = end || data.length - 1,  
        start = start || 0,  
        //溢出
        mIndex = Math.floor((start + end) / 2); 
        //mIndex = start +Math.floor((end - start)/2);
        
    if(target < data[mIndex]){  
        return binarySearch(data, target, start, mIndex-1);  
    }else{  
        return binarySearch(data, target, mIndex+1, end);  
    }  
    //没有找到
    //return false;  
} 
//var arr = [-34, 1, 3, 4, 5, 8, 34, 45, 65, 87]; 
var arr = [34,12,5,123,2,745,32,4,10];   //存在栈溢出

console.log(binarySearch(arr,123));