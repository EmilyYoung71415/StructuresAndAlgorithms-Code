/**
 * @func 补充问题：
 * arr= [4,2,2,1] 给定数组是代表一张面值为xx的钱币
 * (不再是面值类型任意选张数 且钱币不保证不重复)
 * aim = 20; 求组成最少货币数
 * 
 *     arr=[5,3,2] aim = 20; 
 *     ===> -1; 
 *     arr=[5,3,2,5] aim = 10; 
 *     ===> 2 (5+5)
 */


/****
 *思路： 
 * 
 * way1:递归
 * 枚举全部可能性
 * 
 *      
 * way2:dp
 * 
 * 状态定义:Dp[i][j] 在使用arr[0...n]的货币中(每个值代表一个货币)，组成j所需的最小张数
 * 状态转换方程: Dp[i][j] = min{Dp[i-1][j],Dp[i-1][j-arr[i]]+1}
 */
console.log(coinChange([5,3,2,5],10))

// way1
function coinChange(coins,amount){
    let minCount = amount+1;
    coins.sort((a,b)=>a-b);
    coinChangeCall(amount,0,0)
    return minCount>amount?-1:minCount;
    function coinChangeCall(remain,start,sum){
        if(remain==0){
            minCount=sum<minCount?sum:minCount;
        }
        // 失败的
        if(remain<0||start>coins.length-1){
            return;
        }
        else{
            for(let i=start;i<coins.length;i++){
                // 改变点:将 i => i+1
                coinChangeCall(remain-coins[i],i+1,sum+1);
            }
        }
    }
}


// way2
function coinChange2(coins,amount){
    let dp = [],
        len = coins.length,
        MAX_COUNT = amount + 1; 
    if(amount==0) return 0;
    // coins.sort((a,b)=>a-b)
    coins.unshift(0);
    for(let i=0;i<=len;i++){
        dp[i] = [];
    }

    for(let i=0;i<=len;i++){
        for(let j=0;j<=amount;j++){
            // if(i==0||j==0||j<coins[i]){
            if(i==0||j==0){
                dp[i][j] = 0;
            }
            // 第一行
            else if(i==1){
                dp[i][j] = j==coins[i]?1:MAX_COUNT;
                // dp[i][j] = j%coins[i]==0&&j>=coins[i]?(j/coins[i]):MAX_COUNT;
            }
            // 如果当前j<coin[i] 
            else{ 
                dp[i][j] = j>=coins[i]?Math.min(dp[i-1][j],dp[i-1][j-coins[i]]+1):dp[i-1][j];
            }
            
        }
    }
    console.log(dp)
    return dp[len][amount]>amount?-1:dp[len][amount];
}
