/**
 * 数组格式转树状结构
 * @desc 常用于菜单生成
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const menudata  = 
[
    {//一级菜单
        id:'4',
        name:'基础设置',
        icon:'setting',
    },{//二级
        id:'40',
        pid:'4',
        name:'用户权限',
        icon:'appstore-o',
    },{
        id:'41',
        pid:'4',
        name:'菜单管理',
        icon:'appstore',
    },{//三级
        id:'410',
        pid:'41',
        name:'菜单配置',
        icon:'inbox',
        route:'/menuset'
    },{
        id:'400',
        pid:'40',
        name:'角色管理',
        icon:'user',
        route:'/roleset'
    }
]
const arrayToTree = (arr,id='id',pid='pid',children='children') =>{
    let data =  JSON.parse(JSON.stringify(arr));
    let result = []
    let hash = {}
    data.forEach((item, index) => {
        hash[data[index][id]] = data[index] //生成一个以为id为数组下标的数组 【多个数组变为了一个
    })
    data.forEach((item) => {
        item.key = item.id
        let hashVP = hash[item[pid]]
        if (hashVP) {//如果有父级  则将元素放在该父级的孩子节点上
            !hashVP[children] && (hashVP[children] = [])
            hashVP[children].push(item)
        }
        else if(!(hashVP&&item.route)){//第一级：1.没有父亲节点 且没有路由属性
          result.push(item)
        }
    })
    return result;
}


console.log(arrayToTree(menudata))
