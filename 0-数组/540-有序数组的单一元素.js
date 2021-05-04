/**
 * 只包含整数的有序数组，每个元素都会出现两次，唯有一个数只会出现一次，找出这个数。
 * O(log n)时间复杂度和 O(1)空间复杂度中运行
 *  [1,1,2,3,3,4,4,8,8] // 2
 * 
 * 镜像问题：287-寻找重复数
 *      arr 只有 一个重复的整数 ，找出 这个重复的数
 */

// 思路：有序数组，那么可以依次遍历，arr[i-1] != item && item != arr[i+1]; 收尾的时候特殊处理
// 时间复杂度：O(n)
// ==》 改进 i=i+2;检查每个第二个元素是否与当前元素相同
// ==》 可以申请空间的话。可以使用hash去重
// ==》 异或运算

// 思路2： 二分
// 思路还是那个思路 只是顺序遍历变为二分遍历了 但是target是啥？缩小排查空间的判断分界线是啥。。
const arr = [1,1,2];
console.log(singleNonDuplicate(arr));
// 思路1
function singleNonDuplicate(nums) {
    const len = nums.length;
    for (let i = 0; i< len; i+=2) {
        if (nums[i] !== nums[i+1]) {
            return nums[i];
        }
    }
    return nums[len - 1];
}

// 思路2：二分
// 当mid为偶数时，nums[mid] 前面有 偶数个 元素
    // nums[mid] == nums[mid+1]，倒推可得到前面元素也是一一配比的（因为最多两个重复，也只有一个单着
    // ===> left = mid+1;
    // nums[mid] != nums[mid+1], 则前面是是不一一配对的
    // ===> right = mid-1;
// mid是奇数同理
function singleNonDuplicate2(nums) {
    if (nums.length === 1) return arr[0];
    const len = nums.length;
    let left = 0,
        right = len - 1;
    
    while(left <= right) {
        const mid = (left + right) >> 1;
        if (mid % 2 === 0 && mid + 1 < len) {
            if (nums[mid] === nums[mid + 1]) {
                left = mid + 1;
            }
            else {
                right =  mid - 1;
            }
        }
        else if (mid % 2 !== 0 && mid + 1 < len) {
            if (nums[mid] === nums[mid + 1]) {
                right =  mid - 1;
            }
            else {
                left = mid + 1;
            }
        }
        else {
            return nums[mid];
        }
    }

    return nums[left];
}