/******************************************
 
找出 出现次数超过 arrLen/2 的数值
假定： 数组不为空 且 给出的数组里总存在这样一个数值

Input: [3,2,3]
Output: 3

Input: [2,2,1,1,1,2,2]
Output: 2

******************************************/

/**
 * 思路 桶排序
 * {} 记录个数
 * 然后只要当时的数值对应的个数 大于了 arrLen/2 即可输出
 */

let arr = [3,2,3]
 console.log(majorityElement(arr))
 function majorityElement1(arr){
    let hash = {}
    let target  = ~~(arr.length/2);
    for(let i =0; i<arr.length;i++){
        if(!(arr[i] in hash)){
            hash[arr[i]] =  1;
        }else{
            hash[arr[i]]++;
        }
        if(hash[arr[i]]>target){
            return arr[i];
        }
    }
 }
 

 /***
  * 社区答案 
  * 有点看不懂这个
  * // 
  *     看懂之后觉得好妙！新解锁一种计数方式（除hash外
  */

// [1,2,3,3,3]
function majorityElement(nums) {
    let count = 0;
    let candidate = null;
    nums.forEach(num => {
       if(count === 0) {
           candidate = num;
       } 
       // 通过这个计数的均衡 来确定 某个数出现大于了一半
       count += (num === candidate) ? 1 : -1;
    });
    return candidate;
};