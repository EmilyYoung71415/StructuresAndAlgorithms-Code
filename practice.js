/***
 * 快速排序
 * 每次返回基准值
 */


/*
 (function(){
    var a = b = 3;
    /*
        b =3;
        var a =b;
    
})();
 console.log(typeof a)//undefined
 console.log(b)// 1

 */
/*
function test(a){
    a = a+10;
}
var a = 10;// 数值number 是赋值 对象是赋址
test(a);
//console.log(a);// 10

function testArr(arr){
     //arr.push(1,2,3)// ==-> 外面跟着变化
     // arr = [1,2,3,4];// 这里赋值却没有变化
    //arr.concat([1,2]);
    arr = arr.concat([1,2])
}
var arr = [4];
testArr(arr);
console.log(arr);
*/

/*
    以下代码加起来为10的
    let i = 1 + {
        valueOf(){
            return 9;
        }
    }
    console.log(i)
***************************
    let i = 5;
    function a(i){
        i *=2;
    }
    a(i)
***************************
    let i = 0;
    // 如果arr全是空对象 是不会遍历的
    let arr = new Array(10)//.fill(1)
    arr.forEach(()=>{
        i++;
    })
    console.log(i)//0

    let k=0;
    let arr = new Array(10)
    for(let i=0;i<arr.length;i++){
        k++;
    }
    console.log(k)//10

    let i = parseInt('0xA');//10
*/


// 将集合转换为数组
//let A = new Set([1,2,3,4,4])
/**
 * 将集合转换为数组
 * console.log( Array.from(A)) // [1,2,3,4]
 * console.log([...A])
 */

/*****
 * 
 * 钱币找零 钱币无限次使用、 目标值 aim
 * 钱币：[5,3,2] 20 则花 5*4 = 20 即最少4张
 * 
 * 思考：
 *     1、变量： arr遍历，即 当前钱币数额 5 3 2
 *              aim 即凑成xx元
 * 
 *     i\j 0 1 2 3 4 .... 20 //20是aim  0 1 2 3 ..表示凑成xx元的过程
 *     2
 *     3
 *     5
 *      // 2 3 5 表示数额，即第一行，表示只使用币种2凑成j元的找钱张数
 *                          第二行 3 表示 使用 2、3凑成j元的张数
 *    2、矩阵初始化--- 特殊值填充
 *      第一列： 使用币种 凑成0元：  000000
 *      第一行：只使用2元数额，找回j元 需要的最小钱币数
 *          0  1   2   3  4   5   6 
 *       2  0      1      2       3 
 *          即2的倍数的可以找开，其余的 如1，3，5等只使用2找零，表示找不开用max表示
 *      
 *    3、一般元素分析：从左到右、从上到下
 *      dp[i][j]
 *      如 dp[1][j] 使用2、3元 凑成j的最小币种数
 *              min{
 *                  dp[i-1][j],// 不加第i币种
 *                  dp[i-1][j-1*arr[i]]+1 // 加一张当前币种
 *                  dp[i-1][j-2*arr[i]]+2 // 加两张  arr[i]当前币种 j-2*arr[i] 之前的只需要凑成这么多钱
 *              } 
*       即min{
            dp[i-1][j-k*arr[i]]+k
        }

        数学证明:
        min{
            dp[i-1][j] // 不加
            min{ dp[i-1][j-k*arr[i]]+k } k = y+1
            ==>min{ dp[i-1][j -arr[i] - y*arr[i] +y+1 ]    }
            ==>min{  dp[i-1][j -arr[i]] - y*arr[i] +y } == dp[i][j-arr[i]] 
            ==> dp[i][j-arr[i]]+1
        }
        所以:
        min{
            dp[i-1][j],
            dp[i][j-arr[i]] + 1
        }
 */

/*
    最少找零钱币数
 //console.log(dpMoneyBack([5,4,3,2],20));
  function dpMoneyBack(arr,aim){
      let dp = [];
      // 初始化数组 第一列
      for(let i=0;i<arr.length;i++){
        dp[i] = [];
        dp[i][0] = 0;
      }


      // 第一列 aim
      let Max = Number.MAX_SAFE_INTEGER;
      for(let j=1;j<=aim;j++){
            dp[0][j] = Max;

            // 如果j当前钱 为 arr[0]的倍数
            if(j%arr[0]===0){
                dp[0][j] = j/arr[0];
            }
            // 这种时间复杂度要低一点吧  0 1 2 3 4 5 6 
            // 1-2<0 max 2-2=0 且 dp[0][0] = 0 奠定了第一个有倍数的数
            // 3-2=1 但是dp[0][1] = max
            // if(j-arr[0]>=0&&dp[0][j-arr[0]]!==Max){
            //     dp[0][j] = dp[0][j-arr[0]] + 1;// 始祖为Dp[0][0]=0
            // }
      }

    // 开始处理普通dp矩阵
    let 
        row = dp.length,
        col = dp[0].length;
    for(let i=1;i<row;i++){
        for(let j=1;j<col;j++){
            // 这种方式是很暴力的，因为如果一开始 遍历的是 （1,1）j-arr[i] = 2-3 不合适
            let left = dp[i][j-arr[i]]+1;
            if(!left){
                left = Max;
            }
            dp[i][j] = Math.min(dp[i-1][j],left);
        }
    }
    return dp[row-1][col-1]===Max?-1:dp[row-1][col-1];
  }

  /**
   * 扩展
   *      面额数值 唯一呢
   *      即一张钱币只能选择一次
   *        
   * 1、特殊数表示不一 // 所以就是 特殊值变一下
   * 2、普通值
   *       1、如果不需要此币种：那么dp[i][j] = dp[i-1][j]
   *       2、需要这张币，由于只有一张
   *            dp[i-1][j-arr[i]] + 1
   * 
   *            但是有可能 这张钱太大了 j-arr[i] <0
   *            结果还是 不选
   *    所以公式：
   *        min{
   *            dp[i-1][j]
   *            dp[i-1][j-arr[i]]+1 
   *        }
   *

let res = dpMoneyBackuni([5,3,2,5],10);
console.log(res);
function dpMoneyBackuni(arr,aim){
    // 初始化建dp

    let dp = [];
    // 初始化数组 第一列
    for(let i=0;i<arr.length;i++){
      dp[i] = [];
      dp[i][0] = 0;
    }

    let Max = Number.MAX_SAFE_INTEGER;
    for(let j=1;j<=aim;j++){
          dp[0][j] = Max;
          if(j==arr[0]){
            dp[0][j] = 1;
          }         
    }

    let 
    row = dp.length,
    col = dp[0].length;
    for(let i=1;i<row;i++){
        for(let j=1;j<col;j++){
            // 这种方式是很暴力的，因为如果一开始 遍历的是 （1,1）j-arr[i] = 2-3 不合适
            let left = dp[i][j-arr[i]]+1;
            if(!left){
                left = Max;
            }
            dp[i][j] = Math.min(dp[i-1][j],left);
        }
    }
    return dp[row-1][col-1]===Max?-1:dp[row-1][col-1];
}

*/