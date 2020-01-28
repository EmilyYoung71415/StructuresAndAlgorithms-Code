/******
 * leetcode:22
 * 给出 n 代表生成括号的对数,请你写出一个函数,使其能够生成所有可能的并且有效的括号组合
 * 比如n==3
 * [
    "((()))",
    "(()())",
    "(())()",
    "()(())",
    "()()()"
   ]
 *
 * 思路：
 *  1、类似于全排列的问题，所以可以看成一个[][][][][][] 2n个空格，
 *     每个空格 ( or )   然后判断是否合法
 *     时间复杂度：2^2n
 * 
 *  2、改进：剪枝
 *      2.1 局部不合法、不再递归 比如一开始就是)
 *      2.2 左右括号 各n个，所以不是全选，===> 记住当前左右括号 各用了多少
 *      时间复杂度：2^n    
 * 
 * 实现思路：
 *  way1、可以看作在 ))) 中从右边插入新的左括号(,左括号必须在右括号前面
 *  way2、str = '' 之后不断添加新的字符,左括号在前，右括号存在数量不能多于左括号
 */


function generateParenthesis(n){
    let result= [];
    genCall(0,0,"");
    return result;

    function genCall(left,right,str){
        if(left==n&&right==n){
            result.push(str);
        }

        // 左括号加无限制
        if(left<n){
            genCall(left+1,right,str+'(');
        }
        // 右括号条件：当前有能匹配到他的足够数量的左括号
        if(left>right&&right<n){
            genCall(left,right+1,str+')');
        }
    }

}   