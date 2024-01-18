import { TreeNode } from '@utils';

export class TreeNextNode {
  val: number;
  next?: TreeNextNode | null;
  left: TreeNextNode | null;
  right: TreeNextNode | null;

  constructor(val?: number, left?: TreeNextNode, right?: TreeNextNode, next?: TreeNextNode) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}


export function connect(root: TreeNextNode | null): TreeNextNode | null {
  if (!root) return null;
  const queue: TreeNextNode[] = [root];

  while (queue.length) {
    let levelSize = queue.length;
    let prevNode = queue[0];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (i > 0) {
        prevNode.next = node;
        prevNode = node;
      }

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    prevNode.next = null;
  }

  return root;
}

//     1
//   2   3
//  / \
// 4   5
export function connect0(root: TreeNode | null): TreeNextNode | null {
  if (!root) return null;

  const queue: TreeNextNode[] = [root];

  while (queue.length) {
    let levelSize = queue.length;

    const levelNodes: TreeNextNode[] = [];
    while (levelSize--) {
      const node = queue.shift();
      levelNodes.push(node);
      // FIXME: 3.next = null // 而不是 3.next=4
      // ===> 所以引入levelNodes变量，严格按层划分的nodes
      // const nextNode = queue[0]; // 3-4?
      // node.next = nextNode || null; 这里读取nextNode 还是没有和下一层节点分隔开
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    // 二次遍历level
    while (levelNodes.length) {
      const node = levelNodes.shift();
      const nextNode = levelNodes[0];
      node.next = nextNode || null;
    }
  }

  return root;
}

// 优化：减去levelNodes，适用滚动数组变量
export function connect1(root: TreeNode | null): TreeNextNode | null {
  if (!root) return null;

  const queue: TreeNextNode[] = [root];

  while (queue.length) {
    let curLevelSize = queue.length;

    for (let i = 0; i < curLevelSize; i++) {
      // 尾节点: node.next = null
      // 如果是队列的tailNode, nextNode = nextLevel.firstNode;
      const node = queue[i];
      const nextNode = i === curLevelSize - 1 ? null : queue[i + 1];
      node.next = nextNode;
      // queue.shift(); // queue出队列会导致，根据i下标得到node会有差错. 所以在当前层遍历完之后再shift(不shift则死循环了)
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    queue.splice(0, curLevelSize);
  }

  return root;
}

// 如果不将shift的操作留 for levelSize之外的话。则需要记录prevNode, curNode
// 当i=1时开始挂载 prevNode.next = node; 则不会出现 因为读取了是queue[i+1]导致读到下一层的问题了

export function connect2(root: TreeNextNode | null): TreeNextNode | null {
  if (!root) return null;
  const queue: TreeNextNode[] = [root];

  while (queue.length) {
    let levelSize = queue.length;
    let prevNode: TreeNextNode | null = null;
    // let curNode: TreeNextNode | null = null;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      // 从i>=1 开始挂next节点: prevNode.next = curNode;
      if (i === 0) {
        prevNode = node;
        // curNode = null;
      } else {
        // curNode = node;
        prevNode.next = node;
        prevNode = node;
      }

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    prevNode.next = null;
  }

  return root;
}
