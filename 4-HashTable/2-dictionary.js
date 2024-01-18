/**
 * @desc 字典Dictonary
 * 字典是一种以键-值对形式存储数据的数据结构
 * ==>类似于电话本里的 姓名与电话的对应关系。 以姓名为键值
 * 
 * 我们想对字典中的 键排序，而JavaScript中是不能对对象的属性进行排序的
 * 以Array构造Dictionay类(也可Object
 * 
 * 字典的主要用途是通过键取值，我们无须太关心数据在字典中的实际存储顺序
 * 扩展：实现一个有序字典
 * 
 * HashTable是Dictionary的一种散列表实现方式
 * 
 * add
 * find
 * remove
 * clear
 * showAll
 * count    //统计元素属性 即有几个人
 * 
 */
function Dictonary() {
    this.dataStore = {};
}

Dictonary.prototype = {
    has:function(key){
        return this.dataStore.hasOwnProperty(key);
    },
    add: function (key, value) {
        this.dataStore[key] = value;
    },
    find: function (key) {
        return this.has(key)?this.dataStore[key]:undefined;
    },
    remove: function (key) {
        if(this.has(key)){
            delete this.dataStore[key];
            return true;
        }
        return false;
    },
    clear: function () {
        this.dataStore = {}
    },
    // 排序后的
    showAll: function () {
        const arr = Object.keys(this.dataStore).sort();
        let str  = "";
        for(let key of arr){
            str += `${key}：${this.dataStore[key]} -> `;
        }
        return str;
    },
    // 统计不重名的个数
    count: function () {
        let count = 0;
        for (let key in Object.keys(this.dataStore)) {
            count++;
        }
        return count;
    }
}

let arr = new Dictonary();
arr.add('xiaohong',138)
arr.add('xiaozhang',456)
arr.add('xiaoming',152)        
// arr.remove('xiaohong')
 arr.showAll()
console.log(arr.dataStore)