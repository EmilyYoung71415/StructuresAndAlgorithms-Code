/****
 * 最长公共子序列（LCS）：
 * 如str1="1A2B3C",str2="B1D23CA" LCS="123C"
 * 在两个字符串序列中以相同顺序出现，但不要求连续（非字符串子串）的字符串序列
 * 
 * 
 * 思路：
 * 1-Dp格子状态图，求的长度，
 * 最右下角代表str2\str1的最长公共子序列，通过状态图可得到最长序列
 *      DP[i][j]表示str1[0...i-1]与str2[0...j-1]的最长公共子序列长度
 *      初始值：
 *      第一列：str1[0...i-1]与str2[0],如果str1[i]==str2[0] 则其之后的DP[i+1..][0]=1
 *      第一行：同上
 *      普通元素：
 *          当前格子的长度可能是
 *          1、新增的元素:str1[i]===str2[j]
 *              那么就在原来的基础上+1，Dp[i-1][j-1]+1
 *          2、新增的元素并没有新的波动依赖于上次的格子
 *              占上风的 有可能是str1有可能是str2 
 *              str1 = A1BC2 
 *              str2 = AB34C
 *             ==> 当str1 = A1BC时新增的2，新增前后都是str2占上风即无波动
 *                  Dp[i-1][j]
 *              str1 = A1BC2
 *              str2 = AB3C4
 *              当str2 = AB3C新增4时，新增前后都是ABC无变化
 *                  Dp[i][j-1]
 *      决策规则是取大者(最长)
 * 
 * 2-依据状态矩阵确定最长公共子序列
 *     从右下角开始遍历回溯 对应三种移动方式
 *          向上、向左、向斜上
 *          Dp[i][j] > Dp[i-1][j]&&Dp[i][j-1]  斜上
 *          向上/向左：  当前值等于左上其中一个(其实就是大的那个)
 *          Dp[i][j] = Dp[i][j-1] 左
 *          Dp[i][j] = Dp[i][j-1]&&Dp[i-1][j]  上左均可
 *     即还原当时如何求解Dp的过程，当时哪个策略就朝哪个策略移动
 *     收集的字符：
 *          发生了+1操作的字符
 */     
console.log(LCS("B1D23CA","1A2B3C"));
function LCS(str1,str2){
    if(str1===null||str2===null||str1===""||str2===""){
        return "";
    }

    let str1Arr = str1.split("");
    let str2Arr = str2.split("");
    let Dp = getDp(str1Arr,str2Arr);

    let row = str1Arr.length-1;
    let col = str2Arr.length-1;

    let rev = new Array(Dp[row][col]);// 公共字符长度为DP最右下角
    let index = rev.length-1;
    while(index>=0){
        if(col>0&&Dp[row][col]==Dp[row][col-1]){
            col--;
        }
        else if(row>0&&Dp[row][col]==Dp[row-1][col]){
            row--;
        }
        // 发生了+1操作的
        else {
            rev[index--] = str1Arr[row];// 将当前字符收集起来
            row--;
            col--;
        }
    }
    return rev.join("");
}

function getDp(str1,str2){
    let Dp = new Array(str1.length);
    // 初始化二维数组
    for(let i=0;i<str1.length;i++){
        Dp[i] = [];
    }

    Dp[0][0] = str1[0]===str2[0]?1:0;
    // 初始化第一行/第一列
    for(let i=1;i<str1.length;i++){
        Dp[i][0] = Math.max(Dp[i-1][0],str1[i]===str2[0]?1:0);
    }

    for(let j=1;j<str2.length;j++){
        Dp[0][j] = Math.max(Dp[0][j-1],str1[0]===str2[j]?1:0);
    }

    // 普通格子
    for(let i=1;i<str1.length;i++){
        for(let j=1;j<str2.length;j++){
            Dp[i][j] = Math.max(Dp[i-1][j],Dp[i][j-1]);
            if(str1[i]===str2[j]){
                Dp[i][j] = Math.max(Dp[i][j],Dp[i-1][j-1]+1);
            }
        }
    }
    return Dp;
}

/**
 * 测试例子 "B1D23CA","1A2B3C"
 * [0, 0, 0, 1, 1, 1]     
 * [1, 1, 1, 1, 1, 1]
 * [1, 1, 2, 2, 2, 2]
 * [1, 1, 2, 2, 3, 3]
 * [1, 1, 2, 2, 3, 4]
 * [1, 2, 2, 2, 3, 4]、
 * 
 * 
 * 复杂度分析：
 *      构建Dp复杂度： O(M*N)
 *      通过Dp得到LCS过程为O(M+N)  // 最多移动M+N个
 *      额外：O(M*N)
 */