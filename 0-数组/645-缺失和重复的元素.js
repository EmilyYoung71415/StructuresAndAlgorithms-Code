/****
 * 
 * leetcode: 645
 * 集合 S 包含从1到 n 的整数。不幸的是，因为数据错误，导致集合里面某一个元素复制了成了集合里面的另外一个元素的值，
 * 导致集合丢失了一个整数并且有一个元素重复。
 * 
 * 求 重复的元素 及 丢失的元素 
 */

// 输入: nums = [1,2,2,4]
// 输出: [2,3]

/********************************
 * 思路：
 *      排序： prev = cur
 *      => [2,2] return [2,1]]
 * 
 *      [2,3,3,4,5,6] x
 */
console.log(findErrorNums([1,1]));
// function findErrorNums(nums) {
//     nums.sort((a, b) => a - b);
    
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] !== i + 1) {
//             return [nums[i], i + 1];
//         }
//     }

//     return [];
// };

// [1,1]
function findErrorNums(nums) {
    let arr = [];
    let res = [];
    let n = nums.length;
    nums.forEach(item => {
        arr[item] = arr[item] ? 2 : 1;
    });

    for (let i = 1; i < arr.length; i++) {
        // if (!arr[i]) res[1] = i;
        if (arr[i] === 2) res[0] = i;
    }

    // 缺失的数
    res[1] = (((1 + n) * n) >> 1)  -  (nums.reduce((acc, cur) => acc + cur) - res[0]);

    return res;
};