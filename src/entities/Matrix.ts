import MatrixProcess from "../utils/MatrixProcess"
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

export default Matrix