/****
 * https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/
 * 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 */
// 输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
// 输出: 2

/****
 * 思路：
 *      1、对每个数进行hash计数，得到每个数的出现次数，然后再次遍历，找出出现次数最多的元素
 */
console.log(majorityElement([1, 2, 3, 2, 2, 2, 5, 4, 2]))
function majorityElement(nums) {
    let hash = {};
    let midLen = Math.floor(nums.length/2);
    nums.forEach(item => {
        // hash[item] = hash[item]>=0 ? hash[item]+1 : 0;
        hash[item] = (hash[item] || 0 ) + 1;
    })

    // forEach 的 return 居然不打断迭代！！ return了之后 还在迭代
    // nums.forEach(item => {
    //     if(hash[item] > midLen) {
    //         return item;
    //     }
    // })
    for (let item of nums) {
        if(hash[item] > midLen) {
            return item;
        }
    }
}

// 看提示的标签显示： 分治、位运算可解决