class Printer {
public:
    //[[1,2,3],[4,5,6],[7,8,9],[10,11,12]],4,3
    //[1,2,3,6,5,4,7,8,9,12,11,10]
    vector<int> printMatrix(vector<vector<int> > mat, int n, int m) {
        vector<int> res;
        for(int i = 0; i < n; i++)
        {
            if(i%2){
                for(int j = m - 1; j >=0; j--)
                    res.push_back(mat[i][j]);
            }else{
                for(int j = 0; j < m; j++)
                    res.push_back(mat[i][j]);
            }
        }
        return res;
    }
};