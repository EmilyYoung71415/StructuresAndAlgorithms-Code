//解法一
var romanToInt = function(s) {
    var len = s.length;
    var res = 0;
    for(var i = 0;i<len;i++){
    	switch(s.charAt(i)){//返回第i位置的数
    		case "M": res += 1000; break;
    		case "D": res += 500; break;
    		case "C": {
    			if((i<len-1)&&(s.charAt(i+1)=="D"||s.charAt(i+1)=="M")){
    				res -= 100;
    				
    			}else{
    				res += 100;
    				console.log(res);
    			}
    			break;
    		}
    		case "L": res +=50; break;
    		case "X":{
    			if((i<len-1)&&(s.charAt(i+1)=="L"||s.charAt(i+1)=="C")){
    				res -= 10;
    				console.log(res);
    			}else{
    				res += 10;
    			}
    			break;
    		}
    		case "V": res += 5;break;
    		case "I":{
    			if((i<len-1)&&(s.charAt(i+1)=="V"||s.charAt(i+1)=="X")){
    				res -=1;
    			}else{
    				res +=1;
    			}
    			break;
    		}
    	}
    }
    return res;
};

//解法二
var getVal = function(x){
    		switch(x){
    			case 'I':
			        return 1;
			    case 'V':
			        return 5;
			    case 'X':
			        return 10;
			    case 'L':
			        return 50;
			    case 'C':
			        return 100;
			    case 'D':
			        return 500;
			    case 'M':
			        return 1000;
			}
		return 0;
    }
    
    var res = 0;
    var max = "I";
    for(var i = s.length-1;i>=0; --i){
    	if(getVal(s.charAt(i))>=getVal(max)){
    		max = s.charAt(i);
    		res += getVal(s.charAt(i));
    	}else{
    		res -= getVal(s.charAt(i));
    	}
    }
    return res;