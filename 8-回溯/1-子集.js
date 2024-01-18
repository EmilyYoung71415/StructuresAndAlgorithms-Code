/*****
 * leetcode:78
<<<<<<< HEAD
 * 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）
 * 
 * 
 */
=======
 * 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）<--离散数学概念
 * 
 * nums = [1,2,3]
 * [
    [3],
    [1],
    [2],
    [1,2,3],
    [1,3],
    [2,3],
    [1,2],
    []
   ]
 */

/*****
 * 思路:
 * 共有2^n 个，[][][] 可以看成三个格子对应三个数，要么选要么不选
 *
 * 将枚举过程转换为状态树 [x] 表示空格
 *                   [x][1][2][3][4]
 *                  /               \
 *              [x]   [1]  [2]  [3]  [4]
 *              / \
 *          [x1] [x2] [x3] [x4]
 *      [x12] [x21] [x34]
 * 因为幂集与顺序无关，所以每层遍历只看当前元素之后的
 * 结束条件就是三个格子占满了
 *
 * 程序设计：解决消去占位格的问题：
 *     result.push()的时候 将pathArr清理一下 消去所有的x
 */
let nums = [1, 2, 3];
console.log(subsets(nums));

function subsets1(nums) {
  nums.unshift('x');
  let result = [];
  subsetsCall([], 0);
  return result;

  function subsetsCall(pathArr, start) {
    if (pathArr.length == nums.length - 1) {
      // 处理一下pathArr
      while (pathArr[0] == 'x') {
        pathArr.shift();
      }
      result.push(pathArr);
    } else {
      for (let i = start; i < nums.length; i++) {
        // 1.从后面的元素开始选
        // 2.空格不包含在其中
        let tempArr = pathArr.slice();
        tempArr.push(nums[i]);
        // if(tempArr[tempArr.length-1]=='x'){
        //     subsetsCall(tempArr,0);// 路径数组尾是空格 那么还是以0开始
        // }
        // else{
        //     subsetsCall(tempArr,i+1);
        // }
        nums[i] == 'x' ? subsetsCall(tempArr, 0) : subsetsCall(tempArr, i + 1);
      }
    }
  }
}

// 优化
/****
 * 其实结束条件可以不是格子占满，
 * 在状态树形成的过程中产生的每个结果都可以当成 子结果的
 *                 [1][2][3]
 * 1  []
 *                 /      \
 * 3           [1]      [2]  [3]
 *             / \       /  \
 * 3        [12]  [13]  [23]
 * 1       [123]
 */
function subsets(nums) {
  let result = [];
  subsetsCall([], 0);
  return result;

  function subsetsCall(pathArr, start) {
    result.push(pathArr);
    for (let i = start; i < nums.length; i++) {
      let tempArr = pathArr.slice();
      tempArr.push(nums[i]);
      subsetsCall(tempArr, i + 1);
    }
<<<<<<< HEAD:8-回溯/1-子集.js
}
>>>>>>> refs/rewritten/restart-阶段2
=======
  }
}
>>>>>>> 3bb86de (style: prettier format):回溯/1-子集.js
