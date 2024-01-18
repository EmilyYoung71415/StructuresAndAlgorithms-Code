/****
 * leetcode :1
    Given nums = [2, 7, 11, 15], target = 9,

    Because nums[0] + nums[1] = 2 + 7 = 9,
    return [0, 1].
 * 思路：
    1、遍历数组，将数字存入map里，{2:0},键值是在数组的下标
        每次遍历到当前元素找 map[target-curr] 如果存在则返回

    2、双重遍历

    假设每种输入只会对应一个答案。且不能重复利用这个数组中同样的元素
 */

let nums = [3, 3],
  target = 6;
console.log(twoSum(nums, target));
// 3\3   返回[1,1] 而不是[0,1]
function twoSum(nums, target) {
  let map = new Map();
  let rev = [];
  nums.forEach((item, index) => {
    // map.set(item,index)
    let partner = target - item;
    if (map.has(partner)) {
      rev = [index, map.get(partner)]; //这个优先拿后面的
      return; // forEach 的return并不是return函数的
    }
    map.set(item, index); // 换个位置就好了
  });
  return rev;
}

//-----暴力解法-------//
function twoSum3(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] == target - nums[i]) {
        return [i, j];
      }
    }
  }
  return [];
}
