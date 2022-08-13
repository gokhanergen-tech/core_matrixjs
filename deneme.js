const {Matrix} =require("core-matrixjs")



let matrix=new Matrix([[1,1,1],[1,2,3]])
matrix=Matrix.constArithmeticProcess(matrix,3,"mul",2)
console.log(matrix.write())




