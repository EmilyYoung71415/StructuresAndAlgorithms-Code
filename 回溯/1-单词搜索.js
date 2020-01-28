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

console.log(exist([['a']],'b'))
/****
 * 错误过的例子:
 * [["a"]]
"   ab" ==> board[0].length==0
 * 
   [['a']] b  
 * 
 */
// 换了个记录方式  不是传递str的n 而是裁剪word
function exist2(board,word){
    const dx = [-1,1,0,0],dy = [0,0,-1,1];// 控制上下左右联动
    if(board.length==0||board[0].length==0) return true;
    for(let i=0; i<board.length; i++){
        for(let j=0; j<board[0].length; j++){
            if(check(board, word, i, j)){
                return true;
            }
        }
    }
    return false;


    function check(board,word,i,j){
        if(word.length==0) return true;
        if(i<0 || j<0 ||i>=board.length ||j>=board[0].length){
            return false;
        }
        if(word[0]==board[i][j]){
            let temp = word[0];
            board[i][j]='#';// # 记录节点已被访问
            // if( check(board,word.substr(1), i+1, j)||
            //     check(board,word.substr(1), i-1, j)||
            //     check(board,word.substr(1), i, j+1)||
            //     check(board,word.substr(1), i, j-1)
            // ){
            //     return true;
            // }
            for(let k=0;k<4;k++){
                let x = i + dx[k],y = j + dy[k];
                if(check(board,word.substr(1),x,y)){
                    return true;
                }
            }
            board[i][j]=temp;// 回溯到当前字符
        }
        return false;
    }
}
