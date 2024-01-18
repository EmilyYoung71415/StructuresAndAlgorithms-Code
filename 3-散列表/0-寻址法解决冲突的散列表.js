/**
 * @desc 线性探查
 *
 * 想向表中某个位置加人一个新元素的时候，
 * 如果索引 为index的位置已经被占据了，就尝试index+1的位置。
 * 如果index+1的位置也被占据了，就尝试 index+2的位置，以此类推
 *
 * insert(key,value)
 * remove(key)
 * get(key)
 *
 * hash函数
 */

// 插入key 和value 保证及时hash一致但仍然可以通过hash一致的前提下 用key查找
function hashNode(key, value) {
  this.key = key;
  this.value = value;
  this.toString = function () {
    return `[${this.key}-${this.value}]`;
  };
}

function hashTable(size) {
  this.bucket = [];
  this.size = size || 37;
}

hashTable.prototype = {
  hash: function (key) {
    const hash = Array.from(key).reduce((hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0), 0);
    return hash % this.size;
  },
  find: function ({ callback = undefined }) {
    const keys = Object.keys(this.bucket);
    if (keys.length >= 1) {
      for (let i of keys) {
        if (callback && callback(this.bucket[i])) {
          const obj = {
            ...this.bucket[i],
            posi: i,
          };
          return obj;
        }
      }
    }
    return null;
  },
  insert: function (key, value) {
    const node = this.find({ callback: nodeValue => nodeValue.key === key });
    if (node) {
      this.bucket[node.posi].value = value;
      return;
    }
    let posi = this.hash(key);
    if (this.bucket[posi] === undefined) {
      this.bucket[posi] = new hashNode(key, value);
    } else {
      // 先查找是否有相同key
      // 没有则直接插入
      let index = ++posi;
      while (this.bucket[index] != undefined) {
        index++;
      }
      this.bucket[index] = new hashNode(key, value);
    }
  },
  get: function (key) {
    let posi = this.hash(key);
    if (this.bucket[posi] !== undefined) {
      return this.bucket[posi].value;
    } else {
      let index = ++posi;
      while (this.bucket[index] === undefined && this.bucket[index].key !== key) {
        index++;
      }
      if (this.bucket[index].key === key) {
        return this.bucket[index].value;
      }
    }
    return undefined;
  },
  remove: function (key) {
    // 将其值置为undefined
    let posi = this.hash(key);
    if (this.bucket[posi] !== undefined) {
      if (this.bucket[posi].key === key) {
        this.bucket[posi] = undefined;
      } else {
        let index = ++posi;
        while (this.bucket[index] === undefined || this.bucket[index].key !== key) {
          index++;
        }
        if (this.bucket[index].key === key) {
          this.bucket[index] = undefined;
        }
      }
    }
  },
  toString: function () {
    for (let i in this.bucket) {
      if (this.bucket[i] !== undefined) {
        console.log(`${i}->${this.bucket[i].toString()}`);
      }
    }
  },
};

let test = new hashTable();
test.insert('22', 1);
test.insert('22', 2222);
console.log(test.get('22'));
test.toString();
