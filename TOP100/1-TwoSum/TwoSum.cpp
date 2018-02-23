// Source : https://oj.leetcode.com/problems/two-sum/
// Author : yxy 
// Date   : 2018/2/23 

/********************************************************************************** 
Two Sum
给定一个整数数列，找出其中和为特定值的那两个数。
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
**********************************************************************************/

class Solution {
public:     
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> res;
        unordered_map<int, int> mp;
        //在无序哈希表中：将numbers[i]作为键值，将i作为value值 
        for (int i=0; i<nums.size(); i++) mp[nums[i]]=i;
        for (int i=0; i<nums.size(); i++){
        	//和减去当前值，所得差即为要找的数 而如果存在,必然是在mp[gap]中找到，即索引值为要找的值，我们此时判断 
            int gap = target-nums[i];
            // 重复值的情况 
            if(mp.find(gap)!=mp.end() && mp[gap]>i) {
                res={i, mp[gap]};
                //res.push_back(i);
                //res.push_back(mp[gap]);
                break;
            }
        }
        return res;
    }
};
