import { dataTypes, MatrixType } from "../types";
import MatrixProcess from "../utils/MatrixProcess"

interface IMatrix {
    transpose(): Matrix,
}

const types = {
    "Float64": Float64Array,
    "Float32": Float32Array,
    "UInt8": Uint8Array,
    "Int8": Int8Array,
    "UInt16": Uint16Array,
    "Int16": Int16Array,
    "UInt32": Uint32Array,
    "Int32": Int32Array
}



class Matrix extends MatrixProcess implements IMatrix {
    private matrix: number[][] = [];
    private dataType: dataTypes;
    private x: number
    private y: number
    private typedMatrix: MatrixType = null;

    constructor(matrix: number[][], dataType: dataTypes = "Float64") {
        super();
        if (matrix && dataType) {
            this.x = matrix[0].length;
            this.y = matrix.length
            this.dataType = dataType;
            this.matrix = matrix;
            const convertedMatrix = this.convertDataType(dataType);
            if (convertedMatrix) {
                this.matrix = convertedMatrix;
            }
        }
        else
            throw new Error("Matrix is not valid!")
    }

    public set(x: number, y: number, number: number): void {
        const convertNumber=this.convertNumberToDataType(number,this.dataType)
        console.log(this.getY(),this.getX())
        if(x>-1&&y>-1&&y<this.getY()&&x<this.getX()){
            
            this.matrix[y][x]=convertNumber;
            if(this.typedMatrix)
             this.typedMatrix[this.getX()*y+x]=convertNumber;
        }else{
            throw new Error("Invalid array position!")
        }
    }

    public convertNumberToDataType(number: number, dataType: dataTypes): number {
        return new types[dataType]([number])[0]
    }

    /**
   * You can convert but lose the matrices' numbers
   */
    public convertDataType(dataType: dataTypes): number[][] | undefined {
        const array: number[] = [];
        let mapped: number[][] = [];

        if (this.matrix !== undefined) {
            this.dataType = dataType;
            if (["Float64", "Float32", "UInt8", "UInt16", "UInt32", "Int8", "Int16", "Int32"].indexOf(dataType) !== -1) {
                this.matrix.forEach(arr => {
                    array.push(...arr)
                })

                this.typedMatrix = new Int8Array(array)

                mapped = this.matrix.map(row => {
                    const rowArray = new types[dataType](row)
                    const convertedArray: number[] = []
                    rowArray.forEach(data => {
                        convertedArray.push(data)
                    })
                    return convertedArray;
                })
                this.matrix = mapped;
                return mapped;
            }
        }

    }

    public transpose(): Matrix {
        const cloneMatrixArray: number[][] = [];
        const currentArray = this.matrix;
        for (let i = 0; i < this.getX(); i++) {
            const row: number[] = [];
            for (let j = 0; j < this.getY(); j++) {
                row.push(currentArray[j][i])
            }
            cloneMatrixArray.push(row)
        }
        return new Matrix(cloneMatrixArray, this.dataType)
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public get type(): string {
        return this.dataType;
    }

    public clone(): number[][] {
        return this.matrix.slice(0)
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