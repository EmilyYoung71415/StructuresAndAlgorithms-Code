declare interface ListNode {
  val: number; // 可以换为T
  next: ListNode | null;
}

declare interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

declare type TreeNodeVal = number | null;
