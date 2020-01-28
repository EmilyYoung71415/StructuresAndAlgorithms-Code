/***
 * leetcode:37
 * 
 * Do not return anything, modify board in-place instead.
 * 将已填空部分的数独格子进行填充，
 *  给定的数独序列只包含数字 1-9 和字符 '.' 。
    你可以假设给定的数独只有唯一解。
    给定数独永远是 9x9 形式的。
 */


/*****
 * 思路:
 * 当要填一个空的时候,他可以选择的数:{排除当前行有的、排除当前列有的、排除当前小集合有的}
 * 每个格子可以选择的数是有限的，当前格子的选择会限制下一个格子的选择。
 * 
 * 所以类比n皇后问题，也是进行针对不同的选择进行尝试，不满足的回溯。
 * 在此基础上，一些可以加速的改进(剪枝):
 * 1、从分支少的格子开始
 * 2、预处理
 *      怎么知道分支少的格子？
 *      预处理-当前棋盘，将每个格子的可选数的个数标记，然后得知棋盘的所有空白格子，
 *      再在空白格子中根据 可选数的个数进行排序，之后的处理从 分支少的格子开始
 * (而不是之前的普通行列遍历
 * 
 * 3.一种比较高效的算法- dancing link (舞蹈链)
 */
const board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
]
solveSudoku(board)
console.log(board)
function solveSudoku(board){
    if(board==null||board.length<1) return;
    const Str_Num = ['1','2','3','4','5','6','7','8','9'];
    solveSudokuCall(board);

    function solveSudokuCall(board){
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(board[i][j]=='.'){
                    for(let c of Str_Num){
                        if(isValid(board,i,j,c)){
                            board[i][j] = c;
                            if(solveSudokuCall(board)){
                                return true;
                            }
                            // 否则
                            board[i][j] = '.'; // 修改回来 
                        }
                    }
                    // 遍历完了都没有合适的
                    return false;
                }
            }
        }
        return true;
    }

    /***
     *  在棋盘 [i][j]处 填写 字符 c 检查是否数独合法
     *  (同行、同列、同小集合 不出现c元素
     */
    function isValid(board,row,col,c){
        // 既代表行循环 也是 列循环 
        for(let i=0;i<9;i++){
            // c所在列都没有 等于c 的
            if(board[i][col]!='.'&&board[i][col]==c) return false;
            // c所在行
            if(board[row][i]!='.'&&board[row][i]==c) return false;
            // c所在小集合
            if(board[ 3*((row/3)>>0) + (~~(i/3)) ][ 3*((col/3)>>0) + i%3 ]==c){
                return false;
            }
        }
        return true;
    }
}