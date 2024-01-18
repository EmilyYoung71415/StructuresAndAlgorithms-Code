/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}

  要求我们在一个一维的有序数组中，查找指定元素，如果找到了则返回目标元素在数组中的位置，如果没有找到目标元素，则返回按照有序的方式插入数组的位置。
 */
 
 //二分查找
var searchInsert = function(nums, target) {
    var low =0,high= nums.length-1;
    while(low<=high){
        var mid = low + Math.ceil((high-low)/2) ;

        if(nums[mid]==target){
            return mid;
        }else if(nums[mid]<target){
            low = mid + 1;
        }else{
            high = mid -1;
        }
    }
    return low;
};
//console.log(searchInsert([1,1,8,9,9,15],9));