/****
 * leetcode:300
 * 
 * 给定一个无序的整数数组，找到其中最长上升子序列的长度。
 *  输入: [10,9,2,5,3,7,101,18]
    输出: 4 
    解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4
 *  即最长子序列是里组成的字符是可以 不连续的  
 *
 *  要求算法复杂度：O(n2)
 *  进阶：能实现O(n log n)吗
 * 
 */

 /****
  * 思路:
  * 0.递归:
  * 对于nums的每个数，对应选择 or 不选
  * 记录当前的子序列 pathArr
  * 如果选择则需要满足条件: 新来的元素 > pathArr的最后一个数
  * 复杂度:指数级别
  * ===> 决定要选择当前数字的时候，只需要和之前选定的一个数字比较
  *      那么我们不需要记录从一开始到现在每次选择后积累的状态 pathArr
  * ===> 记录当前最大子序列的长度，当前数组遍历到什么地方，
  *      以当前数arr[i-1]结尾的子序列的长度
  *      那么判断arr[i]是否需要被选 就看 
  *         下标0~i-1的数字元素比arr[i]小，然后在选择符合要求的选项里选择最优解即可
  *      即dp 方程 dp[i] = max{dp[j] + 1} j<i && arr[j]<arr[i]
  * 1.dp
  * 状态定义:dp[i] 子序列结尾是arr[i]时 当前上升序列的最长 长度
  * 状态转移: 
  *         arr[0~i-1]只要比arr[i]小的元素 都可以作为倒数第二个数
  *         在这些数里，以能凑成最大递增子序列的元素作为倒数第二个元素
  *         // j 是遍历i之前的元素
  *         dp[i] = max{dp[j] + 1} j<i && arr[j]<arr[i]
  */
console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))
function lengthOfLIS1(nums){
    if(nums==null||nums.length<1) return 0;
    let len = nums.length;
    // 最差就是1 比如连续递减的数列
    let dp = new Array(len).fill(1);

    for(let i=1;i<len;i++){
        for(let j=i;j>=0;j--){
            if(nums[j]<nums[i]){
                dp[i] = Math.max(dp[i],dp[j]+1);
            }
        }
    }
    return Math.max(...dp) // Math.max.apply(null,array)
}

/*****
 * ologn的方法
 * 维护一个数组 LIS=[] 根据数组的长度即算出最长子序列长度
 * 初始 LIS[0] = nums[0]
 * 还是循环两边，但是优化的是内循环，- 借助数组 使用二分插入
 * 
 * 从左到右遍历nums,新来的元素在LIS里找到大于他但最接近他的元素，替换
 * 表示数组有了新的最小的起点
 * 如果新来的元素是LIS里最大的，那就push进入数组
 * 
 * 错误过的测试例子：
 * [4,10,4,3,8,9] output:4 expected:3
 * ==> 4，4，3，8，9 将等于的也算进来了 [4,10] 遇上4的时候 二分查找应该是返回0
 */
function lengthOfLIS2(nums){
    if(nums==null||nums.length<1) return 0;
    let LIS = [nums[0]],len = nums.length;
    
    for(let i=1;i<len;i++){
        let index = binarySearch(LIS,nums[i],0,LIS.length-1);
        if(index==LIS.length){
            LIS.push(nums[i]);
        }
        else{
            LIS[index]=nums[i];
        }
    }
    return LIS.length;
}
/***
 *  在有序数组里找到第一个大于他的元素 并返回他的下标
 *  如果找不到第一个大于他的元素 target即是最大元素 return arr.length
 * 
 */
// let arr = [4,10],target=4;
// console.log(binarySearch(arr,target,0,arr.length-1))
function binarySearch(arr,target,low,high){
    if(arr[high]<target){
        return arr.length;
    }
    while(low<high){
        let mid = low + ((high-low)>>1);
        // if(target<arr[mid]){
        //     high = mid-1;
        // }
        if(target<=arr[mid]){// target等于的也直接替换
            high = mid;
        }
        else{
            low = mid+1;
        }
    }
    return high;
}

// 递归版本
// 超出时间限制 21/24
function lengthOfLIS(nums){
    if(nums==null || nums.length<1) return 0;
    let maxLen = 1;
    lengthOfLISCall(nums,0,[]);
    return maxLen;
    function lengthOfLISCall(arr,start,pathArr){
        if(start==arr.length){
            maxLen = Math.max(pathArr.length,maxLen);
            return;
        }

        // 选是需要满足条件:如果满足上升趋势
        if(pathArr.length<1||arr[start]>pathArr[pathArr.length-1]){
            let temp = pathArr.slice();
            temp.push(arr[start]);
            lengthOfLISCall(arr,start+1,temp);
        }
        // 不选没有限制条件
        lengthOfLISCall(arr,start+1,pathArr);
    }
}