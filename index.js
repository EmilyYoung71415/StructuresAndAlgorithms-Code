const LinkedListF = require('./1-链表/0-单链表头插法');
const LinkedListR = require('./1-链表/0-单链表尾插法');
const DoublyLinkedListF = require('./1-链表/0-双链表头插法');
const DoublyLinkedListR = require('./1-链表/0-双链表尾插法');
const Stack = require('./2-栈及队列/0-栈的链式存储结构');
const Queue = require('./2-栈及队列/0-队列的链式存储结构');
const PriorityQueue = require('./2-栈及队列/0-优先队列');
const Dequeue = require('./2-栈及队列/0-优先队列');
// exports.Stack = Stack;
module.exports = {
    LinkedListF,
    LinkedListR,
    DoublyLinkedListF,
    DoublyLinkedListR,
    Queue,
    Stack,
    PriorityQueue,
    Dequeue
}