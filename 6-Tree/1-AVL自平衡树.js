/**
 * @desc AVL自平衡树 [Adelson-Velskii-Landi]
 * BST存在一个问题：树的一条边可能会非常深；
 * 即，树的一条分支会有很多层，而其他的分支却只有几层
 * 
 * AVL:
 *      任何一个节点左右两侧子树的高度之差最多为1
 *      表现：添加或移除节点时，AVL树会尝试自平衡(插入/删除之前都会进行自平衡判断)
 * 
 * AVL的四种旋转：
 *      LL\RR\LR\RR，理解每种旋转
 *      什么时候用哪种旋转？
 *          向左子树插人新节点，LR\LL
 *              且节点的值 < 其左子节点时，==> LL
 *              否则  ==> LR
 *          向右子树插人新节点,  RR\RL
 *              且节点的值 > 其右子节点时, ==> RR
 *              否则  ==> RL
 */

function Node(key){
    this.key = key;
    this.left = null;
    this.right = null;
}

function AVLTree(){
    this.root = null;
}

AVLTree.prototype={
    insert:function(key){
        this.root = insertNode(this.root,key);
        function insertNode(node,key){
            if(node === null){
                node = new Node(key);
            }else if(key < node.key){
                node.left = insertNode(node.left,key);
                if(node.left!==null){
                    // 确认是否需要平衡印子
                    // 计算平衡因子 插入左子树后，产生不平衡
                    if ((heightNode(node.left) - heightNode(node.right)) > 1){
                        // 如果当前节点 < 左子节点 LL
                        if(key < node.left.key){
                            node = rotationLL(node);
                        }else{
                            node = rotationLR(node);
                        }
                    }
                }
            }else if(key > node.key){
                node.right = insertNode(node.right,key);
                if(node.right!==null){
                    // 确认是否需要平衡因子
                    if(heightNode(node.right)-heightNode(node.left)>1){
                        if(key>node.right.key){
                            node = rotationRR(node);
                        }else{
                            node = rotationRL(node);
                        }
                    }
                }
            }
            return node;
        }
    },
    remove:function(key){
        let parentNode = null;
        let nodeToBeDeleted = null;
        this.root = removeNode(this.root,key);
        
        function removeNode(node,key){
            if(node===null){
                return null;
            }
            parentNode =  node;
            if(key<node.key){
                node.left = removeNode(node.left,key);
            }else{
                nodeToBeDeleted = node;
                node.right = removeNode(node.right,key);
            }

            if(node===parentNode){
                if(nodeToBeDeleted!==null&&key===nodeToBeDeleted.key){
                    if(nodeToBeDeleted ===parentNode){
                        node = node.left;
                    }else{
                        // 交换parentNode\nodeToBeDeleted
                        let tmp = nodeToBeDeleted.key;
                        nodeToBeDeleted.key = parentNode.key;
                        parentNode.key = tmp;
                        node = node.right;
                    }
                }
            }else{// 平衡一下
                if (node.left === undefined) node.left = null;
                if (node.right === undefined) node.right = null;

                if ((heightNode(node.left) - heightNode(node.right)) === 2) {
                    if (element < node.left.key) {
                        node = rotationLR(node);
                    } else {
                        node = rotationLL(node);
                    }
                }

                if ((heightNode(node.right) - heightNode(node.left)) === 2) {
                    if (element > node.right.key) {
                        node = rotationRL(node);
                    } else {
                        node = rotationRR(node);
                    }
                }
            }
            return node;
        }
    },
}

// 计算平衡因子
function heightNode(node){
    if(node===null){
        return -1;
    }else{
        return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
    }
}

/**
 *          50[2]                   30
 *        /      \      LL        /   \            插入元素5<30
 *     30[1]     70[0]   ===>    10   50           变化元素：50、30、10
 *    /     \                   /     / \  
 *   10[1]  40[0]              5     40  70   
 *   /
 *  5[0]
 */
function rotationLL(node){
    let temp = node.left; // 选择30为新根节点
    node.left = temp.right;// 50的左子节点变为30的右子节点60
    temp.right = node;// 30根节点的右边为node
    return temp;
}



/**
 *       50[-2]                            70
 *      /    \                            /  \
 *    30[0]  70[-1]          RR         50    80        插入元素90>70
 *            /  \          ===>       / \     \        变化的元素：50 70 80
 *        60[0]  80[-1]               30   60   90
 *                  \
 *                  90[0]  
 * 
 */

function rotationRR(node){
    let temp = node.right;
    node.right = temp.left;
    temp.left = node;
    return temp;
}


// 先RR再LL
function rotationLR(node){
    node.left = rotationRR(node.left);
    return rotationLL(node);
}

// 先LL再RR
function rotationRL(node){
    node.right = rotationLL(node.right);
    return rotationRR(node);
}

