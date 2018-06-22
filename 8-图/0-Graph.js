/**
 * Graph类由 点Node和边 类 Edge组成
 * 
 * Node： 入度、出度、权重、我的所有邻居节点、我的所有边
 * Edge：  权重、from、to
 */
function Node(value){
    this.value = value;//值
    this.in = 0;//入度， 多少节点指向我
    this.out = 0;// 我指向多少节点
    this.nexts = [];// 我的所有邻居，经过一条边能到达的点
    this.edges = [];// 我的所有边 from是我的情况下出去的边
}

function Edge(weight,from,to){
    this.weight = weight;
    this.from = from;
    this.to = to;
}
function Graph(){
    this.nodes = {};// 一组顶点
    this.edges = [];// 一组边
}

/**
 * matrix=[
 *  // from to  weight
 *  ['A','B',2],
 *  ['B','C',1],
 *  ['A','C',3],
 * ]
 *        A
 *     2/   \3
 *     B ——  C
 *        1
 */

function createGraph(matrix){
    let graph = new Graph();

    for(let i=0;i<matrix.length;i++){
        let from = matrix[i][0];
        let to = matrix[i][1];
        let weight = matrix[i][2];

        if(!graph.nodes[from]){
            graph.nodes[from] = new Node(from); 
        }

        if(!graph.nodes[to]){
            graph.nodes[to] = new Node(to); 
        }

        let fromNode = graph.nodes[from];
        let toNode =  graph.nodes[to];

        let newEdge = new Edge(weight,fromNode,toNode);
        fromNode.nexts.push(toNode);
        fromNode.edges.push(newEdge);        
        fromNode.out++;
        toNode.in++;
        graph.edges.push(newEdge);
    }
    console.log(graph)
    return graph;
}

let arr = [
    ['A','B',2],
    ['B','C',1],
    ['A','C',3],
];

createGraph(arr);