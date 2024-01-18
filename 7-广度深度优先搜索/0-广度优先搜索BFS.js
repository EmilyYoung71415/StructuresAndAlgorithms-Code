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
function BFS(startNode, endNode){
    let queue = [];
    let visited = new Map();

    queue.add(startNode);
    visited.set(startNode,1);

    let step = 0; // 扩散的步数

    while(queue.length){
        let node = queue.shift();
        visited.set(node,1);

        // 处理当前访问的节点
        // process(node);
        // 是否到达了终点
        if (node === endNode) {
            return step;
        }

        /* 将 cur 的相邻节点加入队列 */
        // nodes = generate_ralated_nodes(node);
        for(let nextnode in node.siblings) {
            // 在邻近节点筛选出没被访问过的
            if (!visited.get(nextnode)) {
                queue.push(nextnode);
                visited.set(nextnode, 1);
            }
        }

        // 更新步骤
        step++;
    }
}