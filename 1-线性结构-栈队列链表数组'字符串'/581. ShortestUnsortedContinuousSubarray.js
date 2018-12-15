/******************************************

在一个数组里找到这样的一个子数组
当你用正序排列此子数组的时候，整个数组也会被排列到最佳次序(正)
请找到 最短长度的这样一个子数组，返回子数组的长度


Input: [2,6,4,8,10,9,15]
       [2,4,6,8,9,10,15]
        1   5
        5-1+1
        [6,....,10,15] 6-2
        -1 4
        

arr:[6, 4, 8, 10, 9]
Output: 5
******************************************/


/****
 * 排序  16.89%
 * 然后两个数组进行对比
 * 使用两个角标从两头往中间
 * 1、
 * 两个角标的记录初始值 与 变化的界点 也需要考虑
 * lIndex = 0 
 * rIndex = arrLen-1
 * 
 * 如果都没变 那么 长度 是 arrLen-1+1
 * 
 * 2、怎么同时控制两个角标？while？数组遍历？
 *      遍历两次，第二次 遍历截止点是 lIndex
 * 
 */

const arr = [2,6,4,8,10,9,15]
console.log(findUnsortedSubarray(arr))
 function findUnsortedSubarray1(arr){
    let 
        lIndex = 0,
        len = arr.length,
        rIndex = arr.length-1,
        tempArr = arr.slice(0);
        sortedArr = arr.sort((a,b)=>a-b);//注意修改了原数组

    for(let i=0;i<arr.length;i++){
        if(tempArr[i]==sortedArr[lIndex]){
            lIndex++;
        }else{
            break;
        }
    }

    for(let i=len-1;i>lIndex;i--){
        if(tempArr[i]==sortedArr[rIndex]){
            rIndex--;
        }else{
            break;
        }
    }
    return rIndex-lIndex+1;
 }


 /****
  * 怎么优化下写法
  *  
  * 23%
  */


function findUnsortedSubarray2(arr){
    let 
        sorted  = arr.slice(0).sort((a,b)=>a-b),
        lIndex = arr.length,
        rIndex = 0;
    for(let i=0;i<arr.length;i++){
        if(sorted[i]!== arr[i]){
            lIndex = Math.min(lIndex,i);
            rIndex = Math.max(rIndex,i);
        }
    }
    return (rIndex-lIndex>0?rIndex-lIndex+1:0)
}


/*****
 * 是否可以不排序?
 * 即算法思想的问题
 * ---- 来自社区
 * 还是 最大最小值 初始值 置换位置
    [2,6,4,8,10,9,15]
    [2,4,6,8,9,10,15]
 * 
 * 好像确实也不需要排序
 * 初始值：min = arr[len-1]
 *        max = arr[0]
 * 遍历数组：从1 开始
 *  min  = Math.min (nums[len-1-i],min) // 从右边开始 扩小 找小值
 *  max = Math.max(nums[i]，max)// 从左边开始，往右 不断增加 大值
 * 
 *  if(nums[i]<max) right  = i;// 不断往右边增加
 *  nums[len-i-1] > min left = len -1 -i; // 不断往左边减小
 * 
 *  return right - left +1;
 */

function findUnsortedSubarray(arr){
    let 
        left = -1,
        right = -2,
        len = arr.length,
        min  = arr[len-1],
        max = arr[0];
    
    for(let i=1;i<len;i++){
        max = Math.max(max,arr[i]);// 从左到右得到的当前最大值
        min = Math.min(min,arr[len-i-1])
        if(arr[i]<max){
            right = i;
        }
        if(arr[len-i-1]>min){
            left = len-1-i;
        }
    }
    // 如果 left right相遇了 并继续往自己方向走了，那么会有一个子数组
    if(right<left&&left<0){// 初始值状态
        return 0
    }
    return right-left+1;
}
