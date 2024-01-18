// Source : https://oj.leetcode.com/problems/two-sum/
// Author : yxy 
// Date   : 2018/2/23 

/********************************************************************************** 
Two Sum
����һ���������У��ҳ����к�Ϊ�ض�ֵ������������
���� nums = [2, 7, 11, 15], target = 9
��Ϊ nums[0] + nums[1] = 2 + 7 = 9
���Է��� [0, 1]
**********************************************************************************/

class Solution {
public:     
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> res;
        unordered_map<int, int> mp;
        //�������ϣ���У���numbers[i]��Ϊ��ֵ����i��Ϊvalueֵ 
        for (int i=0; i<nums.size(); i++) mp[nums[i]]=i;
        for (int i=0; i<nums.size(); i++){
        	//�ͼ�ȥ��ǰֵ�����òΪҪ�ҵ��� ���������,��Ȼ����mp[gap]���ҵ���������ֵΪҪ�ҵ�ֵ�����Ǵ�ʱ�ж� 
            int gap = target-nums[i];
            // �ظ�ֵ����� 
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
