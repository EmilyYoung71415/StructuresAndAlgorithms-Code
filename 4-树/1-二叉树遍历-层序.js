/*****
 * leetcode:102
 * 层序遍历:
 *  input:
 *  
    3
   / \
  9  20
    /  \
   15   7
   output:
   [
    [3],
    [9,20],
    [15,7]
   ]
 * 思路：
 * 树中的节点先进先出，队列先放入根节点[root],然后队首出一个节点后，打印
 * 再push他的左右子节点，如此实现横向打印
 * 
 * 怎么区分每一行呢？
 */
// 怎么区分每一行呢？
function levelOrder1(root) {
  if (!root) return [];
  let result = [];
  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    result.push(node.val);
    node.right && queue.push(node.right);
    node.left && queue.push(node.left);
  }
  return result;
}

// BFS搜索
function levelOrder(root) {
  if (!root) return [];
  let result = [];
  let queue = [root];
  while (queue.length) {
    // 当前queue里的就是上一层的所有节点
    // 现在需要把这些节点都弹出来打印 而下一层的放入新的[]里
    let prevLevelLen = queue.length;
    let curRes = []; // 存放上层全部节点
    while (prevLevelLen--) {
      let node = queue.shift();
      curRes.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    result.push(curRes);
  }
  return result;
}

/****
 * 用DFS是否可以实现呢
 *    1
    /   \
   3     2
  / \   / \
 5   4 #   6
 * 
 * 深度优先是 新迭代的单元树root放入数组对应level中，所以每深入一层需要记录伴随遍历level
 * [            [            [            [         [           [            [
 *   [],          [1],         [1],         [1],      [1],        [1],         [1],
 *   [],  ===>    [],   ===>   [3],   ==>   [3] =>    [3],  =>    [3,2], ===>  [3,2],
 *   []           [],          []           [5]       [5,4]       [5,4]        [5,4,6]
 * ]            ]            ]            ]         ]           ]            ]
 * 
 */

function levelOrder(root) {
  if (!root) return [];
  let result = [];
  DFS(root, 0);
  return result;

  function DFS(root, level) {
    if (!root) return;
    // 每次进入新的层但是 并没有新的层的[] ,新建新层arr
    if (result.length < level + 1) {
      result.push([]);
    }

    result[level].push(root.val);
    DFS(root.left, level + 1);
    DFS(root.right, level + 1);
  }
}
