// 在斐波那契这道题目中用DFS实现这四种顺序的值传递 /
class Node_ {
  public val: number;
  public prevs: Node_[];
  public nexts: Node_[];

  constructor(val: number) {
    this.val = val;
    this.prevs = []; //前驱节点
    this.nexts = []; //后驱节点
  }
}

export function fib_all_in_one(n: number): number {
  if (n === 0 || n === 1) return n;

  const dp: Node_[] = [new Node_(0), new Node_(1)];

  const topo: number[] = [];
  let cnt = 0;

  const dfs = (i: number, next: Node_) => {
    if (dp[i] !== undefined) {
      dp[i].nexts.push(next);
      return dp[i].val;
    }
    dp[i] = new Node_(0);
    dp[i].nexts.push(next); //先序 * 邻接 → 后驱节点
    cnt++; //先序 * 访问 → 节点个数
    dp[i] = new Node_(dfs(i - 1, dp[i]) + dfs(i - 2, dp[i])); //后序*邻接 → FN传递
    topo.push(i); //后序*访问 → 拓扑排序
    return dp[i].val;
  };
  // console.log(topo);
  // console.log(cnt);

  return dfs(n, null);
}
