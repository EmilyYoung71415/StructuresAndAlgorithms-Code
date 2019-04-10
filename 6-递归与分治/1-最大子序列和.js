/***
 * leetcode:53
 * 最大子序和
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组
 * （子数组最少包含一个元素），返回其最大和。
 * 
 * exp:
 *  输入: [-2,1,-3,4,-1,2,1,-5,4],
    输出: 6
    解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 *  
 * 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解
 */

/****
 * 思路:
 * way1:
 *     遍历的时候 preSum记录当前已选择元素之和,
 *     如果preSum<0 且 新来的元素 > preSum 直接放弃之前的元素 从当前新元素开始
 *     如果preSum<0 且 新来元素 < 0 还是从信赖元素开始
 * ===> preSum<0 都从新开始
 * 
 * way2:
 *     怎么个分治法？nlogn
 * 
 */
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))

// way1
function maxSubArray1(nums){
    let preSum = -1,
        max = -Infinity;
    for(let i=0;i<nums.length;i++){
        if(preSum<0){
            preSum = nums[i];
        }
        else{
            preSum += nums[i];
        }
        max = Math.max(preSum,max);
    }
    return max;
}

// way2
function maxSubArray(nums){
    return maxSubArrayCall(nums,0,nums.length-1);

    function maxSubArrayCall(arr,lIndex,rIndex){
        if(lIndex==rIndex) return arr[lIndex];

        let mid =  lIndex + ((rIndex-lIndex)>>1); 
        return Math.max(maxSubArrayCall(arr,lIndex,mid),maxSubArrayCall(arr,mid+1,rIndex),maxCrossingSum(arr,lIndex,mid,rIndex))
    }

    function maxCrossingSum(arr,l,mid,r){
        let sum = 0,
            left_sum = -Infinity,
            right_sum = -Infinity;
        // 倒着来
        for(let i=mid;i>=l;i--){
            sum += arr[i];
            // left_sum = Math.max(left_sum,sum);
            if(left_sum<sum){
                left_sum = sum;
            }
        }

        sum = 0;

        for(let i=mid+1;i<=r;i++){
            sum += arr[i];
            // right_sum = Math.max(right_sum,sum);
            if(right_sum<sum){
                right_sum = sum;
            }
        }
        return right_sum + left_sum
    }
}
