/****
 * Depth-first-search
 * 
 * 树的深度优先搜索:
 * 从根节点出发，选择一条路走到底，然后往上逐个回溯，看有没有第二条路径
 * 一般用递归实现
 */

// 递归实现
function DFS(node){
    let visited = new Map();
    DFSCall(node);
    function DFSCall(node){
        visited.set(node,1);

        // process node

        for(let next_nodes of node.children()){
            if(!visited.has(next_nodes)){
                DFSCall(next_nodes)
            }
        }
    }
}

// 迭代实现

function DFS(root){
    if(!root) return [];
    let visited = new Map(),
        stack = [root];
    
    while(stack.length){
        let node = stack.pop()
        visited.set(node,1);

        process(node);

        nodes =  generate_related_nodes(node);
        stack.push(...nodes)
    }
}