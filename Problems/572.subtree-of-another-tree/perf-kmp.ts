// Serialize in Preorder then KMP
// Time: O(M + N)
// 为什么使用前序：因为前序序列化的结果是唯一的，而中序和后序不是
// 如果我们将 null 元素包含到前序遍历中，那么只要树是唯一的，遍历的结果就是唯一的
// 详细解释: https://stackoverflow.com/questions/45871284/uniqueness-of-inorder-preorder-and-postorder-traversal-with-null-elements
export function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  const s = serialize(root);
  const p = serialize(subRoot);
  return kmp(s, p);

  function kmp(s: string, p: string): boolean {
    const lps = getLPS(p);
    const n = s.length;
    const m = p.length;
    let j = 0;

    for (let i = 0; i < n; i++) {
      while (s[i] !== p[j] && j > 0) {
        j = lps[j - 1];
      }
      if (s[i] === p[j]) {
        j++;
        if (j === m) {
          return true;
        }
      }
    }

    return false;
  }

  function serialize(root: TreeNode | null): string {
    if (root === null) return '#';

    return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
  }

  function getLPS(p: string): number[] {
    const m = p.length;
    let j = 0;
    const lps: number[] = new Array(m).fill(0);

    for (let i = 1; i < m; i++) {
      while (p[i] !== p[j] && j > 0) {
        j = lps[j - 1];
      }
      if (p[i] === p[j]) {
        j++;
        lps[i] = j;
      }
    }

    return lps;
  }
}
