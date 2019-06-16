/***
 * 
    给定一个长度为 n 的整数数组 nums，数组中所有的数字都在 0∼n−1 的范围内。
    数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。
    请找出数组中任意一个重复的数字。
    注意：如果某些数字不在 0∼n−1 的范围内，或数组中不包含重复数字，则返回 -1；
    例:
        给定 nums = [2, 3, 5, 4, 3, 2, 6, 7]。
        返回 2 或 3。
 * 
 */
/*****
 * 思路:
 * way1、哈希表记录每个数出现的次数
 *  空间复杂度O(n) 时间复杂度O(n)
 * way2、数组排序 遍历
 *  时间复杂度 nlogn
 * ================
 * 有没有更优的解法呢
 */

/****
 * 测试用例：
 * 1、包含重复数字的数组
 * 2、不包含重复数字
 * 3、无效输入
 * 
 * 
 */

let nums = [2, 3, 5, 4, 3, 2, 6, 7]
console.log(find(nums))
function find1(nums){
    let hash = {};
    for(let i=0;i<nums.length;i++){
        hash[nums[i]] = ( hash[nums[i]] || 0 ) + 1;
        if(hash[nums[i]]>1) return nums[i];
        if(nums[i]<0||nums[i]>nums.length-1) return -1;
    }
    return -1;
}


function find2(nums){
    nums.sort((a,b)=>a-b);
    for(let i=0;i<nums.length;i++){
        if(nums[i]<0||nums[i]>nums.length-1) return -1;
        if(nums[i]==nums[i+1]){
            return nums[i];
        }
    }
    return -1;
}

/*****
 * 分析题目
 * 数组中所有的数字都在 0∼n−1 的范围内
 * 长度为 n 的整数数组
 * [2, 3, 5, 4, 3, 2, 6, 7] 即 出现的数字都在0-7范围内，而且长度为8
 * 即要么每个数都出现了一次，要么至少会有一个重复数字
 * 突破口：
 *      建立元素数值与索引之间的关联( 哈希计数也可以换成数组计数，这里就是利用索引计数的转变)
 *      if nums[nums[i]]!= nums[i], swap(nums[nums[i]],nums[i])
 *      [5,3,2,4,3,2,6,7]
 *      [2,3,2,4,3,5,6,7]
 */

 function find3(nums){
    if(nums==null||nums.length<1){
        return -1;
    }

    for(let i=0;i<nums.length;i++){
        if(nums[i]<0||nums[i]>nums.length-1){
            return -1;
        }
    }

    for(let i=0;i<nums.length;i++){
        // 虽然有双重循环 但是每个数最多交换两次就能找到自己位置
        while(nums[i]!=i){
            if(nums[i]==nums[nums[i]]){
                return nums[i];
            }
            // 不等于 则swap
            swap(nums,i,nums[i]);
        }
    }
    return -1;

    function swap(nums,i,j){
       [nums[i],nums[j]] = [nums[j],nums[i]]
    }
 }


 /*******
  * 修改题目: 不修改数组找出重复数字
  * way1：复制一个数组，在备份数组里使用上文way3的方法
  * ===> 找中间大小的数字，然后遍历全数组统计前半段和后半段数字出现的个数
  *       长度为n的数组，那么中间数字 n/2
  *       比如[2, 3, 5, 4, 3, 2, 6, 7] 统计1~4,5~7两段的数字(遍历全数组)
  *       1~4这4个数字出现了5次>4 那么重复的数字一定包含在1~4之间
  * 时间复杂度 logn*n
  */

function find(nums){
    if(nums==null||nums.length<=0) return -1;
    let start = 1,end = nums.length-1;

    while(start<=end){
        let mid = ((end-start)>>1)+start;
        let count = getRangeCount(nums,start,end);//获得[start,end]范围内的数字个数
        if(start==end){
            if(count>1) return start;
            else break;
        }
        if(count>(end-start+1)){
            end = mid;
        }else{
            start = mid+1;
        }
    }
    return -1;

    function getRangeCount(nums,start,end){
        if(nums==null) return 0;
        let count = 0;

        nums.forEach(num => {
            if(num<=end&&num>=start){
                count++;
            }
        });
        return count;
    }
}





/*****
 * 总结：
 * 思考的点
 *    功能要求：找出任意一个重复数字、找出所有重复数字
 *    性能要求：时间优先、空间优先
 */