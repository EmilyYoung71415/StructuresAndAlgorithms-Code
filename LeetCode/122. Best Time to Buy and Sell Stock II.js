var maxProfit = function(prices) {
    var max_profit = 0;
    for(var i = 0;i<prices.length-1;i++){
    	if(prices[i+1]>prices[i]){
    		max_profit += prices[i+1]-prices[i];
    	}
    }
    return max_profit;
};
console.log(maxProfit([7, 1, 5, 3, 6, 4]));