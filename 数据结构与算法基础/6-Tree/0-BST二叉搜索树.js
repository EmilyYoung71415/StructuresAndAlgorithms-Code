/**
 * @desc 二叉搜索树
 * 每次插入保证： 以当前节点(当前树的根节点)为划分，左边子节点< 根节点< 右边子节点
 * 插入
 * 查找
 * 删除
 * 遍历： 先序、后序、中序
 * 构树结果：    
 *      如 4\9\8\10
 *          4
 *        /   \
 *              9
 *            /   \    
 *           8    10  
*/
function Node(key){
    this.key = key;
    this.left = null;
    this.right = null;
}

 function binarySearchTree(){
    this.root = null;
 }


 binarySearchTree.prototype = {
     insert:function(key){// 需要辅助函数 insertNode用于递归
        let newNode = new Node(key);
        if(this.root===null){
            this.root = newNode;
        }else{
            insertNode(this.root,newNode)
        }   
        function insertNode(node, newNode){
            if (newNode.key < node.key) {
                if (node.left === null) {
                    node.left = newNode;
                } else {
                    insertNode(node.left, newNode);
                }
            } else {
                if (node.right === null) {
                    node.right = newNode;
                } else {
                    insertNode(node.right, newNode);
                }
            } 
        }
     },
     // 遍历方法打印节点
     // 中序遍历 定义回调函数，开放接口，用于对遍历的每个节点进行操作//访问者模式
     inOrderTraverse:function(callback){
        inOrderTraverseNode(this.root, callback);
        function inOrderTraverseNode(node, callback){
            if (node !== null) {// 可以理解为左、中、右
                inOrderTraverseNode(node.left, callback);
                callback(node.key);
                inOrderTraverseNode(node.right, callback);
            }
        }
     },
     // 先序
     preOrderTraverse:function(callback){
        preOrderTraverseNode(this.root,callback);
        function preOrderTraverseNode(node, callback){
            if (node !== null) {
                callback(node.key);// 先访问节点本身           
                preOrderTraverseNode(node.left, callback);
                preOrderTraverseNode(node.right, callback);
            }
        }
     },
     //后序
     postOrderTraverse:function(callback){
        postOrderTraverseNode(this.root,callback);
        function postOrderTraverseNode(node,callback){
            // 左右中
            if(node!==null){
                postOrderTraverseNode(node.left,callback);
                postOrderTraverseNode(node.right,callback);
                callback(node.key);
            }
        }
     },
     search:function(key){
         // 将serchNode的返回值再返回出去
        return searchNode(this.root,key);
        function searchNode(node,key){
            if(node===null){
                return null;
            }
            if(key < node.key){
                searchNode(node.left,key);
            }else if(key > node.key){
                searchNode(node.right,key);
            }else{
                return node;
            }
            return null;
        }
     },
     remove:function(key){
        this.root = removeNode(this.root,key);
        // 为啥要将this.root更新为removeNode的返回值
        function removeNode(node,key){
            // 先找到预删除的节点，再谈删除的事儿
            if(node===null){
                return null;
            }
            if(key < node.key){
                node.left = removeNode(node.left,key);
                return node;
            }else if(key > node.key){
                node.right = removeNode(node.right,key);
                return node;
            }else{// 终于找到节点了
                if (node.left === null && node.right === null) {
                    node = null;// 给这个节点赋予null值来移除它
                    // 通过返回null来将对应的[父节点指针]赋予null值
                    // 因为光赋值null不够，还需处理(父的)指针。
                    // 现在节点的值是null，父节点指向它的指针也会接收到这个值，null
                    return node;
                }
                // 只有一个节点
                if (node.left === null) {
                    node = node.right;// 直接指向子节点 即忽略当前node
                    return node;
    
                } else if (node.right === null) {
                    node = node.left;
                    return node;
                }
                // 存在两个子节点则找继承者替代，规定继承者为右子树的最小值(也可左子树最大值) 
                let nextRootKey = getMinNode(node.right);
                node.key = nextRootKey;
                // 将删除两个子节点 顺利转换为 删除没有子节点的数
                node.right = removeNode(node.right,nextRootKey);
                return node;
                function getMinNode(node){
                    if(node){
                        while(node&&node.left!==null){
                            node =  node.left;
                        }
                        return node.key;
                    }
                    return null;
                }

            }

        }
     },
     getMin:function(){
        return getMinNode(this.root);
        function getMinNode(node){
            if(node){
                while(node&&node.left!==null){
                    node =  node.left;
                }
                return node.key;
            }
            return null;
        }
     },
     getMax:function(){
        return getMaxNode(this.root);
        function getMaxNode(node){
            if(node){
                while(node&&node.right!==null){
                    node = node.right;
                }
                return node.key;
            }
            return null;
        }
     },
 }

/**
 * 
 * 查找逻辑：
 *      和插入类似。
 *      查找值 > 当前节点值 搜索右子树
 *      查找值等于当前节点，停止搜索
 *      查找值 < 当前节点值 左子树
 * 最大最小值
 *      最小值： 树最最左边(最下层的最左端)的值、
 *      最大值：树最最右的值
 * 删除节点：(最复杂的操作) 分三种情况
 *      删除的节点是叶节点---无子节点
 *      该节点有一个子节点
 *          将父节点指向它的指针指向子节点
 *          node = node.left
 *      该节点有两个子节点
 *          删除的节点（就叫root吧）的特点是将当前树中的数以它作为分界,
 *          所以要找到可以充当分界点的值,左子树里最大的值或者右子树最小的值均可
 *      step:
 *          1.当找到了需要移除的节点后，需要找到它右边子树中最小的节点（它的继承者
 *          2.让当前删除节点=继承者的值，即以继承者还原删除本root节点后的正常节点值。
 *              [此时本root节点值被替换掉，树中存在两个相同的继承者值]
 *          3.删除右侧子树的最小节点(原继承者的位置)
 *              即删除root节点变为删除继承者节点，而继承者位于最下端，没有子节点
 *          4.向本root的父节点返回更新后节点的引用
 *      思考：
 *          删除也太麻烦了吧，可不可以不删除?
 *          每个节点多个标识 isDelete 遍历的时候只遍历未被删除的元素
 *          删除元素步骤变为:找个那个元素，isDelete  = true
 *          
 */
/*      TEST 测试
    let tree = new binarySearchTree();
    const arr = [4,9,8,10];
    for(let item of arr){
        tree.insert(item)
    }

    function cb(value){
        console.log(value);
    }
    //tree.inOrderTraverse(cb);// 4 8 9 10
    // 先序遍历
    //tree.preOrderTraverse(cb);// 4 9 8 10
    // 后序测试
    //tree.postOrderTraverse(cb);// 8 10 9 4

    // 查找测试
    //console.log(tree.search(4));

    // 最大最小值
    // console.log(tree.getMax());//10
    // console.log(tree.getMin());//4

    // 删除
    // tree.remove(8);
    // tree.inOrderTraverse(cb);// 4 9 10
*/
 