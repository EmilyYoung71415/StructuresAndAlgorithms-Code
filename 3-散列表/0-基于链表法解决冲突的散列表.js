/**
 *  确定散列函数
 *      为了避免碰撞，首先要确保散列表中用来存储数据的数组其大小是个质数
 *      (和计算散列值时使用的取余运算有关)
 *  碰撞处理：
 *      开链法
 *          桶+链表
 *      线性探测法
 *          开放寻址散列： 
 *              线性探测法检查散列表中的下一个位置是否为空。
 *              如果为空， 就将数据存入该位置；如果不为空，则继续检查下一个位置，
 *              直到找到一个空的位置为 止
 *          基于事实：每个散列表都会有很多空的单元格，可以使用它们来存 储数据。
 */
const {LinkedListF} = require('../index')
const defaultSize = 32;
class HashTable {
    constructor(hashTableSize = defaultSize) {
        this.buckets = Array(hashTableSize)
            .fill(null)
            // 桶的每个值初始化为空链表                                
            .map(() => new LinkedListF());
    }
    // 将键值 字符串的输入 转换为hash number
    hash(key) {
        // 将str转换为数组，字符串数组进行遍历reduce 化为一个hash值
        // 每个字符取charCodeAt()编码
        // reduce(callback,iniValue)
        const hash = Array.from(key).reduce(
            (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
            0
        );
        return hash % this.buckets.length;
    }
    insert(key, value) {
        // 以为key值做hash，找到该key下的桶
        const bucketLinkedList = this.buckets[this.hash(key)];
        // 桶下以key为找寻，如果key一样，则更新该key，否则在链表中插入该key
        const node = bucketLinkedList.find({
            callback: nodeValue => nodeValue.key === key
        });

        if (!node) {
            // 插入新节点
            // append {key,value}
            // node.value.{
            //      key\value    
            bucketLinkedList.append({
                key,
                value
            })
        } else {
            node.value.value = value;
        }

    }

    // get hash 找桶 
    // 桶下的链表 找node <= linkedList.find(node.key)
    get(key) {
        const bucketLinkedList = this.buckets[this.hash(key)];
        const node = bucketLinkedList.find({
            callback: nodeValue => nodeValue.key === key
        });
        return node ? node.value.value : null;
    }
    remove(key) {
        const bucketLinkedList = this.buckets[this.hash(key)];
        const node = bucketLinkedList.find({
            callback: nodeValue => nodeValue.key === key
        });

        if (node) {
            return bucketLinkedList.remove(node.value);
        }
        return null;
    }
}
let test = new HashTable();

let str = 'hellowwsdsd';

console.log(test.hash(str)); // 16
test.insert('a', 'hello') //
test.insert('a1', 'world')
test.insert('4545664', 's878787878') //更新了拥有相同key的值

console.log(test.buckets)

test.remove('a1');
