/*****
 * leetcode:46
 * 给定一个没有重复数字的序列，返回其所有可能的全排列
 * exp:
 * input:[1,2,3]
 * output:
 * [
    [1,2,3],
    [1,3,2],
    [2,1,3],
    [2,3,1],
    [3,1,2],
    [3,2,1]
  ]
 *
 *  思路： [][][]
 *  三个格子，第一次遍历 确定 [][][] 三个格子的第一个,[1][][],[2][][],[3][][]
 *  第二次遍历确定剩下的[][] 的第一个元素
 * 需要的伴随变量：当前可供选择的元素arr,
 *               递归结构是树状展开形式，每一条路径确定一个答案
 *             1、2、3
 *          /     |      \
 *      1xx      2xx      3xx
 *      /\      /  \     /   \
 *   12x 13x  21x  23x  31x  32x
 *    /   \    /     \    /    \
 *  123   132 213   231  312  321
 **/
console.log(permute([1,2,3]))
/*****
 * 设计思想 伴随路径arr，在触底的时候返回 return [item]
 * 然后在遍历循环里， 递归之后，处理返回的数组，pathArr = permuteCall(tempArr)
 * pathArr.push(item)
 * 
 * 直到回溯到最上层才会确定3个元素 [1,2,3] 然后result.push(pathArr)
 * 但是在设计回溯之后的继续横向遍历的过程 由于每次要return数据 
 * 所以遍历里写return 导致不能再遍历
 * 
 * 本层处理的遍历逻辑里，遍历的是 当前层可以选择的元素，
 * 是上一层选了元素之后剩下的集合
 * 
 */

function permute1(arr){
    let result = [];
    permuteCall(arr);// 确定第一个元素
    return result;

    /******
     * 
     * let n = arr.length 个，全排列一共会产生 n! 个
     * 每一个递归函数都会伴随一个路径结果 arr
     * 当result[index] ==null 的时候 需要 初始化一个[] (result作为全局变量)
     * 每一层递归会在递归的伴随结果arr 确定一个元素
     * 整个树状递归的结果就是 或者说是 触底条件
     *      剩余选择元素的arr.length==1
     * 
     * 关键难题：
     *      怎么累加递归结果，递归结果是作为return 还是 参数传递
     */
    function permuteCall(resArr){
        if(resArr.length<1) return [];
        // resArr.forEach((item,index) => {
        for(let index=0;index<resArr.length;index++){
            let item = resArr[index];
            let tempArr = resArr.slice(0);// 又要注意浅赋值
            tempArr.splice(index,1);//删除当前遍历元素 表示选用了
            let pathArr = permuteCall(tempArr);// 剩下的可选元素resArr不会包含item
            pathArr.push(item);
            if(pathArr.length==arr.length){
                result.push(pathArr);
            }
            // ❗ 错误1:直接返回[[3,2,1]]
            // 当递归返回到最上层的时候 怎么规避在上上层的时候直接返回
            // 即这个在最上层的时候只有当遍历完了才返回
            // 怎么区分走向index++流程 还是 纵向走
            // 1.当最顶层的时候不直接返回 
            //====> ❗ 错误2:治标不治本 只控制了第一层可以横向扩展 [[3,2,1],[3,1,2],[2,1,3]]
            // 第二层也需要横向扩展
            if(pathArr.length!==arr.length){
                return pathArr;// 向上层传递
            }
        }
        // });
    }
}

/******
 * 关于选择了的元素不能再选择了的处理方法:
 *  遍历nums，如果当前pathArr里有，则忽略此值
 * 
 * 然后pathArr是在往下深入的过程中push的，即触底的时候就 result.push(pathArr)
 * 
 * 怎么处理递归返回与 遍历循环的：
 * 1、pathArr的值在往下递归的时候就逐渐积累了，放在函数传参位置传递的
 *    到了最底层直接将数据交给 result push
 *    无需再通过上层接受return的值来实现数据传递
 * 
 * 2、循环体内没有return，递归函数也没有return.
 *    因为往下的过程就积累了值，(值所有都push到了主函数的result全局变量里了)
 *  
 *    递归什么时候不再有递归的：pathArr.length==nums.length.
 *    即递归base 不一定都要return的
 *    当递归不再有递归的时候，通过调用栈会返回到上一个递归函数，
 *    上一个递归函数记录着当前遍历到了哪个变量。
 *    即实现了  ——> level1 ——> level2 ——> level3  __
 *                            level2 <——  level3 __|
 *                                |—————>  level3 __
 *    类似于一个 弓 的递归路径
 */
function permute2(nums){
    let result = [];
    permuteCall(result,[],nums);
    return result;

    // pathArr 是pathArr
    function permuteCall(result,pathArr,nums){
        if(pathArr.length==nums.length){
            result.push(pathArr)
        }
        else{
            for(let i=0;i<nums.length;i++){
                // 如果已经选择过了当前元素 忽略
                if(pathArr.indexOf(nums[i])>-1) continue;
                // 每次浅复制pathArr 避免改变当层的pathArr
                let currArr = pathArr.slice(0);
                currArr.push(nums[i]);// 当层选中的存储起来 传向下一层
                permuteCall(result,currArr,nums);
            }
        }
    }
}