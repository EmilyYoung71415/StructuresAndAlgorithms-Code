const LinkedListF = require('./1-链表/0-单链表头插法');
const LinkedListR = require('./1-链表/0-单链表尾插法');
const DoublyLinkedListF = require('./1-链表/0-双链表头插法');
const DoublyLinkedListR = require('./1-链表/0-双链表尾插法');
const Stack = require('./2-栈及队列/0-栈的链式存储结构');
const Queue = require('./2-栈及队列/0-队列的链式存储结构');
const PriorityQueue = require('./2-栈及队列/0-优先队列');
const Dequeue = require('./2-栈及队列/0-优先队列');
const BinarySearchTree = require('./4-树-二叉搜索树/0-二叉搜索树BST');
const Heap = require('./4-树-完全二叉树-堆/0-堆的实现.js');
// exports.Stack = Stack;
module.exports = {
    LinkedListF,
    LinkedListR,
    DoublyLinkedListF,
    DoublyLinkedListR,
    Queue,
    Stack,
    PriorityQueue,
    Dequeue,
    BinarySearchTree,
    Heap
}