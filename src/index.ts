

const isInteger: Function = (num: number) => {
    const parsedNumber = parseInt(num + "")
    return num - parsedNumber === 0
};

const validateFixed = (fixed: number) => {
    if (fixed && (fixed < 0 || fixed > 100))
        return false;
    return true;

}

const validateOptions = (options?: ArithmeticProps): any => {
    if (options) {
        const fixed = options?.fixed;
        if (fixed && !isInteger(fixed) && validateFixed(fixed))
            throw new Error("Invalid props values error!")
        return {
            ...options, fixed: fixed ? fixed : null
        }
    }
    return null;
}

interface GenerateMatrixProps {
    x: number,
    y: number,
    fixed?: number,
    scala: {
        max: number,
        min: number
    }
}

interface ArithmeticProps {
    fixed?: number
}

abstract class MatrixProcess {

    private static process(process: "sub" | "sum", matrixFirst: Matrix, matrixSecond: Matrix, options?: ArithmeticProps): Matrix {
        let isFixed = false;

        isFixed = validateOptions(options);

        const firstMatrixClone = matrixFirst.getMatrix();
        const secondMatrixClone = matrixSecond.getMatrix();

        const matrix: number[][] = [];
        for (let i = 0; i < matrixFirst.getY(); i++) {
            let row: number[] = [];
            for (let j = 0; j < matrixFirst.getX(); j++) {
                const value = process === "sum" ? firstMatrixClone[i][j] + secondMatrixClone[i][j] : firstMatrixClone[i][j] - secondMatrixClone[i][j]
                row.push(isFixed ? parseFloat((value).toFixed(options?.fixed)) : value)
            }
            matrix.push(row)
        }

        return new Matrix(matrix);
    }

    public static constArithmeticProcess(matrix: Matrix, num: number, process: "mul" | "div" | "sub" | "sum", fixed?: number): Matrix {
        if (matrix && num) {
            const matrixArray: number[][] = matrix.getMatrix();
            const resultMatrix: number[][] = [];
            const isFixed = fixed && validateFixed(fixed) ? true : false;
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
            return new Matrix(resultMatrix);
        } else {
            throw new Error("Illegal argument error!");
        }

    }

    public static multiply(matrixFirst: Matrix, matrixSecond: Matrix, options?: ArithmeticProps): Matrix {
        if (matrixFirst.getX() !== matrixSecond.getY())
            throw new Error("You cannot multiply these matrices!")
        else {
            let isFixed = null;

            if (options) {
                isFixed = validateOptions(options);
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
                    firstRow.push((isFixed ? parseFloat(sum.toFixed(options?.fixed)) : sum))
                }
                matrix.push(firstRow)
            }
            return new Matrix(matrix)
        }
    }

    public static sum(matrixFirst: Matrix, matrixSecond: Matrix, options?: ArithmeticProps): Matrix {
        if (matrixFirst.getX() === matrixSecond.getX() && matrixFirst.getY() === matrixSecond.getY()) {
            const result = this.process("sum", matrixFirst, matrixSecond, options);
            return result;
        } else {
            throw new Error("Matrices' column and row numbers must be the same of each other!")
        }
    }

    public static sub(matrixFirst: Matrix, matrixSecond: Matrix, options?: ArithmeticProps): Matrix {
        if (matrixFirst.getX() === matrixSecond.getX() && matrixFirst.getY() === matrixSecond.getY()) {
            const result = this.process("sub", matrixFirst, matrixSecond, options);
            return result;
        } else {
            throw new Error("Matrices' column and row numbers must be the same of each other!")
        }
    }

    public static generateMatrix(options: GenerateMatrixProps): Matrix {
        if (isInteger(options.x) && isInteger(options.y)) {
            const matrix: number[][] = [];
            const { max, min } = options.scala;
            let isFixed = null;


            isFixed = validateOptions(options);


            for (let i = 0; i < options.y; i++) {
                let row: number[] = []
                for (let j = 0; j < options.x; j++) {
                    let producedNumber: number = min + Math.random() * (max - min);
                    producedNumber = (isFixed ? parseFloat(producedNumber.toFixed(options.fixed)) : producedNumber)

                    row.push(producedNumber)
                }
                matrix.push(row)
            }
            return new Matrix(matrix)
        } else {
            throw new Error("Invalid props values error!")
        }
    }
}

interface IMatrix {
    transpose(): Matrix,
}

class Matrix extends MatrixProcess implements IMatrix {
    private matrix: number[][]
    private x: number
    private y: number

    constructor(matrix: number[][]) {
        super();
        if (matrix) {
            this.matrix = matrix;
            this.x = matrix[0].length;
            this.y = matrix.length
        }
        else
            throw new Error("Matrix is not valid!")
    }

    public transpose(): Matrix {
        const cloneMatrixArray: number[][] = [];
        const currentArray = this.getMatrix();
        for (let i = 0; i < this.getX(); i++) {
            const row: number[] = [];
            for (let j = 0; j < this.getY(); j++) {
                row.push(currentArray[j][i])
            }
            cloneMatrixArray.push(row)
        }
        return new Matrix(cloneMatrixArray)
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getMatrix(): number[][] {
        return this.matrix;
    }

    public clone(): number[][] {
        return this.getMatrix().map(matrix => [...matrix])
    }

    public write(options?: {
        rows?: {
            start?: number,
            end?: number
        },
        cols?: {
            start?: number,
            end?: number
        }
    }): void {
        let matrixArray = this.clone();
        if (options) {
            const { rows, cols } = options;

            if (rows) {
                matrixArray = matrixArray.slice(rows.start ? rows.start : 0, rows.end ? rows.end : this.getY())
            }

            if (cols) {
                matrixArray = matrixArray.map(array => {
                    return array.slice(cols.start ? cols.start : 0, cols.end ? cols.end : this.getX())
                })
            }
        } 

        for (let i = 0; i < matrixArray.length; i++)
            console.log(matrixArray[i].join(" "))
    }


}

export { Matrix }