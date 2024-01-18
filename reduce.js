/**
 * 数组扁平化
 * [[0, 1], [2, 3], [4, 5],8]
 * [0, 1, 2, 3, 4, 5]
 */
// let res =  flattened( [[0, 1], [2, 3], [4, 5]])
// console.log(res)
 function flattened(arr){
     return arr.reduce((prev,cur)=>{
        return prev.concat(cur)
     },[])
 }

var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
// let res = countStr(names)
// console.log(res)
 function countStr(str){
     return str.reduce((prev,cur)=>{
        if(cur in prev){
           prev[cur]++; 
        }else{
            prev[cur] = 1;
        }
        return prev;
     },{})
 }

 let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
//  let res = arrUnit(arr)
//  console.log(res)
 // 先排序 再 遍历
 function arrUnit(arr){
    return arr.sort().reduce((prev,cur)=>{
        // 第一个元素 or  cur != 数组的最后一个元素
        if(prev.length===0||prev[prev.length-1]!==cur){
            prev.push(cur);
        }
        return  prev;
    },[])
 }


 // 按照顺序 运行promise


 function runPromiseInSequence(arr,input){
    return arr.reduce((prev,cur)=>{
        return prev.then(cur)
    },Promise.resolve(input))
 }

 const promiseArr = [p1, p2, f3, p4];
//  runPromiseInSequence(promiseArr, 10)
//  .then((res)=>{
//      console.log(res)
//  })

 // 一些promise的函数
function p1(a) {
    return new Promise((resolve, reject) => {
      resolve(a * 5);
    });
  }

  // promise function 2
function p2(a) {
    return new Promise((resolve, reject) => {
      resolve(a * 2);
    });
  }
  
  // function 3  - will be wrapped in a resolved promise by .then()
  function f3(a) {
   return a * 3;
  }
  
  // promise function 4
  function p4(a) {
    return new Promise((resolve, reject) => {
      resolve(a * 4);
    });
  }