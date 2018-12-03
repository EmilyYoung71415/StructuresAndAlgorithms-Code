/**
 * @desc 集合
 * 集合（set)是一种包含不同元素的数据结构
 * 
 * 特点：
 * 1.集合中的成员是无序
 * 2.集合中无相同成员
 * 
 * 
 * add
 * delete
 * has
 * values
 * size
 * 
 * 交集    intersection
 * 并集    union
 * 差集    difference 
 * 子集    subset
 */


function MySet() {
    this.items = {}
}

MySet.prototype = {
    add: function (value) {
        if (!this.has(value)) {
            this.items[value] = value;
            return true;
        }
        return false;
    },
    delete: function (value) {
        if (this.has(value)) {
            delete this.items[value];
            return true;
        }
        return false;
    },
    has: function (value) {
        return this.items.hasOwnProperty(value);
    },
    size: function () {
        return Object.keys(items).length;
    },
    values: function () {
        let valueArr = [];
        for (let i = 0, keys = Object.keys(items); i < keys.length; i++) {
            valueArr.push(items[keys[i]]);
        }
        return valueArr;
    },
    // 交集
    intersection: function (newSet) {
        // 取两个集合中相同的部分
        // 对于两个 不含相同元素的集合
        let intersectionSet = new MySet();
        let values = this.values();
        for (let i in values) {
            if (newSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    },
    // 并集
    union: function (otherSet) {
        // 遍历两个Set
        let unionSet = new MySet(); //{1}

        let values = this.values(); //{2}
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }

        values = otherSet.values(); //{3}
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }

        return unionSet;
    },
    // 差集 返回包含与集合A 但是不包含在集合B的数据集合
    difference: function (newSet) {
        let differenceSet = new MySet();
        let values = this.values();
        for (let i in values) {
            if (!newSet.has(values[i])) {
                differenceSet.add(values[i]);
            }
        }
        return differenceSet;
    },
    // 子集  判断集合otherSet是否是子集
    subSet: function (otherSet) {
        if (this.size() > otherSet.size()) { //{1}
            return false;
        } else {
            let values = this.values();
            for (let i = 0; i < values.length; i++) { //{2}
                if (!otherSet.has(values[i])) { //{3}
                    return false; //{4}
                }
            }
            return true;
        }
    }
}