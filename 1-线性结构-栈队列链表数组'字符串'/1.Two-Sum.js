/******************************************

给出一个数组，和一个目标值。找出数组里的两个数a,b
能满足 a+b=目标值，返回a、b的下标

example:
    Given nums = [2, 7, 11, 15], target = 9,
    Because nums[0] + nums[1] = 2 + 7 = 9,
    return [0, 1].
 
 ******************************************/
// way1
const target = 9;
const arr = [2,7,11,15];
console.log(twoSum(arr,target))
function twoSum1(nums,target){
    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<nums.length;j++){
            if(nums[j]==target-nums[i]){
                return [i,j];
            }
        }
    }
    return [];
}

// 不能排序.....因为需要原下标
function twoSum2(nums,target){
    let arr = nums.sort((a,b)=>a-b);// 从小到大
    for(let i=arr.length;i>=0;i--){
        if(arr[i]>=target){
            continue;// 跳往下个循环值 
        }
        // 正序
        for(let j=0;j<i;j++){
            if(arr[j]==target-arr[i]){
                return [j,i];
            }
        }
    }
    return [];
}


/**
 * 思路：
 *  1、对数据不进行任何处理，直接双重循环
 *      第一层循环指向当前元素，内层循环找除当前元素以外的其他元素。
 *      判断 内层的指向元素 是否等于 target-外层的指向
 *  复杂度：  O(n^2)
 * 
 * 
 *  2、排序+二分
 *      排序:快排 O(n*logn)
 *      查找的时候，从大到小找
 */

 // 优质题解：
 // 使用hash索引 简化双重循环
 function twoSum(nums,target){
     let hash = {}
     for(let i=0;i<nums.length;i++){
        if(target-nums[i] in hash){// hasOwnProperty 不能通过判断值 
            // 有可能hash[1] = 0
            return [i,hash[target-nums[i]]]
        }
        hash[nums[i]] = i;
     }
     return []
 }
