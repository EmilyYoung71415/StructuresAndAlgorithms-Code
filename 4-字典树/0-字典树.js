/****
 * leetcode:208
 * Trie树，即字典树、前缀树  又称单词查找树 or 树形结构
 * 是哈希树的变种。
 * 
 * 核心思想:空间换时间，利用字符串的公共前缀来降低查询时间的开销
 * 优点：最大限度减少字符串比较，查询效率比哈希表高
 *              ()
 *      a/              \b
 *      (a)             (b)
 *     b/             c/   
 *   (ab)           (bc)
 *    c/\d          d/
 * (abc) (abd)   (bcd) 
 * 
 * 实现: 当前level可以看成['a','b',...] 组成的可供选项，代表26个字母(假如不区分大小写)
 * 
 * 基本性质:                                                                                                        
 * 
 * 1、根节点不包含字符，除根节点外每个节点都只包含一个字符
 * 2、根节点到某一节点，路径上经过的字符链接在一起，为该节点对应字符串
 * 3、每个节点所有子节点包含的字符不一样
 * 
 * 典型应用:统计、排序大量的字符串，搜索引擎文本词频统计
 * 
 *  insert, search, 和 startsWith 这三个操作
 *  trie = new Trie();
 *  trie.insert("apple");
    trie.search("apple");   // 返回 true
    trie.search("app");     // 返回 false
    trie.startsWith("app"); // 返回 true
    trie.insert("app");   
    trie.search("app");     // 返回 true
 * 
 */


class Trie{
    constructor(){
        this.root = {}
    }
    insert(word){
        let curNode = this.root;
        // curNode[c]=curNode[c] || {} 如果不存在则新建一个
        // 将当前的curNode更新 每个节点以字符作为键值
        [...word].forEach(c=>curNode=curNode[c]=curNode[c]||{});
        curNode.isWord = true;// 叶子节点 指向的是一个单词的结束
    }
    searchHelper(word){
        let curNode = this.root;
        for(let i=0;i<word.length;i++){
            if(!curNode) return null;
            curNode = curNode[word[i]];
        }
        return curNode;
    }
    search(word){
        let node = this.searchHelper(word);
        return !!node&&!!node.isWord;
    }
    startsWith(word){
        return !!this.searchHelper(word);//节点转为真值
    }
}

let trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"))
console.log(trie.search("app"))
console.log(trie.startsWith("app"))
trie.insert("app")
console.log(trie.search("app"))

// 返回 true
// 返回 false
// 返回 true
// 返回 true