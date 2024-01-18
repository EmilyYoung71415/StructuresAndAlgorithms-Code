/**
 * 最长公共子序列
 * 如str1="1A2B3C",str2="B1D23CA" LCS="123C"
 * 在两个字符串序列中以相同顺序出现，但不要求连续（非字符串子串）的字符串序列
 * 
 * 思路:
 *      str1 = {x1,x2,x3,....xn}
 *      str2 = {y1,y2,y3,....ym}
 * 从后面开始思考：
 *      如果xn==ym 那么该元素一定位于 最长子序列中
 *                 接下来只需找 LCS{x1...xn-1,y1...ym-1}
 *      如果xn!=ym
 *              LCS{xn-1,ym} 
 *                  最长子序列在{x1,x2,...x(n-1)} 和
 *                             {y1,y2,...ym}找
 *              or LCS{xn,ym-1}
 * 
 * 思路是先求dp矩阵，然后依据dp矩阵 反向求出最长公共子序列
 *  DP[i][j]表示str1[0...i-1]与str2[0...j-1]的最长公共子序列长度
 * 
 *  特殊值：
 *      第一列: ABCD C 遍历ABCD当B=B之后，B之后的所有元素的LCS也至少为1
 *          str1[0...i-1]与str2[0],如果str1[i]==str2[0] 则其之后的DP[i+1..][0]=1
 *      
 *      第一行: A 与 BCD 同理
 *  普通元素
 *      str1[i]===str2[j]: dp[i-1][j-1]+1
 *      str1[i]!==str2[j]
 *          依赖于  dp[i-1][j]  或 dp[i][j-1]
 *      取大的
 * 
 */

LCS("B1D23CA","1A2B3C");
 function LCS(str1,str2){
    let str1Arr = str1.split("");
    let str2Arr = str2.split("");
    let row = str1Arr.length-1;
    let col = str2Arr.length-1;

    let Dp = getDp(str1Arr,str2Arr);

    let resArr = [];// 最右下角的值表示 取得的最长公共序列长度
    let curIndex =  Dp[row][col]-1;
    while(curIndex>=0){
        if(col>0&&Dp[row][col]==Dp[row][col-1]){
            col--;
        }
        else if(row>0&&Dp[row][col]==Dp[row-1][col]){
            row--;
        }
        // 发生了+1操作的
        else {
            resArr[curIndex--] = str1Arr[row];// 将当前字符收集起来
            row--;
            col--;
        }
    }
    return resArr.join("");
 }


function getDp(str1,str2){
    let Dp = [];
    // 初始化二维数组
    for(let i=0;i<str1.length;i++){
        Dp[i] = [];
    }

    Dp[0][0] = str1[0]===str2[0]?1:0;

    // 初始化第一行/第一列
    for(let i=1;i<str1.length;i++){
        // 这个写法很简练
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
   // console.log(Dp);
    return Dp;
}