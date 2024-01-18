/**
 * Trie树又叫字典树、前缀树
 *      strArr = ["abc","bcd","abd"];
 * 生成的Trie树结构
 *          ()
 *      a/      \b
 *      ()      ()
 *     b/      c/   
 *     ()      ()
 *    c/\d    d/
 *   () ()   () 
 * 
 * 节点的数据项:
 *      path:记录经过它的节点
 *      end: 以该节点结尾的字符串个数，即该节点上挂了的完整节点个数
 *      map: 该节点包含的边 
 * 
 * trie树的键不是直接保存在节点中，而是由节点在树中的位置决定
 * 优点：最大限度地减少无谓的字符串比较，哈希树的变种查询效率比哈希表高
 * 核心思想：提取字符串的公共前缀
 * 
 * Trie树应用:词频统计
 *  统计前缀出现的次数
 *  翻译（密码，明文）
 *  实现搜索引擎的热门搜索排名
 *  输入自动补全
 * https://www.javascriptcn.com/read-6515.html
 *  设： 输入仅限字符a-z 和A-Z
 * 删除逻辑：
 *      当前节点（字符串的某字符）的path --
 *      如果减后是0则删去该节点以下的所有字符
 */

function trieNode(){
    this.path = 0;// 有多少字符串走过该节点(不是字符)==>直观可统计以xx为前缀的字符串个数
    this.end = 0;// 有多少字符串以这个节点为结束==> 直观可得该字符串的个数
    this.nexts = [];// 记录该节点边映射 map为0-25 字母不区分大小写
}

function trieTree(){
    this.root = new trieNode();
}

trieTree.prototype = {
    isValid:function(word){
        // 每个字符是否合法 即都是字母
        return /^[a-zA-Z]+$/i.test(word);
    },
    insert:function(word){
        if(word==null||!this.isValid(word)){
            throw new Error('输入只能全为字母')
        }
        let node = this.root;
        for(let i=0;i<word.length;i++){
            let index = word.charCodeAt(i);
            index = index<97?index-65:index-97;
            if(node.nexts[index]==null){
                node.nexts[index] = new trieNode();
            }
            node = node.nexts[index];
            node.path++;
        }
        // 记录以该节点结束的字符个数
        node.end++;
    },
    // 查找是否存在某字符
    search:function(word){
        if(word==null||!this.isValid(word)){
            throw new Error('输入只能全为字母')
        }
        let node = this.root;
        for(let i=0;i<word.length;i++){
            let index = word.charCodeAt(i);
            index = index<97?index-65:index-97;
            if(node.nexts[index]==null){
                return false;
            }
            node = node.nexts[index];
        }
        return node.end!=0;
    },
    delete:function(word){
        if(this.search(word)){
            let node = this.root;
            for(let i=0;i<word.length;i++){
                let index = word.charCodeAt(i);
                index = index<97?index-65:index-97;
                if(node.nexts[index].path-- ==1){
                    node.nexts[index] = null;
                    return true;
                }
                node = node.nexts[index];
            }
            node.end--;
        }
        return false;
    },
    // 统计以xx为开头的字符串的个数
    prefixNumber:function(pre){
        if(pre==null||!this.isValid(pre)){
            throw new Error('输入只能全为字母')
        }
        let node = this.root;
        for(let i=0;i<pre.length;i++){
            let index = pre.charCodeAt(i);
            index = index<97?index-65:index-97;
            if(node.nexts[index]==null){
                return 0;                
            }
            node = node.nexts[index];
        }
        return node.path;
    }
}

/**
 * 测试集
 *  let tree = new trieTree();
        tree.insert('aA');
        tree.insert('aB');
        console.log(tree)
        let searchRes = tree.search('aa');
        console.log(searchRes)

        // let res = tree.delete('aa');
        // console.log(res);
        let preCount = tree.prefixNumber('a');
        console.log(preCount)
 * 
 */