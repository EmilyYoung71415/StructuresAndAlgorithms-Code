/****
 * leetcode:212
 * words = ["oath","pea","eat","rain"] and board =
    [
        ['o','a','a','n'],
        ['e','t','a','e'],
        ['i','h','k','r'],
        ['i','f','l','v']
    ]

    输出: ["eat","oath"]
 * 
 *  前置题是:leetcode 79 给出一个单词在board里查找是否存在该单词
 *  基本思路是，遍历到当前棋子，上下左右搜寻判断是否当前棋子是否匹配第x个字符
 *                           如果不匹配则回溯到上一个棋子选择新的一个方向尝试
 *  这道题是 给出一系列单词，找出存在于棋盘里的单词
 * 
 */

 /*****
  * 思路：
  * 1、对于每个单词在棋盘里进行深度优先+回溯的方式判断当前单词是否合法
  * ===》 复杂度有点高了
  * 
  * 2、
  *  将当前所有的字符串都插入字典树中
  * 遍历当前棋盘，从左上角开始，如果当前字符对应了trie首字符节点，
  * 那么 棋盘上下左右试探，同时trie移入下一个节点
  * 当当前的trie节点指向的是单词节点的时候  那么证明棋盘走的路径找到了一个单词
  */
const board =[
    ['o','a','a','n'],
    ['e','t','a','e'],
    ['i','h','k','r'],
    ['i','f','l','v']
]
const words = ["oath","pea","eat","rain"]

console.log(findWords(board,words));
function findWords(board,words){
    let root = buildTrie(words),res = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            Dfs(root, i, j, board, res);
        }
    }

    return res;

    function buildTrie(words) {
        let root = {};
        for (let word of words) {
            let curNode = root;
            [...word].forEach(c=>curNode=curNode[c]=curNode[c]||{});
            curNode.word = word;
        }
        return root;
    }

    function Dfs(node, i, j, board, res){
        if (node.word) {
            res.push(node.word);
            node.word = null;// 作废trie里的当前单词
        }
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return;
        if (board[i][j] === '#' || !node[board[i][j]]) return;

        let c = board[i][j];
        board[i][j] = '#'; // mark visited
        Dfs(node[c], i+1, j, board, res);
        Dfs(node[c], i-1, j, board, res);
        Dfs(node[c], i, j+1, board, res);
        Dfs(node[c], i, j-1, board, res);
        board[i][j] = c; // reset
    }
}