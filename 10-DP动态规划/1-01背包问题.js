/**
 * 给定 n 种物品和一个容量为 C 的背包，物品 i 的重量是 wi，其价值为 vi 
 *      应该如何选择装入背包的物品，使得装入背包中的物品的总价值最大？
 * 
 * 求符合要求的数据项
 * 
 * 算法：
 *      m[i][j] 表示前i件物品中选择若干件放在容量为v的背包中，可以取得的最大价值
 *      m[i][j] = m[i-1][j] // if(j<w[i]) 当前背包容量小于物品重量j
 *               max(m[i-1][j-w[i-1]] + v[i-1],m[i-1][j]) // 尝试拿    
 *              m[i-1][j-w[i-1]]即考虑了i-1件物品，背包容量为j-w[i-1]时的最大价值
 *              即为第i件物品腾出了w[i-1]的空间 
 * 
 * 扩展：
 * 省空间
 *      递归降级==== 二维变一维
 */

/**
    物品  weight  value
    0       2       3
    1       3       4
    2       4       5
遍历生成状态矩阵 i物品i，j 背包容量(因为都是整数嘛)
    初始化
        i\j 0   1   2   3   4   5
        0   0   0   0   0   0   0
        1   0
        2   0
        3   0
    物品0 {2，3}进入
        i\j 0   1   2   3   4   5
        0   0   0   0   0   0   0
        1   0   0   3   3   3   3
        2   0
        3   0
    物品1 {3，4}进入
        i\j 0   1   2   3   4   5
        0   0   0   0   0   0   0
        1   0   0   3   3   3   3
        2   0   0   3   4   4   7
        3   0   0   3   
    ...

    100 380  每件设备x价格 等级y
    20 320
    40 360
    50 310
 */


/**
 * @param w表示物品重量集 [2,3,4]
 * @param v表示物品价值集 [3,4,5]
 * @param n表示背包的容量  5
 * @return  7
 *      背包物品满足容量的情况下，产生的最大价值
 *      打印方案详细情况
 */
//console.log(knapSack([2,3,4],[3,4,5],5))
console.log(knapSack([100,20,40,50],[300,320,360,310],130,3))
function knapSack(w,v,n,sum){
    let 
        m = [],//状态矩阵
        count = v.length;


    // 按照v的数量初始化 状态矩阵 v.length即物品数量
    for(let i=0;i<=count;i++){
        m[i] = [];
    }

    for(let i=0;i<=count;i++){// 当遍历到物品i时
        for(let j=0;j<=n;j++){ 
            if(i===0||j===0){
                m[i][j] = 0;
            }
            else if(w[i-1]<=j){ // 尝试装，取装之前与之后两个选择的最大者
                m[i][j] = Math.max(m[i-1][j],m[i-1][j-w[i-1]] + v[i-1]);
            }
            else{// 装不下
                m[i][j] = m[i-1][j];
            }
        }
    }
    // 扩展：打印一下方案详情
    printDetail(count,n,m,w,v,sum);

    //return m[count][n];
}


function printDetail(n, capacity, ks, weights, values,Maxsum){
    let 
        i = n,
        j = capacity,
        sum = 0;
    console.log(`解决方案包括：`)
    while(i>0&&j>0){
        if(ks[i-1][j]!=ks[i][j]){
            sum ++;
            console.log(`物品${i} 重量:${weights[i-1]} 价值：${values[i-1]}`); 
            i--;
            j = j - ks[i][j];
        }else{
            i--;
        }
    }
}   