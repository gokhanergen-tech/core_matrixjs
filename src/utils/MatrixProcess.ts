import Matrix from '../entities/Matrix'
import { dataTypes} from '../types';

//Validate fixed
const validateFixed = (fixed: number) => {
    if (typeof fixed === 'number' && (fixed < 0 || fixed > 100))
        return false;
    return true;

}

//Validate type
const matricesTypeValidate = (matrixFirst: Matrix, matrixSecond: Matrix) => {
    if (matrixFirst.type !== matrixSecond.type)
        throw new Error("Matrices' types must be the same of each other!")
}

//Validate size
const matricesSizeValidate = (matrixFirst: Matrix, matrixSecond: Matrix) => {
    if (matrixFirst.getX() === matrixSecond.getX() && matrixFirst.getY() === matrixSecond.getY())
        throw new Error("Matrices' column and row numbers must be the same of each other!")
}

//Is Integer, some numbers may be floating number
const isInteger: Function = (num: number) => {
    const parsedNumber = parseInt(num + "")
    return num - parsedNumber === 0
};

//Arithmetic props
interface ArithmeticProps {
    fixed?: number
}

//Generate matrix props for creating random matrix
interface GenerateMatrixProps {
    x: number,
    y: number,
    fixed?: number,
    dataType?: dataTypes,
    scala: {
        max: number,
        min: number
    }
}

//Validate Options
const validateOptions = (options?: ArithmeticProps): any => {
    if (options) {
        const fixed = options?.fixed;
        if ((fixed !== 0) && fixed && !isInteger(fixed) && validateFixed(fixed))
            throw new Error("Invalid props values error!")
        return {
            ...options, fixed
        }
    }
    return null;
}

//It contains matrix processes
export default abstract class MatrixProcess {

    /**
    * It provides subtraction and summation for matrix args
    * @param process 'sub' | 'sum'
    */
    private static process(process: "sub" | "sum", matrixFirst: Matrix, matrixSecond: Matrix, options?: ArithmeticProps): Matrix {
        let isFixed = false;

        isFixed = validateOptions(options);

        const firstMatrixClone = matrixFirst.clone();
        const secondMatrixClone = matrixSecond.clone();

        const matrix: number[][] = [];
        for (let i = 0; i < matrixFirst.getY(); i++) {
            let row: number[] = [];
            for (let j = 0; j < matrixFirst.getX(); j++) {
                const value = process === "sum" ? firstMatrixClone[i][j] + secondMatrixClone[i][j] : firstMatrixClone[i][j] - secondMatrixClone[i][j]
                row.push(isFixed ? parseFloat((value).toFixed(options?.fixed)) : value)
            }
            matrix.push(row)
        }

        return new Matrix(matrix, matrixFirst.type as dataTypes);
    }

    public static constArithmeticProcess(matrix: Matrix, num: number, process: "mul" | "div" | "sub" | "sum", fixed?: number): Matrix {
        if (matrix && num) {
            const matrixArray: number[][] = matrix.clone();
            const resultMatrix: number[][] = [];
            const isFixed = (fixed === 0) || (fixed && validateFixed(fixed) ? true : false)
            for (let i = 0; i < matrix.getY(); i++) {
                const row: number[] = [];
                for (let j = 0; j < matrix.getX(); j++) {
                    let value: number = 0;
                    value = process === "mul" ? (matrixArray[i][j] * num) : (
                        process === "div" ? matrixArray[i][j] / num : (
                            process === "sub" ? matrixArray[i][j] - num : (
                                matrixArray[i][j] + num
                            )
                        )
                    )
                    row.push(isFixed ? parseFloat(value.toFixed(fixed)) : value);
                }
                resultMatrix.push(row);
            }
            return new Matrix(resultMatrix, matrix.type as dataTypes);
        } else {
            throw new Error("Illegal argument error!");
        }

    }

    public static multiply(matrixFirst: Matrix, matrixSecond: Matrix, options?: ArithmeticProps): Matrix {
        matricesTypeValidate(matrixFirst, matrixSecond)
        if (matrixFirst.getX() !== matrixSecond.getY())
            throw new Error("You cannot multiply these matrices!")
        else {
            let isFixed = null;

            if (options) {
                isFixed = validateOptions(options).fixed;
            }

            const cloneFirst = matrixFirst.clone();
            const cloneSecond = matrixSecond.clone();
            const matrix: number[][] = [];
            for (let k = 0; k < matrixFirst.getY(); k++) {
                const firstRow: number[] = []
                for (let i = 0; i < matrixSecond.getX(); i++) {
                    let sum = 0;
                    for (let j = 0; j < matrixFirst.getX(); j++) {
                        sum += cloneFirst[k][j] * cloneSecond[j][i]
                    }
                    firstRow.push((isFixed !== null ? parseFloat(sum.toFixed(options?.fixed)) : sum))
                }
                matrix.push(firstRow)
            }
            return new Matrix(matrix, matrixFirst.type as dataTypes)
        }
    }

    public static sum(matrixFirst: Matrix, matrixSecond: Matrix, options?: ArithmeticProps): Matrix {
        matricesTypeValidate(matrixFirst, matrixSecond)

        matricesSizeValidate(matrixFirst, matrixSecond)

        const result = this.process("sum", matrixFirst, matrixSecond, options);
        return result;

    }

    public static sub(matrixFirst: Matrix, matrixSecond: Matrix, options?: ArithmeticProps): Matrix {
        matricesTypeValidate(matrixFirst, matrixSecond)

        matricesSizeValidate(matrixFirst, matrixSecond)

        const result = this.process("sub", matrixFirst, matrixSecond, options);
        return result;

    }

    /**
     * 
     * @param options 
     * @returns Matrix
     */
    public static generateMatrix(options: GenerateMatrixProps): Matrix {
        if (isInteger(options.x) && isInteger(options.y)) {
            const matrix: number[][] = [];
            const { max, min } = options.scala;
            let isFixed = null;


            isFixed = validateOptions(options).fixed;


            for (let i = 0; i < options.y; i++) {
                let row: number[] = []
                for (let j = 0; j < options.x; j++) {
                    let producedNumber: number = min + Math.random() * (max - min);

                    producedNumber = (isFixed !== null ? parseFloat(producedNumber.toFixed(options.fixed)) : producedNumber)

                    row.push(producedNumber)
                }
                matrix.push(row)
            }
            return new Matrix(matrix, options.dataType ? options.dataType : "Float64")
        } else {
            throw new Error("Invalid props values error!")
        }
    }

    public static eye(y:number,x:number):Matrix{
        const matrix:number[][]=[];
        if(x<1&&y<1){
            throw new Error("X and Y cannot be negative number and 1!")
        }else{
            for(let i=0;i<y;i++){
                let row:number[]=[]
                for(let j=0;j<x;j++){
                    if(i===j){
                        row.push(1)
                    }else{
                        row.push(0)
                    }
                }
                matrix.push(row)
            }
            return new Matrix(matrix)
        }
    }

    public static fill(x:number,y:number,number:number):Matrix{
        const matrix:number[][]=[];
        if(x<1&&y<1){
            throw new Error("X and Y cannot be negative number and 1!")
        }else{
            for(let i=0;i<y;i++){
                let row:number[]=[]
                for(let j=0;j<x;j++){
                    row.push(number)
                }
                matrix.push(row)
            }
        }
        return new Matrix(matrix)
    }

    public static ifso(matrix: Matrix, queryFunc: (value: number) => boolean, doFunc: (value: number) => number, doFalseFunc?: (value: number) => number): Matrix {
        if (matrix && queryFunc !== null && doFunc !== null) {
            const matrixArray = matrix.clone();
            const cloneMatrixArray = matrix.clone();
            const isDoFalseFuncActive = doFalseFunc && typeof doFalseFunc === 'function'
            try {
                for (let i = 0; i < matrix.getY(); i++) {
                    for (let j = 0; j < matrix.getX(); j++) {
                        if (queryFunc(matrixArray[i][j])) {
                            cloneMatrixArray[i][j] = doFunc(matrixArray[i][j])
                        } else
                            if (isDoFalseFuncActive) {
                                cloneMatrixArray[i][j] = doFalseFunc(matrixArray[i][j])
                            }
                    }
                }
                return new Matrix(cloneMatrixArray, matrix.type as dataTypes)
            } catch (err) {
                console.log(err)
                throw new Error("Error!")
            }
        } else {
            throw new Error("Null argument error!")
        }
    }
}