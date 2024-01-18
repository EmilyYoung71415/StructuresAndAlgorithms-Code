/**
 *  1 3 2
 *  0 3 4
 *  5 7 0
 * 
 * 从1开始走，每一步只能向右、向下走，求走到最右下的格子时产生的最小路径和
 * 如上例，1->0->3->4->0
 * ===> 8
 * 
 * 复杂度：
 *      
 */

 // 递归解法
/**
 * 当最右下一格的时候：无法再走，递归终点。
 * 当处于最后一行或者最后一列的时候，
 *         只有一个方向，返回当前格子 + 之间的数(递归吧)
 * 当处于中间格子，有两个方向可选择时，
 *          取min
 */
 let arrtest = [[1,3,2],[0,3,4],[5,7,0]];
//console.log(minPath(arrtest))
function minPath(arr){
    console.time('minPath')
    let res =  process(arr,0,0)// 从起点(0,0)到终点的最优路径
    console.timeEnd('minPath')
    return res;
    function process(matrix,i,j){
        // base-case
        if(i===matrix.length-1&&j===matrix[0].length-1){
            return matrix[i][j];
        }
        // i\j 至少有一个没到达最终位置
        // i\j 表示第i行第j列
        if(j===matrix[0].length-1){
            return matrix[i][j] + process(matrix,i+1,j);
        }
        if(i===matrix.length-1){
            return matrix[i][j] + process(matrix,i,j+1);
        }
        return matrix[i][j] + Math.min(process(matrix,i+1,j),process(matrix,i,j+1));
    }
}

// 优化 Step1
/**
 * 暴力递归的弊端：
 *      没有保存每一步的值，只能看到最后的数据
 *      因为不记录子过程的解，而在更小子过程划分时会重复遇到这个解，
 *      因此存在总是重复计算
 * 
 * 倘若有n个节点需要去尝试，而每个节点理论上都有两条路可以选择
 * 复杂度： 2^n
 * 
 * 
 * 优化： 
 *      做一个缓存。放在公有的map里，每次需要计算时先判断map里是否已有现成值
 */
//console.log(minPath_cache(arrtest))
function minPath_cache(arr){
    console.time('minPath_cache')
    let cache = {};
    let res = process(arr,0,0)// 从起点(0,0)到终点的最优路径

    console.timeEnd('minPath_cache')
    return res;
    function process(matrix,i,j){
        let res = 0;
        if(i===matrix.length-1&&j===matrix[0].length-1){
            res = matrix[i][j];
        }else if(j===matrix[0].length-1){
            // 先查cache里的值 取代process(matrix,i+1,j)的递归查值
            let next = 0;
            let key = `${i+1}_${j}`;
            if(cache[key]){
                next = cache[key];
            }else{
                next = process(matrix,i+1,j);
            }

            res = matrix[i][j] + next;
        }else if(i===matrix.length-1){
            let next = 0;
            let key = `${i}_${j+1}`;
            if(cache[key]){
                next = cache[key];
            }else{
                next = process(matrix,i,j+1);
            }

            res = matrix[i][j] + next;
        }else {
            let downNext = 0;
            let downkey = `${i+1}_${j}`;
            if(cache[downkey]){
                downNext = cache[downkey];
            }else{
                downNext = process(matrix,i+1,j);
            }
            
            let rightNext = 0;
            let rightkey = `${i}_${j+1}`;
            if(cache[rightkey]){
                rightNext = cache[rightkey];
            }else{
                rightNext = process(matrix,i,j+1);
            }

            res =  matrix[i][j] + Math.min(downNext,rightNext);
        }
        // 申请一个map
        let key  = `${i}_${j}`;
        cache[key] = res;
        return res;
    }
}


/**
 * 以DP思想解决最短路径问题：
 *      考虑数据之间的依赖关系
 * 递归改动态规划：搭积木
 *       最右下格子不被任何格子依赖，倒推
 *   当只考虑最后一行时，这一行的每个元素可依次由右边的数推的
 *   同理，最后一列亦然
 * 
 * 所以Dp过来即是：
 *    在递归的基础上建立依赖关系     
 * 当是行边时，
 *      如只有row变化，第一列
 *      dp[i][0] = dp[i - 1][0] + m[i][0];
 * 当中间时
 *      取dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + m[i][j];
原始矩阵matrix      DP矩阵
1 3 2                
0 3 4               
5 7 0
    复杂度：M*N
    额外空间 M*N
 * @param {*} arr 
 */

console.log(minPath_DP(arrtest))
function minPath_DP(arr){
    if (arr == null || arr.length == 0 || arr[0] == null || arr[0].length == 0) {
        return 0;
    }
    let row = arr.length;
    let col = arr[0].length;

    let Dp = [];

    for(let i = 0;i<row;i++){
        Dp[i] = [];
    }

    Dp[0][0] = arr[0][0];

    
    for(let i = 1;i<row;i++){
        Dp[i][0]  = Dp[i-1][0] + arr[i][0];
    }

    for(let j = 1;j<col;j++){
        Dp[0][j]  = Dp[0][j-1] + arr[0][j];
    }

    for(let i = 1;i<row;i++){
        for(let j=1;j<col;j++){
            Dp[i][j]  = Math.min(Dp[i-1][j],Dp[i][j-1]) + arr[i][j];
        }
    }
    return Dp[row-1][col-1];
}

/**
 * DP的压缩空间实现
 * 二维降一维
 * 时间复杂度仍然是M*N 但空间变为min{M,n}
 * 
 * ===> 一维数组滚动更新
 * 局限：
 *     滚动更新，所以，求解轨迹无法回溯
 * 
 * 实现思路?
 *      
 */

// 压缩空间
