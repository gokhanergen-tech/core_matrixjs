const {Matrix} =require("core-matrixjs")

let matrix=new Matrix([[1,1,1],[1,2,3]])

matrix=Matrix.multiply(Matrix.constArithmeticProcess(matrix,3,"mul",2),new Matrix([[2],[2],[2]]))
console.log(Matrix.sum(new Matrix([[1],[1]])))



