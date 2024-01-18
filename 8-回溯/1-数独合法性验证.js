/****
 * leetcode:36
 * 判断当前数独已填好的空是否符合9x9 的数独要求
 *  数字 1-9 在每一行只能出现一次。
    数字 1-9 在每一列只能出现一次。
    数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
 *
 */
let board = [
    [".",".","4",".",".",".","6","3","."],
    [".",".",".",".",".",".",".",".","."],
    ["5",".",".",".",".",".",".","9","."],
    [".",".",".","5","6",".",".",".","."],
    ["4",".","3",".",".",".",".",".","1"],
    [".",".",".","7",".",".",".",".","."],
    [".",".",".","5",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."]
]
/****
 * 思路:
 * 难点:1、大矩阵的小矩阵重复判断 2、行列判断
 * 1、普通行列遍历，每隔三个三个的分界，判断是否重复？
 *  ==> 麻烦 易出错
 * 2、
 *  既然是一个个小矩阵为一个集合(以粗实线分隔的 3x3 宫内只能出现一次),
 *  那么将大矩阵分为小集合，相应数放在集合里，如果有重复就失败
 * ==》 可以用[{},{},{}..] 标记列 和小集合
 *      也可以用col = [9], range[3][3] 标记列、标记 小集合
 *  
 */
console.log(isValidSudoku(board));
function isValidSudoku(board){
    if(board==null||board.length<1||!Array.isArray(board[0])){
        return false;
    }
    // 生成9个哈希表
    let hashBlocks = [],// 9个3*3检验hash
        hashCols = []; // 9个列检验hash
    for(let i=0;i<9;i++){
        hashBlocks[i] = new Map()
        hashCols[i] = new Map()
    }
    // 遍历一遍board 将数都丢进各自的集合里
    // 属于第几块: i/3 + j/3
    for(let i=0;i<9;i++){
        // 每行申请一个临时 hash 检测 行重复问题
        let hashRow = new Map()
        for(let j=0;j<9;j++){
            let // 3*(i/3)^0 (❌)
                blockIndex = 3*((i/3)^0) + (j/3)^0,
                data = board[i][j];

            if(data=='.') continue;

            // 重复检测:3*3矩阵、列
            if(hashBlocks[blockIndex].get(data)||hashRow.get(data)||hashCols[j].get(data)){
                return false;
            }

            // 设置
            hashBlocks[blockIndex].set(data,1)
            hashRow.set(data,1)
            hashCols[j].set(data,1)
        }
    }
    return true;
}