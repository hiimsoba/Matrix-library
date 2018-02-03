function setup() {

 n = new matrix(4) ;

 n.m[0][0] = 1 ;
 n.m[0][1] = 1 ;
 n.m[0][2] = 2 ;
 n.m[0][3] = 3 ;
 n.m[1][0] = 1 ;
 n.m[1][1] = 1 ;
 n.m[1][2] = 3 ;
 n.m[1][3] = 4 ;
 n.m[2][0] = 2 ;
 n.m[2][1] = 5 ;
 n.m[2][2] = 1 ;
 n.m[2][3] = -1 ;
 n.m[3][0] = -1 ;
 n.m[3][1] = -2 ;
 n.m[3][2] = 2 ;
 n.m[3][3] = 4 ;

 n.show() ;
 console.log(n.determinant()) ;
}

let n ;
