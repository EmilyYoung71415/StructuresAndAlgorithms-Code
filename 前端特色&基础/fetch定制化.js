/*
promise 的上层再封装一层
resolve\reject 
fetch 的用法，抛出error


请封装一个 CustomFetch 方法，利用原生的 fetch api，但是实现以下几个需求：
所有请求默认带上一个 token，值是 xxx
请求返回的时候，内部解析内容，并且判断 success 字段是否是 true，
如果不是，在 catch 中可以拿到一个Error，
message 和 code 是接口返回的对应的内容

CustomFetch("http://api.com/api").then((data)=>{
    console.log(data); // 如果后台返回 true
}).catch((e)=>{
    console.log(e.message); // 输出 “查询错误”
});
 
// 接口的返回模式
{
    success: false,
    code: 'QUERY_ERROR',
    data: {},
    message: '查询错误'
}



*/