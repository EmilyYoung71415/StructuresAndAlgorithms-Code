/**
 *　str1 = '1AB2345CD'
 *  str2 = '12345EF'
 * 那么最长公共子串: 2356
 * 
 * 
 * 思路:
 *      生成的dp矩阵表示的含义:
 *      dp[i][j]:把str1[i]和str2[j]都当作公共子串的最后一个字符时。
 *              最长公共子串能达到的长度
 *      比如： 
 *           str1 = 'A1234B' str2 = 'CD1234'
 *          那么dp[3][4] = 表示 以str1[3]==->3 和str2[4]==->3为结尾的字符
 *          此时最长字串为 123 所以长度为3
 *      
 *      如果 str1[i]!=str2[j] 那么 dp[i][j] = 0；
 *      
 *      特殊元素：
 *          1、第一列 str1='ABAC'  str2='A'
 *              dp[1~4][0] = 1 0 1 0;
 *          2、第一行 亦然
 *          3、普通元素
 *              如果当前 str1[i] = str2[j]  那么就是 dp[i-1][j-1]+1
 *              如果不等于 那么就是 0
 * 
 * 课后思考：
 *      该题的套路还是：
 *          1、先生成dp矩阵，到了[i][j]为前xx个的个数集合
 *          2、根据dp遍历 字符串 生成符合要求的 结果
 */

let str1 = '1AB2345CD';
let str2 = '12345EF';// 结束下标 4 一共截取2个
// 4-2+1=3 start
// end:end+1 因为 substring 不包括最后一个i
let str  = getStr(str1,str2);
console.log(str)
function getStr(str1, str2) {
    let dp = getDp(str1,str2);

    // 开始遍历dp 找到最大的那个元素
    let maxCount = 0;
    let index = 0;
    for(let i=0;i<str1.length;i++){
        for(let j=0;j<str2.length;j++){
            if(dp[i][j]>maxCount){
                maxCount = dp[i][j];
                end = i;
            }
        }
    }
    return str1.substring(end-maxCount+1,end+1);
}

function getDp(str1, str2) {
    let dp = [];

    let
        row = str1.length,
        col = str2.length;

    for (let i = 0; i < row; i++) {
        dp[i] = [];
        // 第一列
        if (str1[i] == str2[0]) {
            dp[i][0] = 1;
        } else {
            dp[i][0] = 0;
        }
    }

    // 第一行
    for (let j = 0; j < col; j++) {
        if (str1[0] == str2[j]) {
            dp[0][j] = 1;
        } else {
            dp[0][j] = 0;
        }
    }

    // 普通元素
    for (let i = 1; i < row; i++) {
        for (let j = 1; j < col; j++) {
            if (str1[i] == str2[j]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = 0;
            }
        }
    }
    return dp;
}