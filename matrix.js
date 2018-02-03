class matrix {

  constructor(r, c) {
    this.rows = r ;
    this.cols = c || r ;
    this.m = new Array(this.rows) ;
    for(let i = 0 ; i < this.rows ; i++) {
      this.m[i] = new Array(this.cols) ;
    }
  }

  // INSTANCE FUNCTIONS.. or whatever

  makeRandomMatrix() {
    for(let i = 0 ; i < this.rows ; i++) {
      for(let j = 0 ; j < this.cols ; j++) {
        this.m[i][j] = floor(random(10)) ;
      }
    }
  }

  makeNullMatrix() {
    for(let i = 0 ; i < this.rows ; i++) {
      for(let j = 0 ; j < this.cols ; j++) {
        this.m[i][j] = 0 ;
      }
    }
  }

  copyFromMatrix(m) {
    this.rows = m.rows ;
    this.cols = m.cols ;
    this.m = new Array(this.rows) ;
    for(let i = 0 ; i < this.rows ; i++) {
      this.m[i] = new Array(this.cols) ;
    }
    for(let i = 0 ; i < this.rows ; i++) {
      for(let j = 0 ; j < this.cols ; j++) {
        this.m[i][j] = m.m[i][j] ;
      }
    }
  }

  multiply(n) {
    if(n instanceof matrix) {
      if(this.cols == n.rows) {
        let aux = new matrix(this.rows, n.cols) ;
        aux.makeNullMatrix() ;
        for(let i = 0 ; i < this.rows ; i++) {
          for(let j = 0 ; j < n.cols ; j++) {
            for(let k = 0 ; k < this.cols ; k++) {
              aux.m[i][j] += (this.m[i][k] * n.m[k][j]) ;
            }
          }
        }
        this.copyFromMatrix(aux) ;
      }
      else return -1 ;
    }
    else {
      for(let i = 0 ; i < this.rows ; i++) {
        for(let j = 0 ; j < this.cols ; j++) {
          this.m[i][j] *= n ;
        }
      }
    }
  }

  add(n) {
    if(n instanceof matrix) {
      if(this.cols == n.cols && this.rows == n.rows) {
        for(let i = 0 ; i < this.rows ; i++) {
          for(let j = 0 ; j < this.cols ; j++) {
            this.m[i][j] += n.m[i][j] ;
          }
        }
      }
      else return -1 ;
    }
    else {
      for(let i = 0 ; i < this.rows ; i++) {
        for(let j = 0 ; j < this.cols ; j++) {
          this.m[i][j] += n ;
        }
      }
    }
  }

  determinant() {
    if(this.rows != this.cols) {
      return undefined ;
    } else {
      return calcRec(this.m) ;
    }
  }

  transpose() {
    let aux = new matrix(this.cols, this.rows) ;
    for(let i = 0 ; i < this.rows ; i++) {
      for(let j = 0 ; j < this.cols ; j++) {
        aux.m[j][i] = this.m[i][j] ;
      }
    }
    this.copyFromMatrix(aux) ;
  }

  show() {
    for(let i = 0 ; i < this.rows ; i++) {
      let str = "" ;
      for(let j = 0 ; j < this.cols ; j++) {
          str += String(this.m[i][j])  + ' ' ;
      }
      console.log(str) ;
    }
  }

  // STATIC FUNCTIONS

  static areEqual(m, n) {
    if(m.rows != n.rows || m.cols != n.cols) {
      return false ;
    }
    for(let i = 0 ; i < m.rows ; i++) {
      for(let j = 0 ; j < m.cols ; j++) {
          if(n.m[i][j] != m.m[i][j]) {
            return false ;
          }
      }
    }
    return true ;
  }

  static multiply(m, n) {
    if(n instanceof matrix) {
      if(m.cols == n.rows) {
        let aux = new matrix(m.rows, n.cols) ;
        aux.makeNullMatrix() ;
        for(let i = 0 ; i < m.rows ; i++) {
          for(let j = 0 ; j < n.cols ; j++) {
            for(let k = 0 ; k < m.cols ; k++) {
              aux.m[i][j] += (m.m[i][k] * n.m[k][j]) ;
            }
          }
        }
        return aux ;
      }
      else return -1 ;
    }
    else {
      let aux = new matrix(m.rows, m.cols) ;
      aux.copyFromMatrix(m) ;
      for(let i = 0 ; i < m.rows ; i++) {
        for(let j = 0 ; j < m.cols ; j++) {
          aux.m[i][j] *= n ;
        }
      }
      return aux ;
    }
  }

  static add(m, n) {
    if(n instanceof matrix) {
      if(m.cols == n.cols && m.rows == n.rows) {
        let aux = new matrix(m.rows, m.cols) ;
        aux.copyFromMatrix(m) ;
        for(let i = 0 ; i < m.rows ; i++) {
          for(let j = 0 ; j < m.cols ; j++) {
            aux.m[i][j] += n.m[i][j] ;
          }
        }
        return aux ;
      }
      else return -1 ;
    }
    else {
      let aux = new matrix(m.rows, m.cols) ;
      aux.copyFromMatrix(m) ;
      for(let i = 0 ; i < m.rows ; i++) {
        for(let j = 0 ; j < m.cols ; j++) {
          aux.m[i][j] += n ;
        }
      }
      return aux ;
    }
  }

  static transpose(m) {
    let aux = new matrix(m.cols, m.rows) ;
    for(let i = 0 ; i < m.rows ; i++) {
      for(let j = 0 ; j < m.cols ; j++) {
        aux.m[j][i] = m.m[i][j] ;
      }
    }
    return aux ;
  }
}

function calcRec(A) {
  let s ;
  let det = 0 ;
  if (A.length == 1) {
    return A[0][0] ;
  } else if (A.length == 2) {
      det = A[0][0] * A[1][1] - A[1][0] * A [0][1] ;
      return det ;
  }
  let k = A.length ;
  for (let i = 0 ; i < k ; i++) {
    let smaller = new Array(A.length - 1) ;
    for (let h = 0 ; h < smaller.length ; h++) {
      smaller[h] = new Array(A.length - 1) ;
    }
    for (let a = 1 ; a < A.length ; a++) {
      for (let b = 0 ; b < A.length ; b++) {
        if (b < i) {
          smaller[a - 1][b] = A[a][b] ;
        } else if (b > i) {
            smaller[a - 1][b - 1] = A[a][b] ;
        }
      }
    }
    if (i % 2 == 0) {
      s = 1 ;
    } else {
        s = -1 ;
      }
      det += s * A[0][i] * (calcRec(smaller)) ;
    }
    return (det) ;
  }
