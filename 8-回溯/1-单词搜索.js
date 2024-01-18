/*****
 * leetcode:79
 *  给定一个二维网格和一个单词，找出该单词是否存在于网格中。
    单词必须按照字母顺序，通过相邻的单元格内的字母构成，
    其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
    同一个单元格内的字母不允许被重复使用。
 * exp
    let board =
    [
        ['A','B','C','E'],
        ['S','F','C','S'],
        ['A','D','E','E']
    ]

    给定 word = "ABCCED", 返回 true.
    给定 word = "SEE", 返回 true.
    给定 word = "ABCB", 返回 false.
 * 
 */

/*****
 * "相邻"单元格是那些水平相邻或垂直相邻的单元格
 * 那么即到了当前单元格 他可能的走向 是 上下左右4个方向
 * 
 * 那么深度优先遍历,从第一个格子开始，下个走向是 上下左右
 * 如果当前格满足则 继续探索上下左右，
 * 如果当前格不满足 则回到上个格子，继续探索上下左右的下个方向
 * 
 * 伴随变量：
 * n：匹配到当前为止，已经匹配到了字符串的第index下标
 * i、j ： 当前棋盘的遍历下标
 */
const board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

console.log(exist(board,'ABCCED'))
function exist(board,word){
    const dx = [-1,1,0,0],// 控制上下左右联动
          dy = [0,0,-1,1],
          rowLen = board.length,
          colLen = board[0].length;
    return existCall(board,0,0,'');

    function existCall(board,i,j,n){
        if(n==word.length-1){
            return true;
        }
        if(i>=rowLen||j>=colLen){
            return false;
        }
        // 从当前格子发散 考虑四个方向 
        for(let k=0;k<4;k++){
            let x = i + dx[k],
                y = j + dy[k];
            // 当前棋盘的字符是匹配的
            if((x>=0&&x<colLen&&y>=0&&y<rowLen)&&board[x][y]==word[n]){
                return existCall(board,x,y,n+1);
            }
        }
        // 当前格子的4个方向都遍历完了都没找到一样的
    }
}