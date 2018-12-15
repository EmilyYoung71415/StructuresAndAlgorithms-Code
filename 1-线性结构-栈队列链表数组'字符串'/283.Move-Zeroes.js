/******************************************
 
数组元素移位
将数组里的所有的0都移动到数组后面。同时保持数组里非0元素的相对位置


Input: [0,1,0,3,12]
Output: [1,3,12,0,0]

要求：
    1、不能产生额外空间
    2、最少次的操作元素
    3、不要return值，只是修改传入的arr即可

******************************************/


/****
 * 思路：100%
 *     遍历数组，非0的提取出来，之后用0补齐到数组后面
 *      ===-> 如果额外申请一个数组 那很简单，可是不能
 *  遍历：
 *      记录当前 非0元素。后续才能知道
 * 
 *  0 1 0 3 12
 *  记录当前 非0个数count 遍历到非0时 就a[count] = 非零数
 *  遍历完了之后。  
 *  1 3 12 3 12
 *  
 *  再遍历数组，从copunt开始 归零元素
 */
const arr = [0,1,0,3,12]
moveZeroes(arr);
 function moveZeroes(arr){
    let notZeroNum = 0;// 非零元素个数
    for(let i=0;i<arr.length;i++){
        if(arr[i]){// 非0元素
            arr[notZeroNum] = arr[i];
            notZeroNum++;
        }
    }
    for(let i=notZeroNum;i<arr.length;i++){
        arr[i] = 0;
    }
 }


/*****
 * 社区解法
 *      
 * 从后往前遍历，遇0杀0,再push到末尾
 * 反向遍历：
 *      因为新push的数在末尾 反向遍历不会干扰
 *      节约一个记录值
 */

var moveZeroes = function(nums) {
    for (let i = nums.length - 1; i >=0; i--) {
        if (nums[i] === 0){
            nums.splice(i, 1);
            nums.push(0);
        }
    }
};