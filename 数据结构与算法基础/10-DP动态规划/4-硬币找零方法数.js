/**
 * 每种面值可以使用任意张
 * 求换钱方法
 *      arr = [5,10,25,1]  aim = 15 
 * 15:
 *      5*3
 *      10+5
 *      15*1
 *      10+5*1
 *      5+5+5*1
 *      5*10+5
 * 六种    
 * 
 * *************************
 *  递归思路：
 *  [5,10,25,1] 
 *    0     5                       1000   res1     
 *  用1张5元的，让剩下10、25、1组成995 方法数为 res2
 *    2     5                   990
 *    3     5                   985
 *  ....
 *    200   5                   0       方法数res201         
 * 
 *  所以递归函数　process(arr,index,aim)
 *  用 arr[index及其以前的数额]组成目标数 有的方法数
 * 
 */


//let res = getWaysCount( [5,10,25,1],15)


function getWaysCount(arr,aim){
    return process(arr,0,aim);
}

function process(arr,index,aim){
    let res = 0;// 递归函数内 定义的全局变量
    // 可以在递归过程中 共享 
    // 每次递归时 更新值 

    // 用200张5 剩下的 [10,25,1] 组成 aim=0 元 index=末尾数
    // 这个base很重要 我怎么也没有想到的
    if(index==arr.length){
        res = aim==0?1:0;
    }else{
        // 列举 1张5元的、2张5元的
        for(let i=0;arr[index]*i<=aim;i++){
            res += process(arr,index+1,aim-arr[index]*i);
        }
       // console.log('遍历完之后的'+arr[index])
    }
    return res;
}


/**
 * 可以做个缓存  记忆搜索
 * 对于暴力递归最简单的优化
 * 
 * 分析 变量，然后 构建该变量的二维数组 一个映射集
 * 就可以直接读取 变量对应的 计算数据
 * arr[row][col]
 * row 肯定是 arr[5,10,15,20]
 * col:aim =15 
 *      i\j 0 1 2 3 4 5 6 7 8 9 10 
 *      5   0 0 0 0 0 1 
 *      10
 *      15
 *      20
 */
// let res2 = getWaysCount2( [5,10,25,1],1000)
// console.log(res2)
function getWaysCount2(arr,aim){
    // 全局变量类似arr 的 map  map[arr.length][aim+1]
    // js 初始化二维数组
    let map = [];
    for(let i=0;i<arr.length;i++){
        map[i] = [];
    }
    let res =  process2(arr,0,aim,map);
    console.log(map)
    return res;
}

function process2(arr,index,aim,map){
    let res = 0;
    if(index==arr.length){
        res = aim==0?1:0;
    }else{
        // 列举 1张5元的、2张5元的
        for(let i=0;arr[index]*i<=aim;i++){
            res += process(arr,index+1,aim-arr[index]*i,map);
        }
    }
    // [0][aim]
    map[index][aim] = res==0?-1:res;// 等于0 可能是当前没有计算出来 所以用-1占位
    return res;
}


/*****
 * 由记忆 搜索变为 dp
 * 
 * dp 普通元素公式推导
 *     arr[i]
 *  0张 arr[i] 只使用arr[0...i-1]纸币的时候，方法数：dp[i-1][j]
 *  1张 arr[i]  剩下的钱arr[0...i-1]  方法数: dp[i-1][j-arr[i]]
 *  k张  .... dp[i-1][j-k*arr[i]]
 */

// ( [5,10,25,1],1000)
let res = getWaysCount3( [5,10,25,1],15)
console.log(res)
function getWaysCount3(arr,aim){

    let dp = [];
    for(let i=0;i<arr.length;i++){
        dp[i] = [];
        dp[i][0] = 1;// 第一列初始化
    }

    // 第一行
    for(let j=1;arr[0]*j<=aim;j++){
        // 第一行其余值不算为0吗
        dp[0][arr[0]*j] = 1;
    }

    // 普通元素
    for(let i=1;i<arr.length;i++){
        for(let j=1;j<=aim;j++){
            let num = 0;
            // 求累加和 0 张当前arr[i] 1张当前arr[i] k表示k张
            for(let k=0;k*arr[i]<=j;k++){
                let curlVal = dp[i-1][j-k*arr[i]];
                if(!curlVal) curlVal = 0;
                num += curlVal;
            }
            dp[i][j] = num;
        }
    }

    return dp[arr.length-1][aim];
}

/*****
 * dp公式优化
 * 
 * dp 普通元素公式推导
 *     arr[i]
 *  0张 arr[i] 只使用arr[0...i-1]纸币的时候，方法数：dp[i-1][j]
 *  1张 arr[i]  剩下的钱arr[0...i-1]  方法数: dp[i-1][j-arr[i]]
 *  2   ..... dp[i-1][j-2*arr[i]]
 *  k张  .... dp[i-1][j-k*arr[i]]
 * 
 * 优化
 *      0 张时 方法数 dp[i-1][j]
 *      自此 1张到...k张的累加值 就是 dp[i][j-arr[i]]
 *      这不就是那个推导公式吗..
 *      dp[i][j] = dp[i-1][j]  + dp[i-1][j-arr[i]]
 */