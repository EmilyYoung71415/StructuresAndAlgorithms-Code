/****
 * 01背包
 * 
 * 已知一个背包称重max_w,有n种物品可以选择,
 * 每种物品的重量和价值分别为wi,vi,如果每种物品
 * 每种物品只能选择1个,怎么选择物品使得背包价值最大?
 * 物品不能拆分,价值、重量等都是正整数
 * 
 * exp:
 * n = 3,max_w = 5
 * w = [2,3,4]
 * v = [3,4,5]
 * 
 * output:[1,1,0],7
 * 
 * exp2:
 * n = 4,max_w = 5
 * w = [2,1,3,2]
 * v = [12,10,20,15]
 * 
 * output:[1,1,0,1],37
 * 
 * 
 */

 /****
  * 思路:
  * 子问题界定：
  *     f(i,j)表示前i个物品选择称重j的背包产生的最大价值 物品i要么选择要么不选择
  * 递推方程式:
  *     f(i,j) = max{f(i-1,j),f(i-1,j-wi)+vi}, j>=wi
  *            or  f(i-1,j),j<wi
  * 初始值:
  *     f(0,j) = 0,f(i,0)=0;
  * 
  */

/******
 * w = [2,3,4]、v = [3,4,5]、max_w=5
 * 状态矩阵:
 * i\j 承重为j的背包在前i个物品中选择得到的最大价值
 * i\j    0  1  2  3  4  5
    0   [ 0, 0, 0, 0, 0, 0 ],
    1   [ 0, 0, 3, 3, 3, 3 ],
    2   [ 0, 0, 3, 4, 4, 7 ],
    3   [ 0, 0, 3, 4, 5, 7 ] 
 *
 * 得到最大价值是 7
 * 回溯状态矩阵的计算过程可以得到最优子集的组成元素
 * f(3,5)=f(2,5) ==> 物品3并没引起变化，所以没有选择物品3
 * f(2,5)>f(1,5) ==> 最优解包含:物品2，且填满背包余下的5-3=2个单位承重的子最优解f(1,3)
 * f(1,3)>f(0,3) ==> 最优解包含:物品2、物品3
 * ==> [1,1,0]
 */

console.log(knapSack_01(3,[2,3,4],[3,4,5],5))
// console.log(knapSack(4,[2,1,3,2],[12,10,20,15],5))
function knapSack_01(n,w,v,max_w){
    let f = [];
    w.unshift(0),
    v.unshift(0);

    //生成一个二维矩阵
    for(let i=0;i<=n;i++){
        f[i] = [];
    }

    for(let i=0;i<=n;i++){
        // j是当前背包承重为j
        for(let j=0;j<=max_w;j++){
            if(i==0||j==0){
                f[i][j] = 0;
            }
            else if(j>=w[i]){
                f[i][j] = Math.max(f[i-1][j],f[i-1][j-w[i]]+v[i]);
            }
            // i在数组v中、w中 从0开始计数的 v.length=n=3
            // 矩阵的行一共有 n+1 当遍历到第一行是 其实指向的是物品0
            // 解决方法:1.取数据的时候手动-1;2.v、w也补全占位元素，使得长度=n+1
            // else if(j>=w[i-1]){
            //     f[i][j] = Math.max(f[i-1][j],f[i-1][j-w[i-1]]+v[i-1]);
            // }
            else{
                f[i][j] = f[i-1][j];
            }
        }
    }

    let result = getDetail(f,n,w,v,max_w);
    return [result,f[n][max_w]]

    function getDetail(f,n,w,v,max_w){
        let result = [],// 初始值 所有物品都没有选择
            i = n,
            j = max_w;
        
        while(i>0&&j>0){
            if(f[i][j]!=f[i-1][j]){
                result.unshift(1);
                j = j - w[i];
            }
            else{
                result.unshift(0)
            }
            i--;
        }
        return result;
    }
}