/**
 * 给出面额arr = [1,2,5,10] 每种面额可使用多张钱币。
 * 期望找零值 aim = 36
 * 请返回 找零的组合方案使得钱币张数最少
 * 
 * 如 arr = [2,3,5]
 *    aim = 20
 * return 4 ==> 5*5*5*5
 * 
 * 思路：Dp
 * DP[i][j] 表示 
 *      i\j 组成j面值
 *  任意使用币种Dp[i]
 * DP[i][j]表示任意使用币种[i] 组成j面值需要的最少张数
 * 
 * 期望值出现在 最右下部位
 * 
 * 1、
 *  DP[0...n-1][0] =  0 // 第一列 组成0当然0啦
 * 2、
 *  DP[0][0...n-1] = //第一行 仅仅使用币种arr[0],组成相应面额的张数
 *          如arr[0] = 2
 *          arr[0][2] = 1 ; arr[0][4] = 2....
 *    ...即除了是本面值的倍数的j，都不能仅仅以面值arr[i]凑成j
 *    ===》 先一律MAXVALUE，当遇到倍数时 修正
 * 3、
 * 普通元素：从左到右、从上到下
 *      不使用当前面值： DP[i-1][j]  // 前i个面值的币凑成j 需要的张数
 *      使用一张当前面值： DP[i-1][j - 1*arr[i]] + 1
 *      两张：DP[i-1][j - 2*arr[i]] + 2
 *  取min值 简要证明得一般式：
 *      Dp[i][j] = min{Dp[i-1][j],Dp[i][j-arr[i]]+1}
 * 
 * 补充：
 *  当j>arr[i]时即 用一张arr[i]都会超过钱数j，此时Dp[i][j] = Dp[i-1][j]
 */

 //console.log(dpMoneyBack([4,3],6));
 function dpMoneyBack(arr,aim){
    if(arr ===null||arr.length===0||aim<0){
        return -1;
    }
    
    let Dp = [];
    const MAXVALUE = Number.MAX_VALUE;
    // 初始化二维数组： 确定行列标记
    for(let i = 0;i<arr.length;i++){
        Dp[i] = [];
        Dp[i][0] = 0;// 特殊元素:第一列; D[0-n][0]都是0，因为所需最大面值为0
    }

    // 特殊元素：第一行
    for(let j = 1;j<=aim;j++){// 将aim展开为列，因为面值均为整数
        Dp[0][j] = MAXVALUE;
        // 整数倍出现 修正
        if(j-arr[0]>=0&&Dp[0][j-arr[0]]!==MAXVALUE){
            Dp[0][j] = Dp[0][j-arr[0]] + 1;// 始祖为Dp[0][0]=0
        }
    }

    // 从左到右 从上到下的 普通元素
    // 值依赖于之前的值,遍历到当前值所采取的策略：状态转换方程
    //  Dp[i][j] = min{Dp[i-1][j],Dp[i][j-arr[i]]+1}
    // 有可能找不到

    let left = 0;
    for(let i = 1;i<arr.length;i++){
        for(let j=1;j<=aim;j++){
            left = MAXVALUE;
            if(j-arr[i]>=0&&Dp[i][j-arr[i]]!==MAXVALUE){
                left = Dp[i][j-arr[i]] + 1;
            }
            Dp[i][j] = Math.min(left,Dp[i-1][j]);
        }
    }
    return Dp[arr.length-1][aim] !== MAXVALUE?Dp[arr.length-1][aim]:-1;
 }


/**
 * @func 补充问题：
 * arr= [4,2,2,1] 给定数组是代表一张面值为xx的钱币(即不再是 面值类型任意选张数)
 * aim = 20; 求组成最少货币数
 * 
 * @example 
 *     arr=[5,3,2] aim = 20; 
 *     ===> -1; 
 *     arr=[5,3,2,5] aim = 10; 
 *     ===> 2 (5+5);
 * 思路：   
 *      Dp[i][j] 在使用arr[0...n]的货币中(每个值代表一个货币)，组成j所需的最小张数
 * 
 * Dp[i][j] = min{Dp[i-1][j],Dp[i-1][j-arr[i]]+1}
 * Dp[i-1][j-arr[i]]+1: 核心
 *      ===> 因为arr[i]不可重复，只考虑dp[i-1][j-arr[i]]
 */
console.log(dpMoneyBack2([3,2,1],6))
function dpMoneyBack2(arr,aim){
    if(arr ===null||arr.length===0||aim<0){
        return -1;
    }    

    let Dp = [];
    const MAXVALUE = Number.MAX_VALUE;
    // 初始化二维数组： 确定行列标记
    for(let i = 0;i<arr.length;i++){
        Dp[i] = [];
        Dp[i][0] = 0;// 特殊元素:第一列; D[0-n][0]都是0，因为所需最大面值为0
    }

    // 特殊元素：第一行
    for(let j = 1;j<=aim;j++){// 将aim展开为列，因为面值均为整数
        Dp[0][j] = MAXVALUE;
    }
    // 第一行修正 只修正一个即可 因为arr[0]并不能重复
    if(aim>arr[0]){
        Dp[0][arr[0]] = 1;
    }

    let left = 0;
    for(let i = 1;i<arr.length;i++){
        for(let j=1;j<=aim;j++){
            left = MAXVALUE;
            if(j-arr[i]>=0&&Dp[i][j-arr[i]]!==MAXVALUE){
                left = Dp[i-1][j-arr[i]] + 1;
            }
            Dp[i][j] = Math.min(left,Dp[i-1][j]);
        }
    }
    return Dp[arr.length-1][aim] !== MAXVALUE?Dp[arr.length-1][aim]:-1;
}