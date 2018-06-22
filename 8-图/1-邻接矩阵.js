/**
 *        A
 *      /   \
 *     B ——  C
 *  A -> B C 
    B -> A C 
    C -> A B 
 */

function Graph(){
    this.nodes = [];
    this.adjList = {};//存放该顶点的邻接顶点
}

Graph.prototype ={
    addNode:function(v){
        this.nodes.push(v);
        this.adjList[v] = [];
    },
    addEdge:function(v,w){ //与该点相连的顶点 此时是创建无向图
        this.adjList[v].push(w);
        this.adjList[w].push(v);
    },
    toString:function(){
        let s = '';
        for(let i=0;i<this.nodes.length;i++){
            s += this.nodes[i] + ' -> ';
            let neighbors = this.adjList[this.nodes[i]];  
            for(let j=0;j<neighbors.length;j++){
                s+=neighbors[j] + ' ';
            }
            s += '\n';
        }
        console.log(s);
        return s;
    }
}

let graph = new Graph();
let nodeArr = ['A','B','C'];
for (let i=0; i<nodeArr.length; i++){
      graph.addNode (nodeArr[i]);
}
graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('B','C');


console.log(graph)
graph.toString();

