/**
 * 数组格式转树状结构
 * @desc 常用于菜单生成
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const menudata = [{ //一级菜单
    id: '4',
    name: '基础设置',
    icon: 'setting',
}, { //二级
    id: '40',
    pid: '4',
    name: '用户权限',
    icon: 'appstore-o',
}, {
    id: '41',
    pid: '4',
    name: '菜单管理',
    icon: 'appstore',
}, { //三级
    id: '410',
    pid: '41',
    name: '菜单配置',
    icon: 'inbox',
    route: '/menuset'
}, {
    id: '400',
    pid: '40',
    name: '角色管理',
    icon: 'user',
    route: '/roleset'
}]
const arrayToTree = (arr, id = 'id', pid = 'pid', children = 'children') => {
    let data = JSON.parse(JSON.stringify(arr));
    let result = []
    let hash = {}
    data.forEach((item, index) => {
        hash[data[index][id]] = data[index]
        // 将数组arr遍历的对象变为以id为索引的直接查找的hashMap
    })
    data.forEach((item) => {
        let hashVP = hash[item[pid]]
        if (hashVP) { //如果有父级  则将元素放在该父级的孩子节点上
            !hashVP[children] && (hashVP[children] = [])
            hashVP[children].push(item)
        } else if (!(hashVP && item.route)) { //第一级：1.没有父亲节点 且没有路由属性
            result.push(item)
        }
    })
    return result;
}


console.log(arrayToTree(menudata))


// 6-数组转为对象 将存储多级菜单数据的数组转换为对象
var menuArr = [
    [1, "Area1", -1],
    [2, "Area2", -1],
    [3, "Area1-1", 1],
    [4, "Area1-2", 1],
    [5, "Area2-1", 2],
    [6, "Area2-2", 2],
    [7, "Area1-2-3", 4],
    [8, "Area2-2-1", 6],
];
/*    var menuObject = {
        "1": {
            name: "Area1",
            subMenu: {
                "3": {
                    name: "Area1-1"
                },
                "4": {
                    name: "Area1-2",
                    subMenu: {
                        "7": {
                            name: "Area1-2-3"
                        }
                    }
                }
            }
        }
    }
*/
function fun6(arr, subMenu = 'subMenu') {
    let data = JSON.parse(JSON.stringify(arr));
    // 先将-1 父级菜单 作为对象占位
    let result = {};
    let hash = {};
    data.forEach(item => {
        hash[item[0]] = {
            "name": item[1]
        }
    })

    data.forEach((item, index) => {
        let itemObj = hash[item[2]]; // 父
        if (item[2] === -1) { // 一级菜单
            result[item[0]] = hash[item[0]];
        } else { // 一级及以上
            !itemObj[subMenu] && (itemObj[subMenu] = {})
            itemObj[subMenu][item[0]] = hash[item[0]];
        }
    })

    console.log(result)
}
fun6(menuArr);