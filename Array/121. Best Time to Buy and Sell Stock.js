 var maxProfit = function(prices) {
    var max_profit = 0;
    var cur_profit = 0;
    for(var i = 0;i<prices.length;i++){
    	for(var j = i+1;j<prices.length;j++){
    		if(prices[j]>prices[i]){
    			cur_profit = prices[j] - prices[i];
    			//console.log(cur_profit);
    		}
	    	if(cur_profit>max_profit){
	    		max_profit = cur_profit;
	    	}
	   	}
    }
    return max_profit;

    /* 更高效的
    var min = Number.MAX_SAFE_INTEGER; //js整数里的最大值
    var max = 0;
    for (var i = 0; i < prices.length; i++) {
        min = Math.min(min, prices[i]);
        console.log(min);
        max = Math.max(max, prices[i] - min);
   		console.log(max);
    }
    return max;*/
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));