 // 5-对象转为数组 将其转为如下的二维数组
 /* var scoreArray = [
     ["Tony", 95, 79, 68],
     ……
 ];
 */
 var scoreObject = {
     "Tony": {
         "Math": 95,
         "English": 79,
         "Music": 68
     },
     "Simon": {
         "Math": 100,
         "English": 95,
         "Music": 98
     },
     "Annie": {
         "Math": 54,
         "English": 65,
         "Music": 88
     }
 }

 function fun5(obj) {
     let result = [];
     Object.keys(obj).forEach(elem => {
         let subresult = [];
         subresult[0] = elem;
         Object.values(obj[elem]).forEach(subitem => {
             subresult.push(subitem);
         })
         result.push(subresult);
     });
     return result;
 }
 // console.log(fun5(scoreObject));