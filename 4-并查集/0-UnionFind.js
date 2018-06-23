/**
 * 初始每个数值自成一个"集合",该数p节点指向自己
 * 之后向集合添加元素，则新来元素的p指向代表元素
 * 
 * 并查集有的方法：
 *      makeSets()
 *      findFather()
 *      union()
 * 时间复杂度：
 *      N个元素 查询+合并O(N)及以上
 *      单次查询/合并：O(1)
 */

 function Node(value){
     this.value = value;
 }


 function unionFind(){
    this.fatherMap = {};//fatherMap[node1] = node2;节点node1的父节点是 node2 
    this.rankMap = {};// 该集合的代表节点data为key。size是集合的大小
 }  

 unionFind.prototype={
    makeSets:function(nodes){
        // 一个包含nodes的arr
        for(let item of nodes){
            this.fatherMap[item] = item;
            this.rankMap[item] = 1;
        }
    },
    findFather:function(node){
        let father = this.fatherMap[node];
        if(father != node){
            // 逐渐往上找
            father = this.findFather(father);
        }
        // 扁平化
        this.fatherMap[node] = father;
        return father;
    },
    union:function(nodeA,nodeB){
        if(nodeA==null||nodeB==null){
            return ;
        }

        let aFather = this.findFather(nodeA);
        let bFather = this.findFather(nodeB); 
        
        // 可合并
        if(aFather!=bFather){
            let aRank = this.rankMap.get(aFather);
            let bRank = this.rankMap.get(bFather);
            if(aRank <= bRank){
                this.fatherMap[aFather] = bFather;
                this.rankMap[bRank] = aRank + bRank;
            }else{
                this.fatherMap[bFather] = aFather;
                this.rankMap[aRank] = aRank + bRank;
            }
        }
    }
 }

