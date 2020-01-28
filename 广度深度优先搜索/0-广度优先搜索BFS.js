/*****
 * Breadth-first-search
 * 从根节点逐层访问下一层节点
 * 在树的广度优先搜索里即层序遍历
 * 在图的广度优先，要注意判重，有可能节点会被再次访问
 * 
 * 图的广度优先搜索可以解决两类问题：
 * 1、从节点A出发，有前往节点B的路径
 * 2、从节点A出发，前往节点B的最短路径(限非加权图)
 */

//模板
function BFS(graph,start,end){
    let queue = [],visited = new Map();
    queue.add(start);
    visited.set(start,1);

    while(queue.length){
        let node = queue.shift();
        visited.set(node,1);

        // 处理当前访问的节点
        process(node);
        // 1. 找node的邻近节点  2.在邻近节点筛选出没被访问过的
        nodes = generate_ralated_nodes(node);

        queue.add(...nodes)// 象征性写法..
    }
}
