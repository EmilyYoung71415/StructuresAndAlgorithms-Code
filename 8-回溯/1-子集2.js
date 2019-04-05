/****
 * leetcode:90
 * 给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）
 * 
 * [1,2,2]
 * [
    [2],
    [1],
    [1,2,2],
    [2,2],
    [1,2],
    []
   ]
 * 
 */

/****
 * 思路：
 * 同样与顺序无关,每层遍历只选择当前元素之后的元素
 * 还要规避重复元素的问题
 * 如果紧邻元素相同 放弃第二个
 * ====> 还是存在递归竖向遇到的相同元素 与 循环遇到的相同元素之间区别的问题
 *       还是要申请个usedArr
 * 
 * 结束条件： 同样递归过程即可收集每个结果
 */
let nums = [4,4,4,1,4];
console.log(subsetsWithDup(nums));

/*****
 * 错误过的测试输入:
 * let nums = [4,4,4,1,4]
 * ===> 要排序
 */
function subsetsWithDup1(nums){
    let result = [];
    nums.sort((a,b)=>a-b);
    subsetsWithDupCall([],0,[]);
    return result;

    function subsetsWithDupCall(pathArr,start,usedArr){
        result.push(pathArr);

        for(let i=start;i<nums.length;i++){
            // 当紧邻元素相等的时候 只有当 nums[i-1]被用过才能继续用nums[i]
            if(i>0&&nums[i-1]==nums[i]&&!usedArr[i-1]) continue;

            let tempArr = pathArr.slice();
            tempArr.push(nums[i]);
            usedArr[i] = 1;
            subsetsWithDupCall(tempArr,i+1,usedArr);
            usedArr[i] = 0;
        }
    }
}

/*****
 *  存在递归竖向遇到的相同元素 与 循环遇到的相同元素之间区别的问题
 * ===> i>start && nums[i-1] == nums[i]
 *      因为重复元素只会来自 后继者
 *  而申请usedArr 更广的适用于 前面的元素也还会在出现的情况
 */
function subsetsWithDup(nums){
    let result = [];
    nums.sort((a,b)=>a-b);
    subsetsWithDupCall([],0);
    return result;

    function subsetsWithDupCall(pathArr,start){
        result.push(pathArr);
        
        for(let i=start;i<nums.length;i++){
            if(i>start&&nums[i-1]==nums[i]) continue;
            let tempArr = pathArr.slice();
            tempArr.push(nums[i]);
            subsetsWithDupCall(tempArr,i+1);
        }
    }
}