//合并排序数组
//way 1
var merge = function(nums1, m, nums2, n) {
    if(m ==0&&n==0) return;
    if(m==0&&n!=0){
        for(var i = 0;i<n;i++){
            nums1[i]=nums2[i];
        }
    }

    if(m!=0&&n!=0){
        var i = m-1, j = n-1, p = m+n-1;
        //while(j>=0&&i>=0){
        while(j>=0){
            //if(nums1[i]>nums2[j]){
             if(nums1[i]>nums2[j]&&i>=0){
                nums1[p] = nums1[i];
                i--;
            }else{
                nums1[p] = nums2[j];
                j--;
            }
            p--;
        }

        // while(i>=0){//nums1长些
        //     nums1[p] = nums1[i];
        //     i--;
        //     p--;
        // }
        // while(j>=0){
        //     nums1[p] = nums2[j];
        //     j--;
        //     p--;
        // }
    }
    return nums1;
};

//way 2

var merge = function(nums1, m, nums2, n) {
    var i = m - 1, j = n - 1, position = m + n - 1;
    while (j >= 0) {
        nums1[position--] = ( i >= 0 && nums1[i] > nums2[j] ) ? nums1[i--] : nums2[j--];
    }
    return nums1;
};