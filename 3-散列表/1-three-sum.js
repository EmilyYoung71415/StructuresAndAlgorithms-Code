/****
 * leetcode:15
 * 在数组找三个数使得a + b + c = 0，答案中不可以包含重复的三元组
 * Given array nums = [-1, 0, 1, 2, -1, -4],

    A solution set is:
    [
        [-1, 0, 1],
        [-1, -1, 2]
    ]
 * 
 * 思路：   
 * 1、三重循环
 * 2、两重循环，第三层的时候因为元素值已经固定了，所以就是map查找。
 *    O(n^2)
 * 3、不使用额外空间，将数组排序，
 *    第一层确定元素后，剩下的两个元素使用两个指针从两头向中间逼近
 *     类似于有序数组的二分查找。找适合的两个元素     
 */
let nums = [-1, 0, 1, 2, -1, -4];
/****
 * 一些失败过的测试数据
 * let nums = [0,0,0,0]
 * let nums = [-1,0,1,0]
 *
 */
console.log(threeSum(nums));
// ❗
function threeSum1(nums) {
  let rev = [];
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = j + 1; k < len; k++) {
        if (nums[i] + nums[j] + nums[k] == 0) {
          rev.push([nums[i], nums[j], nums[k]]);
        }
      }
    }
  }
  // 怎么去重？
  return rev;
}

// 修改版 通过跳过排序+相同值 避免重复 ✅
// ❓ 但是 超时了
function threeSum1(nums) {
  nums = nums.sort((a, b) => a - b);
  let rev = [];
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < len; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      for (let k = j + 1; k < len; k++) {
        if (k > j + 1 && nums[k] === nums[k - 1]) continue;
        if (nums[i] + nums[j] + nums[k] == 0) {
          rev.push([nums[i], nums[j], nums[k]]);
        }
      }
    }
  }
  return rev;
}
// --------------------我-是-分-界-线----------------------//
// 方法2：
// 只是说三个数不能完全相同，但是可以一个数被用于两个不同的组合中
// 所以不是用完一个消灭一个... ❗
function threeSum2(nums) {
  let map = new Map(),
    rev = [];
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    let count = (map.get(nums[i]) || 0) + 1;
    map.set(nums[i], count);
  }

  for (let i = 0; i < len; i++) {
    let count_i = map.get(nums[i]) - 1;
    map.set(nums[i], count_i); // 假定被选择了
    for (let j = i + 1; j < len && map.get(nums[j]) >= 1; j++) {
      let count_j = map.get(nums[j]) - 1;
      map.set(nums[j], count_j);
      let temp = 0 - nums[i] - nums[j];
      if (map.get(temp) >= 1) {
        let count_temp = map.get(temp) - 1;
        map.set(temp, count_temp);
        rev.push([nums[i], nums[j], temp]);
      } else {
        //把
        // 把j撤销掉
        count_j++;
        map.set(nums[j], count_j);
      }
    }
  }
  // 怎么去重？
  return rev;
}
// 优化代码 但是还是存在最关键的问题没解决 ❗
function threeSum2(nums) {
  let len = nums.length,
    result = [];
  if (len < 3) return [];
  nums = nums.sort((a, b) => a - b); // 排序
  for (let i = 0; i < len; i++) {
    let item = nums[i];
    // 遇到两个连续相等的数 跳过此次(因为排过序)
    if (i > 1 && item == nums[i - 1]) continue;
    let map = new Map(); // 存放第三层已经固定的元素
    for (let j = i + 1; j < len; j++) {
      // j确定后 第三个元素也固定了即 0-item-nums[j]
      // 如果是首次出现的元素 那么将他的匹配值放入map里
      // 如果下次遍历到的值是匹配值 就会在map里找到
      let partner = 0 - nums[j] - item;
      if (!map.has(nums[j])) {
        map.set(partner, 1);
      } else {
        result.push([item, nums[j], partner]);
      }
    }
  }
  return result; //怎么去重啊 [[0,0,0],[0,0,0],[0,0,0]]
}

// --------------------我-是-分-界-线----------------------//
// 方法3 两头逼近法 ✅
// [-1,0,1,2,-1,-4]  =sort=>   [-4,-1,-1,0,1,2]
// 外层遍历取第一个元素，然后l、r在第二个元素和最后一个元素开始向中间逼近
// 如果 item + arr[l] + arr[r] >0 则大的太大，r-- (类似二分)
function threeSum(nums) {
  nums = nums.sort((a, b) => a - b); // 实际上sort是改变了原数组的
  let result = [];
  let len = nums.length;
  for (let i = 0; i < len - 2; i++) {
    if (nums[i] > 0) break; // 如果最小的都大于0
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    let l = i + 1;
    let r = len - 1;
    while (l < r) {
      let sum = nums[i] + nums[l] + nums[r];
      if (sum < 0) l++;
      else if (sum > 0) r--;
      else {
        result.push([nums[i], nums[l], nums[r]]);
        // 如果紧邻也相等的要跳过不然要重复
        while (l < r && nums[l] == nums[l + 1]) l++;
        while (l < r && nums[r] == nums[r - 1]) r--;
        l++;
        r--;
      }
    }
  }
  return result;
}
