/***
 * https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/
 * 输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。
 * 要求时间复杂度为O(n)。
 */

// 输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6

/*****
 * 思路：
 *      way1苏格拉底捡玉米理论(乱联想的)
 *      1、pres + cur < cur 当cur 累加进之前的结果值后 反而还小了 此时果断 弃结果值只保留当前值
 *      2、当cur 为负数，cur + pres < cur 是否应该抛弃 pres？
 *          不能，因为cur后面可能会有超级正能量的大boss扳回一局
 *      3、pres不断更新，但是maxres永远是保留最大的值
 *          比如 4,-1,2,1,-5 到了-5的时候按照1，2原则还是会把-5纳入pres，但是maxres还是保持的-5加入之前的6
 */
let nums = [-2,1,-3,4,-1,2,1,-5,4];
console.log(maxSubArray(nums, 6));
function maxSubArray(nums) {
    let max = Number.MIN_SAFE_INTEGER;
    let pres = 0;

    nums.forEach(item => {
        // if (item > pres && pres < 0) {
        // 优化：只要是负数都舍弃，负数+负数只会更小
        if (pres < 0) {
            pres = item;
        }
        else {
            pres += item;
        }
        max = Math.max(max, pres);
    })

    return max;
}

/***
 * 代码鲁棒性：
 *      1、无效输入时，返回什么。如果返回0，如何区分是非法输入返回的0 还是 数组本身最大返回0
 */

// TODO:dp 动态规划解