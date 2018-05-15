/**
 *  @desc 桶排序 
 *  @param array 数组
 *  @param num 桶的数量
 *  基本思想：
 *      如果所有的数是10以内的，然后申请10个桶，遍历到相应数时就在数组的相应下标计数。
 *      输出时遍历木桶，如果木桶里没有数则不输出，有数则遍历输出（有可能一个桶里有很多数）
 *      
 *      判断一串数中最大值。那么申请的数组空间就是maxValue + 1
 *      我们的桶排好就是0-maxvlue+1
 *      比如最大为9 ，arr[9]++; 所以需要10个桶(从0开始计数)
 *      
 *  桶排序思想
 *      非基于比较，对数据的位数和范围有限制。
 *      具体到实现可落地为： 计数排序(如下实现) 和基数排序(范围更大)
 *      时间复杂度O(N)，额外空间复杂度O(N)，实现做到稳定性
 *  总结：简单、快速      
 */

function bucketSort(arr){
    if(arr===null||arr.length<2){
        return;
    }

    //let max = Math.max.apply(Math, arr);
    let max = null;
    for(let i=0;i<arr.length;i++){
        max = Math.max(max,arr[i]);
    }
    // 开始申请桶 初始化桶
    let bucket = [];
    for(let i =0;i<max+1;i++){
        bucket[i] = 0;
    }   
    
    for(let i=0;i<arr.length;i++){
        bucket[arr[i]] ++;
    }
    // 遍历桶输出排好序的内容
    let index = 0;
    for(let i=0;i<bucket.length;i++){
        // 依次取出该桶中的数 bucket[1] = 9 即有9个1 
        while(bucket[i]-- > 0){
            arr[index++] = i;
        }
    }
}