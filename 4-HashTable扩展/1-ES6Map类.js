/**
 * Map类介绍:
 * JS的对象本质上是键值对的集合（Hash 结构），
 * 但传统上只能用字符串当作键。这给它的使用带来了很大的限制
 * 
 * 比如：我想用DOM节点做为键值、
 * 
 * ===》 ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，
 *      但是"键"的范围不限于字符串，各种类型的值（包括对象）都可以当作键
 * Object:
 *      字符串-值
 * Map：
 *      值-值
 * 
 * 
 * 
 * Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键
 * 解决了同名属性碰撞（clash）的问题
 * 不同对象即使看上去一样，但是是内存存储，所以视为两个键
 * 
 * 
 * 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），值相等则视为同一个键
 * 对Map视为同一个键进行多次赋值，会覆盖原值
 * 
 * Map属性与方法
 *  属性：
 *      size
 *  方法
 *      set(key,value)
 *          set方法返回的是当前的Map对象，因此可以采用链式写法。
 *          let map = new Map()
                .set(1, 'a')
                .set(2, 'b')
                .set(3, 'c');
        get(key)
        has(key)
        delete(key)
        clear()
 * ES6的Map类的values方法和keys方法都返回工terator，而不是值或键构成的数组
    遍历方法
        keys    键名遍历器
        values  键值遍历器
        entries 所有成员的遍历器
        forEach 所有成员
 * 
 * Map与其他数据结构的转换
 *  Map <=> 数组
 *  Map <=> 对象
 *  Map <=> Json
 * 
 */

/**
 * @func 1-使用对象作为键值
 * 
 */
const map1 = new Map();
let 
    ob1 = {name:'Gandalf'},
    ob2 = {name:'John'},
    ob3 = {name:'Tyrion'};

// 用对象作为键值
map1.set(ob1, '138825');
map1.set(ob2, '152825');
map1.set(ob3, '133715');

//console.log(map.get(ob1))
//map.delete(obj1)


/**
 * @func  2-使用数组作为键值
 */
// 用数组作为键值 
// 构造函数接受数组作为参数 
const map2 = new Map([
    ['name','xiaohong'],
    ['title','Author']
]);

console.log(map2)
console.log(map2.get('name'))// xiaohong、

// 怎么实现的？？ 数组的映射。 arr[0]为键值 arr[1]为值
const items = [
    ['name', '张三'],
    ['title', 'Author']
];

const map3 = new Map();
items.forEach(
    ([key, value]) => map3.set(key, value)
);
console.log(map3.get('name'))


/**
 * @func 3-Map属性与方法实践
 */
//const arr1 = map1.keys();
//console.log(arr1)// => 返回一个迭代器
// so 读取他需要 用迭代函数 let..of ; let ..in 
for(let key of map1.keys()){
    // console.log(key)// 返回键值 {name:'Gandalf'}
}
// 同理 map1.values() ===>值 138825
// map1.entries // 返回由数组包裹的键值和值，[xx,xx]
for(let item of map1.entries()){
        //console.log(item)// 返回键值 [{…}, "138825"]
        //console.log(item[0],item[1]) // {name: "Gandalf"} "138825"
}

// 简写
for (let [key, value] of map1) {
    console.log(key, value);//{name: "Gandalf"} "138825"
}


/**
 * @func Map与其他数据结构的转换
 */

const map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]);
const arr1 = [...map.keys()] // [1, 2, 3]
const arr2 = [...map.values()] // ['one', 'two', 'three']
const arr3 = [...map.entries()] // [[1,'one'], [2, 'two'], [3, 'three']]   
const arr4 = [...map] // [[1,'one'], [2, 'two'], [3, 'three']]


// Map转对象
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [key,value] of strMap) {
        obj[key] = value;
    }
    return obj;
}
// 对象转Map
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}