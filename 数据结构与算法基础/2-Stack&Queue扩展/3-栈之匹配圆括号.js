// []{}()
let res = parenthesesChecker('');
console.log(res)
function parenthesesChecker(str){
    if(str.length%2===1){
        return false;
    }
    let bucket = {
        '[':1,
        '{':2,
        '(':3,
        ']':-1,
        '}':-2,
        ')':-3
    } 
    let stack = [];

    for(let i of  str){
        if(bucket[i]>0){
            stack.push(i)
        }else if(bucket[i]<0){
            const res = stack.pop();
            if(bucket[res]+bucket[i]!==0){
                return false;
            }
        }else{
            throw new Error('输入含非法字符')
        }
    }
    if(!stack.length){
        return true;
    }else{
        return false;
    }
}