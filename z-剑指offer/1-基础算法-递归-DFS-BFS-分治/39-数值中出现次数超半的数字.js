/****
 * https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/
 * 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 */
// 输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
// 输出: 2

/****
 * 思路：
 *      way1、对每个数进行hash计数，得到每个数的出现次数，然后再次遍历，找出出现次数最多的元素 On 但是有额外空间
 *      way2、对排序后的数组进行数字出现次数统计 nlogn
 *      way3、不排序且只遍历一次对乱序数组找出出现次数最多的数字 On [专业术语：摩尔投票法， 选出得票数最多的人]
 *              1、遍历到当前元素，默认为是出现次数最多的，如果下个元素仍是他 则出现次数count++
 *              2、当下个元素不是他时, count--，如果count为0，则替换当前元素为出现次数最多的，且count设为1
 *              (主要是有个转换，不是真正统计每个数字的各自出现次数，只要有出现次数更多的 替换之前target即可)
 *              (maxcount重新清零计数的过程也是相对计数，只要保证在剩下的没遍历的元素里 maxcount维护着最大次数的含义即可
 *      way4、借用快排的partition函数 On
 *              排序数组里位于数组中间的数字一定是出现次数最多的数字 即长度为n的数组的第n/2大的数字
 *              ===> 问题转换为：在乱序数组里找到第k大的数字 ===> partition
 *              1、数组随机选择一个数字，调整数组顺序使得 [....,data,...] 比data大的都在data右边，比data小的都在左边
 *              2、如果选中的data在调整顺序后，下标正好为len/2 那么data即为中位数
 *              3、下标>len/2， 我们寻找的中位数在data的左边，继续递归左边的数字
 *                 下标<len/2, 中位数在data右边
 */
// way1 hash计数
console.log(majorityElement([1, 2, 3, 2, 2, 2, 5, 4, 2]));
function majorityElement(nums) {
  let hash = {};
  let midLen = Math.floor(nums.length / 2);
  nums.forEach(item => {
    // hash[item] = hash[item]>=0 ? hash[item]+1 : 0;
    hash[item] = (hash[item] || 0) + 1;
  });

  // forEach 的 return 居然不打断迭代！！ return了之后 还在迭代
  // nums.forEach(item => {
  //     if(hash[item] > midLen) {
  //         return item;
  //     }
  // })
  for (let item of nums) {
    if (hash[item] > midLen) {
      return item;
    }
  }
}

// way2 排序数组统计出现的数字次数
function majorityElement(nums) {
  nums = nums.sort((a, b) => a - b);
  let maxcount = 1;
  let target = nums[0];

  for (let i = 1; i < nums.length; i++) {
    nums[i] !== target ? maxcount-- : maxcount++;
    if (maxcount === -1) {
      target = nums[i];
      maxcount = 1;
    }
  }
  return target;
}

// way3: 不排序且只遍历一次对乱序数组找出出现次数最多的数字
// 传说中的  摩尔投票法
function majorityElement(nums) {
  let maxcount = 1;
  let target = nums[0];

  for (let i = 1; i < nums.length; i++) {
    nums[i] !== target ? maxcount-- : maxcount++;
    if (maxcount === -1) {
      target = nums[i];
      maxcount = 1;
    }
  }
  return target;
}
// 精简版
function majorityElement(nums) {
  let maxcount = 0;
  let target = null;

  nums.forEach(item => {
    if (maxcount === 0) target = item;
    maxcount += target === item ? 1 : -1;
  });

  return target;
}
// ❓ 疑问： 为什么不能过case：[1,1,1,1,2,2,2,2,4,4,2] return 4 但实际上是2 但是却能过题的全部case？

// way4:partition
function majorityElement(nums) {
  let len = nums.length;
  let mid = len >> 1;
  let start = 0;
  let end = len - 1;
  // 随机选择一个数x，并顺序调整数组，返回随机选择的数x的新索引
  let randomIndex = partition(nums, start, end);

  while (randomIndex !== mid) {
    if (randomIndex > mid) {
      end = randomIndex - 1;
      randomIndex = partition(nums, start, end);
    } else {
      start = randomIndex + 1;
      randomIndex = partition(nums, start, end);
    }
  }

  // 找到了中位数
  return nums[mid];

  function partition(arr, l, r) {
    if (l > r) return;
    let pivot = arr[r];
    let bounder = l - 1;

    for (let i = l; i <= r; i++) {
      if (arr[i] <= pivot) {
        bounder++;
        // swap(arr,bounder,i);
        [arr[bounder], arr[i]] = [arr[i], arr[bounder]];
      }
    }
    return bounder;
  }
}

/***
 * 代码鲁棒性：
 *      1、检查无效输入 checkInvalidArr
 *      2、如果找出的出现次数最多的数字实际的出现次数并没有超过len/2， 需要对结果值check （针对way2，3，4方法
 *          checkMoreThanHalf
 */

function majorityElement(nums) {
  if (checkInvalidArr(nums)) return null;

  // 假设找出的数字为result
  if (!checkMoreThanHalf(nums, result)) return null;

  function checkInvalidArr(nums) {
    if (nums == null || nums.length <= 0) return true;
    return false;
  }

  function checkMoreThanHalf(nums, result) {
    let count = 0;
    nums.forEach(item => {
      if (item === result) {
        count++;
      }
    });

    // if (count > (nums.length>>1)) {}
    if (count * 2 <= nums.length) {
      return false;
    }

    return true;
  }
}
