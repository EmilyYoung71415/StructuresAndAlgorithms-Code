/**
 * 字节三面
 * input => output
 *
 *
 */
const input = ['A-B-C', 'A-B-D', 'D-E-F'];

const output = [
  {
    node: 'A',
    path: 'A',
    children: [
      {
        node: 'B',
        path: 'A-B',
        children: [
          {
            node: 'C',
            path: 'A-B-C',
          },
          {
            node: 'D',
            path: 'A-B-D',
          },
        ],
      },
    ],
  },
  {
    node: 'D',
    path: 'D',
    children: [
      {
        node: 'E',
        path: 'D-E',
        children: [
          {
            node: 'F',
            path: 'D-E-F',
          },
          {
            node: 'D',
            path: 'A-B-D',
          },
        ],
      },
    ],
  },
];

function buildTree(inputArr) {
  const result = [];

  for (let nodepath of inputArr) {
    // 每一层path 对应一个 {}
    // 如果没找到就要根据path 构建一个这样的{}
    const targetTree = findTree(nodepath);
    if (!targetTree) {
      const pathArr = path.split('-');
      const curRoot = buildTreeCall(pathArr, {}, '');
      result.push(curRoot);
    } else {
      // 没找到 基于当前返回的tree最根部的节点 挂载
      // const tailpath = ; // a-b|-d =
      // const node = ;// d;
      // a-b-d => a->b: {}  ===> {d: {}}
      // targetTree
      // targetTree[] =
    }
  }

  return result;

  // 'A-B-C' => {a:{b:{c:xxx}}}
  // 'A-B-C' => {node: a, path:a, children: [{}]}
  function buildTreeCall(pathArr, root, prevpath) {
    // const pathArr = path.split('-');
    // const root =  {};
    // pathArr.reduce((accur, prev) => {
    //     accur[prev] = accur[prev] || {};
    //     return accur[prev];
    // }, root);
    // return root;
    if (!pathArr.length) return;
    const curnode = pathArr.shift();
    const curpath = prevpath + '-' + curnode;
    root.node = curnode;
    root.path = curpath;
    const nextnode = buildTreeCall(pathArr, root, curpath);
    root.children = !root.children ? [nextnode] : root.children.concat(nextnode);
    return root;
  }

  // 从result数组里找
  // result里找到 path相符合的 tree
  // const res = findTree(output, 'A-B-C');
  function findTree(output, path) {
    let targetRoot = {};
    for (let tree of output) {
      const root = DFS(tree, path);
      if (root) {
        targetRoot = root;
      }
    }

    return targetRoot;

    function DFS(node, target) {
      if (!node) return null;
      if (node.path === target) return node;
      if (!node.children) return null;
      for (let curnode of node.children) {
        return DFS(curnode, target);
      }
    }
  }
}

// const pathArr = 'A-B-C'.split('-');
// const root = {};
// buildTreeCall(pathArr, root, '');
// console.log(root);
function buildTreeCall(pathArr, root, prevpath) {
  // const pathArr = path.split('-');
  // const root =  {};
  // pathArr.reduce((accur, prev) => {
  //     accur[prev] = accur[prev] || {};
  //     return accur[prev];
  // }, root);
  // return root;
  if (!pathArr.length) return null;
  const curnode = pathArr.shift();
  const curpath = (prevpath ? prevpath + '-' : prevpath) + curnode;
  root.node = curnode;
  root.path = curpath;
  const nextnode = buildTreeCall(pathArr, root, curpath);
  // console.log(nextnode);
  // root.children = !root.children ? [nextnode] : root.children.concat(nextnode);
  return root;
}

const res = f(input);
console.log(res);
function f(input) {
  let dict = {};
  // 遍历一次，填入字典 O(N)
  input.forEach(element => {
    let key = element.path
      .split('/')
      .filter((v, i, arr) => i != arr.length - 1)
      .join('/');
    if (key === '') return;
    dict[key] = dict[key] || [];
    dict[key].push(element);
  });

  // 遍历一次，增加children项 O(N)
  let output = input.map(element => {
    element.children = element.children || [];
    if (dict[element.path] != null) {
      element.children = [...element.children, dict[element.path]];
    }
    return element;
  });

  // 仅筛选根节点 O(N)
  return output.filter(item => item.path.split('/').length == 2);
}
