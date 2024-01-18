/******
 * leetcode:169
 * 找出数组的众数，众数是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素
 * 假设数组是非空的，并且给定的数组总是存在众数
 *  输入: [3,2,3]
    输出: 3
    输入: [2,2,1,1,1,2,2]
    输出: 2
 **
 *思路
 * 1、map：因为涉及到计数 O(n)
 * 2、sort ，计算超出n/2个的元素
 * 3、分治：将数组一分为二, 然后比较左右的众数 和右边的众数
 */
// map
function majorityElement1(nums) {
  let map = new Map();
  for (let i = 0, len = nums.length; i < len; i++) {
    let item = nums[i];
    // let count = (map.get(item)||0) + 1;
    // map.set(item,count);
    map.set(item, (map.get(item) || 0) + 1);
    if (map.get(item) > ~~(len / 2)) {
      return item;
    }
  }
}

// sort
function majorityElement2(nums) {
  if (nums.length == 1) return nums[0];
  nums.sort();
  let maxCount = 1;
  for (let i = 1, len = nums.length; i < len; i++) {
    if (nums[i] == nums[i - 1]) {
      maxCount++;
    } else {
      maxCount = 1;
    }
    if (maxCount > ~~(len / 2)) {
      return nums[i];
    }
  }
}

const arr = [3, 1, 1, 2, 1, 2];
console.log(majorityElement(arr));
// 分治
function majorityElement(nums) {
  if (nums.length == 1) {
    return nums[0];
  }
  let mid = (nums.length / 2) | 0;
  let leftM = majorityElement(nums.slice(0, mid));
  let rightM = majorityElement(nums.slice(mid, nums.length));
  // let rightM = majorityElement(nums.splice(mid)); splice 要改变原数组

  let leftCount = 0;
  for (let i = 0; i < nums.length; i++) {
    let item = nums[i];
    if (item == leftM) {
      leftCount++;
    }
    if (leftCount > mid) {
      return leftM;
    }
  }
  return rightM;
}
