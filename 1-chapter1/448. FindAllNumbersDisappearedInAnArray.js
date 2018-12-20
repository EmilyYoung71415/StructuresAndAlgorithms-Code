/******************************************
有一个数组，数组里的数的范围是1<= ai <= arr.len
有些数只在数组里出现过一次，求出这些数
要求：
    不能使用额外空间， 并且效率为O(n)
    假定返回的新的数组不算在额外空间内
exp:
input:[4,3,2,7,8,2,3,1]
    1 2 2 3 ] 3 4 7 8

output:[5,6]

******************************************/

/*****
 * 给元素赋正负来表达额外信息
 * 
 */
const arr = [4,3,2,7,8,2,3,1]
console.log(findDisappearedNumbers(arr))
 function findDisappearedNumbers(nums){
    let list = [];

    for(let i=0;i<nums.length;i++){
        let index = Math.abs(nums[i]) - 1;// 找到该元素对应的索引
        // 将索引对应的值设为 负数(特殊标记手段，因为此处可以确定数组里的数全为正) 
        if(nums[index]>0){
            nums[index] = -nums[index];
        }
    }

    // 找到还是正数的，证明他所在下标 没有被赋过负值，即为对应的消失的数
    for(let i=0;i<nums.length;i++){
        if(nums[i]>0){
            list.push(i+1);
        }
    }
    return list
 }