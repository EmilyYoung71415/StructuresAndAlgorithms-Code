/**
 * 快手笔试题
 * 要求：
    1、树层级不固定
    2、output里输出的是input的引用
    3、尽可能少的循环

    当时卡壳卡在 pnode.children的挂载上了。。。没充分理解到引用这个特性的利用
*/
const input = [
    {id:1},
    {id:2, pid:1},
    {id:3, pid:2},
    {id:4, pid:2},
    {id:5, pid:1},
    {id:9},
]
// ==> 
const output = [
    {id:1, children: [
        {id:2, children: [
            {id: 3},
            {id: 4},
        ]},
        {id:5}
    ]},
    {id:9},
]
mergeList2(input);
function mergeList(nodeList) {
    const output = [];
    for (let node of nodeList) {
        // 将子节点挂在 父节点上
        if (node.pid > 0) {
            const pnode = help(output, node.pid);
            pnode.children = !pnode.children ? [node] : pnode.children.concat(node);
        } else {
            output.push(node);
        }

    }
    // console.log(output);
    return output;

    function help(arr, targetId) {
        if (!arr.length) return null;
        for(let item of arr) {
            if (item.id === targetId) return item;
            if (item.children) {
                return help(item.children, targetId);
            } 
        }
    }

}

// 优化一下， 如何性能优化
function mergeList2(nodeList) {
    const idToNode = new Map();
    const output = [];

    for (let node of nodeList) {
        // 将子节点挂在 父节点上
        if (node.pid > 0) {
            // 性能优化关键点： 在节点树上 找到idnode
            // const pnode = help(output, node.pid);
            const pnode = idToNode.get(node.pid);
            if(pnode) {
                pnode.children = !pnode.children ? [node] : pnode.children.concat(node);
            }
            idToNode.set(node.id, node);
        } else {
            idToNode.set(node.id, node);
            output.push(node);
        }
    }
    return output;
}