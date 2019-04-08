/****
 * leetcode:51
 * n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，
 * 并且使皇后彼此之间不能相互攻击。
 * (即使得棋盘上没有两个皇后在同一行、同一列、同一45°斜线上)
 * 
 *  给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。
    每一种解法包含一个明确的 n 皇后问题的棋子放置方案，
    该方案中 'Q' 和 '.' 分别代表了皇后和空位。
 * 
 *  输入: 4
    输出: 
    [
        [".Q..",  // 解法 1
        "...Q",
        "Q...",
        "..Q."],

        ["..Q.",  // 解法 2
        "Q...",
        "...Q",
        ".Q.."]
    ]
    解释: 4 皇后问题存在两个不同的解法。
 * 
 */


/*****
 * 逻辑思路:
 * 画出状态树,pathArr<2,0,3,1>代表 第i行的第arr[i]列放置棋子
 * 
 * 回溯产生的树：
 * 第i层是棋盘第i行选择不同列的放置情况遍历
 * 树的分支：上一行的棋子放置后，下一行的放置4种选择对应4列，即每个节点分支树固定
 * 
 * 树的形态是4叉树，如果是n皇后问题就是n叉树
 * 
 * 代码思路:
 * for循环遍历还是分支节点，
 * 约束条件：互不攻击，如果当前节点与之前产生的节点有攻击 则跳过此节点
 * 
 * result.push的时候转换下 pathArr
 * 
 * 状态变量:无. 每次都是从头开始遍历的
 * 递归结束:pathArr.length==n
 * 
 */

console.log(solveNQueens(4))
/**
 * @param {number} n
 * @return {string[][]}
 */
/*****
 * 错误例子:n=5
 * 
 * 我多出来的未通过测试的结果:
 *  [ '.Q...', '...Q.', 'Q....', '....Q', '..Q..' ]
    [ '..Q..', 'Q....', '....Q', '.Q...', '...Q.' ]
    [ '..Q..', '....Q', 'Q....', '...Q.', '.Q...' ]
    [ '...Q.', '.Q...', '....Q', 'Q....', '..Q..' ]
 * 
 * 
 *  row1:   0 0 1 0 0
    row2:   0 0 0 0 1
    row3:   1 0 0 0 0
    row4:   0 0 0 1 0
    row5:   0 1 0 0 0
 * 
 * row1和row3可以攻击.. 原来对角线定义这么广泛啊555
 * row2和row5可以攻击
 * 
 * ===> 快速有效判断平面上两点是否在同一斜线上
    已知两点a、b,他们坐标分别为 a(i,j),b(m,n),如果他们在同一对角线线上则满足:
        |i-m| = |j-n| (|| 绝对值)
 * 
 */

// 代码优化
function solveNQueens(n){
    let result = [];
    solveNQueensCall([]);
    return result;

    function solveNQueensCall(pathArr){
        if(pathArr.length==n){
            pathArr.forEach((col,index) => {
                pathArr[index] = '.'.repeat(col)+'Q'+'.'.repeat(n-col-1);
            });
            result.push(pathArr)
        }
        else{
            // 横向遍历，新的每一行都可以有n列可选择
            for(let col=0;col<n;col++){
                // 判断当前已在棋盘里的棋子 与 新来的棋子 是否会发生攻击
                if(hasAttack(pathArr,col)) continue;
                let tempArr = pathArr.slice();
                tempArr.push(col);
                solveNQueensCall(tempArr);
            } 
        }
    }

    function hasAttack(pathArr,newCol){
        let len = newRow = pathArr.length;//<2,1,0> len=3 同时3也是新元素的行号newRow
        if(len>0){
            for(let prevRow=0;prevRow<len;prevRow++){// 遍历已在棋盘中的点
                let prevCol = pathArr[prevRow];// 当前遍历点的棋盘坐标 (row,prevCol) 当前新点的棋盘坐标(newRow,newCol)

                // 同列 or 同斜线
                if(prevCol==newCol||Math.abs(prevRow-newRow)==Math.abs(prevCol-newCol)){
                    return true;
                }
            }
        }
        return false;
    }
}