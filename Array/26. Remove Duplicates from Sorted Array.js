/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    var j = 0;
    for(var i=1;i<nums.length;i++){
    	if(nums[i]!=nums[j]){
    		j++;
    		if(i!=j){
    			nums[j]=nums[i];
    		}
    	}
    }
    return j+1;
}