/**
 * @desc 创建二叉搜索树BST并进行遍历(先序、中序、后序)
 *       二叉树的一种 只允许左子节点比父小，右节点比父大
 * 
 * @method 
 * insert(key)：向树中插入一个新的键。
 * search(key)：在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回 false。
 * inOrderTraverse：通过中序遍历方式遍历所有节点。
 * preOrderTraverse：通过先序遍历方式遍历所有节点。
 * postOrderTraverse：通过后序遍历方式遍历所有节点。
 * min：返回树中最小的值/键
 * max：返回树中最大的值/键。
 * remove(key)：从树中移除某个键
 */
function BinarySearchTree() {

    var Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };

    var root = null;

    this.insert = function (key) {

        var newNode = new Node(key);

        //special case - first element
        if (root === null) {
            root = newNode;
        } else {
            insertNode(root, newNode);
        }
    };

    var insertNode = function (node, newNode) {
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
    };

    this.getRoot = function () {
        return root;
    };

    this.search = function (key) {

        return searchNode(root, key);
    };

    var searchNode = function (node, key) {

        if (node === null) {
            return false;
        }

        if (key < node.key) {
            return searchNode(node.left, key);

        } else if (key > node.key) {
            return searchNode(node.right, key);

        } else { //element is equal to node.item
            return true;
        }
    };
    //中序
    this.inOrderTraverse = function (callback) {
        inOrderTraverseNode(root, callback);
    };

    var inOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback);
            callback(node.key);
            inOrderTraverseNode(node.right, callback);
        }
    };
    //先序
    this.preOrderTraverse = function (callback) {
        preOrderTraverseNode(root, callback);
    };

    var preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key);
            preOrderTraverseNode(node.left, callback);
            preOrderTraverseNode(node.right, callback);
        }
    };
    //后序
    this.postOrderTraverse = function (callback) {
        postOrderTraverseNode(root, callback);
    };

    var postOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback);
            postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    };

    this.min = function () {
        return minNode(root);
    };

    var minNode = function (node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }

            return node.key;
        }
        return null;
    };

    this.max = function () {
        return maxNode(root);
    };

    var maxNode = function (node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right;
            }

            return node.key;
        }
        return null;
    };

    this.remove = function (element) {
        //root被赋值为removeNode方法的返回值
        root = removeNode(root, element);
    };

    var findMinNode = function (node) {
        while (node && node.left !== null) {
            node = node.left;
        }

        return node;
    };

    var removeNode = function (node, element) {

        if (node === null) {
            return null;
        }

        if (element < node.key) {
            node.left = removeNode(node.left, element);
            return node;

        } else if (element > node.key) {
            node.right = removeNode(node.right, element);
            return node;
        
        /**
         * @desc 找到预移出的节点
         * 分三种情况讨论：
         *      此节点即为叶节点
         *      该节点含有一个叶节点
         *      该节点含有两个叶节点
         */
        } else { 
            //case 1
            if (node.left === null && node.right === null) {
                //赋空并返回空
                //现在节点的值已经是null了，父节点指向它的指针也会接收到这个值，即在函数中返回节点的值的原因
                node = null;
                return node;
            }

            //case 2
            //将父节点指向它的指针指向子节点
            if (node.left === null) {
                node = node.right;
                return node;

            } else if (node.right === null) {
                node = node.left;
                return node;
            }

            //case 3
            /**
             * @desc 移除具有两个孩子的节点
             * 思路：删除不是简单的删除哦，关键是删除之后依然能保证树的特性
             *      既然要在删除这个节点后保证特性，就需要在其子孙里找到能替代它的人，
             *      而删除的节点（就叫root吧）的特点是将当前树中的数以它作为分界，所以要找到可以充当分界点的值
             *      很明显：左子树里最大的值或者右子树最小的值均可
             * 
             * 1.当找到了需要移除的节点后，需要找到它右边子树中最小的节点（它的继承者
             * 2.用它右侧子树中最小节点的键去更新这个节点的值。改变了这个节点的键即移除它
             * 3.继续删除右侧子树的最小节点，
             * 4.返回node
             */    
            var aux = findMinNode(node.right);
            node.key = aux.key;
            node.right = removeNode(node.right, aux.key);
            return node;
        }
    };
}











/**
 * @desc 结构示意
 */

const resultData = {
    "data": 1,
    "left": null,
    "right": {
        "data": 2,
        "left": null,
        "right": {
            "data": 3,
            "left": null,
            "right": {
                "data": 4,
                "left": null,
                "right": {
                    "data": 5,
                    "left": null,
                    "right": null
                }
            }
        }
    }
}