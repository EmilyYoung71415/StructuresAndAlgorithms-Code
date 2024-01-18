/***
 * 并查集 union & find
 * 一种树形数据结构，用于处理一些交集的合并 及 查询 问题
 * 
 * 主要作用:
 * find：确定元素在哪个子集，它可以被用来确定两个元素是否在一个子集
 * union:将两个子集合并成同一个集合
 * 
 * 实现:
 * 初始化:初始每个节点自成一个"集合",该节点的parent指向自己
 * 向集合添加节点: 新节点的parent指向当前集合 (加帮派的感觉 帮主<-你的老大<-你
 * 
 * 主要方法:
 * makeSet: 初始化 每个元素自成一个集合
 * find： 找当前元素属于哪个集合，即追踪集合的root节点
 *        root节点特征: root.parent = root (指向自己)
 * union(x,y)：合并x所在集合与y所在集合为一个集合
 *        找到他们的root，xroot.parent = yroot
 * 
 * 并查集的优化:
 * 优化1：
 *              1        3 
 *            2/ 
 *      集合1=[1,2] // 1是root
 *      集合2=[3] // 3是root
 *      合并结果1 = [3,1,2] // 将集合1的root.parent 指向集合2的root
 *              3
 *             /
 *            1   without union  by rank 
 *           /
 *          2 
 *      合并结果2 = [1,2|3] // 将3.root 指向 1
 *          1
 *         / \
 *        2   3   with union by rank
 *      [=>> 这种更好因为判断2是否为某个集合搜索路径更短]
 *      优化方案: 合并的时候 将 深度更小的集合 何必 到深度更大的集合里 
 *               元素 新增 rank属性，记录当前属于 集合的深度
 * 优化2：
 * 调用find的时候 进行路径压缩[比优化1更有效]
 *          a            a
 *         /           / | \ 
 *       b  ===>>     b  c  d 
 *      /   
 *     c 
 *    /
 *   d
 */
// 结合 优化1 和 优化2 
//  function Node(value){
//      this.value = value;
//  }
class UnionFind{
    // 默认元素是不重复的 所以以node.value 作为键值
    constructor(){
        //fatherMap[node1.value] = node2;节点node1的父节点是 node2 
        this.fatherMap = {};
        this.rankMap = {};// 该集合的root节点为key。value为集合的大小
    }
    makeSets(nodes){
        // 一个包含nodes的arr
        for(let node of nodes){
            // 以value做键值 不以整个节点
            this.fatherMap[node.value] = node;
            this.rankMap[node.value] = 1;
        }
    }
    find(node){
        let father = this.fatherMap[node.value];
        if(father.value != node.value){// 是否是集合的root顶点
            // 逐渐往上找
            father = this.find(father);
        }
        // find的时候 路径压缩 扁平化
        // 将当前节点的parent 直接指向了 集合的root
        this.fatherMap[node.value] = father;
        return father;
    }
    isSameUnion(nodeA,nodeB){
        return this.find(nodeA) == this.find(nodeB);
    }
    union(nodeA,nodeB){
        if(nodeA==null||nodeB==null){
            return ;
        }

        let aFather = this.find(nodeA);
        let bFather = this.find(nodeB); 
        let akey = aFather.value;
        let bkey = bFather.value;
        // 可合并
        if(aFather!=bFather){
            let aRank = this.rankMap[akey];
            let bRank = this.rankMap[bkey];
            if(aRank <= bRank){
                this.fatherMap[akey] = bFather;
                this.rankMap[bRank] = aRank + bRank;
            }else{
                this.fatherMap[bkey] = aFather;
                this.rankMap[aRank] = aRank + bRank;
            }
        }
    }
}

/**     a       c     
 *     / 
 *    b 
 *   /
 *  c 
    let fatherMap = {// 保存着每个元素的夫元素
        a:{
            value:a
        },
        b:{
            value:a
        }
        c:{
            value:b
        }
        d:{
            value:c
        }
    }
 */