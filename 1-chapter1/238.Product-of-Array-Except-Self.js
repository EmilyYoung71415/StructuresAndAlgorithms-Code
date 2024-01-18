/******************************************

求数组元素除自身外的对应乘积

exp:
Input:  [1,2,3,4]
Output: [24,12,8,6]

24 = 2*3*4
12 = 1*3*4
要求：不要使用除法，且在 O(n) 时间复杂度内完成此题。
进阶: 尽量在常数空间复杂度内完成这个题目(输出数组不视为额外空间)
******************************************/
/*******
 * 思路：
 *      1、双重循环
 *      2、空间换时间、维护一个循环队列 每次取头元素，得到后面几个数的乘积
 *         ===-> 但是超时
 *          [-1,-1,1,-1,-1,-1,-1,1,1,-1,-1,-1,-1,-1,1,1,1,1,1,1,-1,-1,...]
 *      ３、如果使用除法那确实很简单了
 *      ４、［左边、当前数、右边］
 *      当前数对应的数组乘积　＝　　左边　＊　右边　所以两个指针
 *          成功了 超过了7%...
 */
let nums = [1,2,3,4];
console.log(productExceptSelf(nums));
 function productExceptSelf1(nums){
    let queue = nums;
    let result = [];
    let count = nums.length;

    while(count--){
        let temp = queue.shift();
        let curRes = 1;
        queue.forEach(data => {
            curRes *= data;
        });
        queue.push(temp);
        result.push(curRes);        
    }
    return result;
 }

// 3912ms
// 每一次有重复计算 比如 1*2 1*2*3 但是其实1*2可以省略的
function productExceptSelf2(nums){
    let index = 0;
    let result = [];

    while(index<nums.length){
        let resLeft = 1,
            resRight = 1;
        
        for(let i=0;i<index;i++){
            index>0&&(resLeft *= nums[i]);
        }
        for(let j=nums.length-1;j>index;j--){
            index<nums.length-1&&(resRight *= nums[j]);
        }
        result[index] = resLeft*resRight;
        index++;
    }
    return result;
}


/*******
 * 参考
 * 
 * 112ms
 * 秒就秒在分开了。不一定每次计算都要直接得到结果值
 * 可以拆分 得到中间值
 */

 function productExceptSelf(nums){
    let 
        result = [],
        right = 1;
    result[0] = 1;

    // 一轮游 result的每个数 先得到左边部分的乘积
    for(let i=1;i<nums.length;i++){
        result[i] = nums[i-1] * result[i-1];
    }

    // 从右边开始 计算每个数以右的乘积
    for(let i=nums.length-1;i>=0;i--){
        result[i] *= right;
        right *= nums[i];
    }

    return result;
 }