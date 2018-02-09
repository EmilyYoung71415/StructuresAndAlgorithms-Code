//118. Pascal's Triangle
var generate = function(numRows) {
    var arr = [];
    for(var i=1;i<=numRows;i++){
        if(i==1) arr.push([1]);
        else if(i==2) arr.push([1,1]);
        else{
            var prevArr = arr[arr.length-1];
            var newarr = new Array(i);
            newarr[0] =1;
            for(var j=1;j<=i-2;j++){
                newarr[j] = prevArr[j]  + prevArr[j-1];
            }
            newarr[i-1] =1;
            arr.push(newarr);
        }
    }
    return arr;
};
console.log(generate(5));