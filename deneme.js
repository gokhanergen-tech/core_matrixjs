const {Matrix} =require("./lib/index")



let matrix=Matrix.generateMatrix({
    x:2,y:2,scala:{
        min:0,max:1
    },fixed:2
})

console.log(matrix)




