import { dataTypes, MatrixType } from "../types";
import MatrixProcess from "../utils/MatrixProcess"

interface IMatrix {
    transpose(): Matrix,
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

     /**
    * You can convert but lose the matrices' numbers
    */
    public convertDataType(dataType: dataTypes): number[][] | undefined {
        const array: number[] = [];
        let mapped: number[][] = [];

        if (this.matrix !== undefined) {
            this.dataType = dataType;
            if (["Float64","Float32", "UInt8", "UInt16", "UInt32", "Int8", "Int16", "Int32"].indexOf(dataType) !== -1) {
                this.matrix.forEach(arr => {
                    array.push(...arr)
                })
            }
            switch (dataType) {
                case "Int8":
                    this.typedMatrix = new Int8Array(array)

                    mapped= this.matrix.map(row => {
                        const rowArray: Int8Array = new Int8Array(row)
                        const convertedArray: number[] = []
                        rowArray.forEach(data => {
                            convertedArray.push(data)
                        })
                        return convertedArray;
                    })
                    this.matrix = mapped;
                    return mapped;

                case "Int16":
                    this.typedMatrix = new Int16Array(array)
                    mapped= this.matrix.map(row => {
                        const rowArray: Int16Array = new Int16Array(row)
                        const convertedArray: number[] = []
                        rowArray.forEach(data => {
                            convertedArray.push(data)
                        })
                        return convertedArray;
                    })
                    this.matrix = mapped;
                    return mapped;
                case "Int32":
                    this.typedMatrix = new Int32Array(array)
                    mapped= this.matrix.map(row => {
                        const rowArray: Int32Array = new Int32Array(row)
                        const convertedArray: number[] = []
                        rowArray.forEach(data => {
                            convertedArray.push(data)
                        })
                        return convertedArray;
                    })
                    this.matrix = mapped;
                    return mapped;
                case "UInt8":
                    this.typedMatrix = new Uint8Array(array)
                    mapped = this.matrix.map(row => {
                        const rowArray: Uint8Array = new Uint8Array(row)
                        const convertedArray: number[] = []
                        rowArray.forEach(data => {
                            convertedArray.push(data)
                        })
                        return convertedArray;
                    })
                    this.matrix = mapped;
                    return mapped;

                case "UInt16":
                    this.typedMatrix = new Uint16Array(array)
                    mapped = this.matrix.map(row => {
                        const rowArray: Uint16Array = new Uint16Array(row)
                        const convertedArray: number[] = []
                        rowArray.forEach(data => {
                            convertedArray.push(data)
                        })
                        return convertedArray;
                    })
                    this.matrix = mapped;
                    return mapped;

                case "UInt32":
                    this.typedMatrix = new Uint32Array(array)
                    mapped = this.matrix.map(row => {
                        const rowArray: Uint32Array = new Uint32Array(row)
                        const convertedArray: number[] = []
                        rowArray.forEach(data => {
                            convertedArray.push(data)
                        })
                        return convertedArray;
                    })
                    this.matrix = mapped;
                    return mapped;

                case "Float32":
                    this.typedMatrix = new Float32Array(array)
                    mapped = this.matrix.map(row => {
                        const rowArray: Float32Array = new Float32Array(row)
                        const convertedArray: number[] = []
                        rowArray.forEach(data => {
                            convertedArray.push(data)
                        })
                        return convertedArray;
                    });
                    this.matrix = mapped;
                    return mapped
                case "Float64":
                    this.typedMatrix = new Float64Array(array)
                    mapped = this.matrix.map(row => {
                        const rowArray: Float64Array = new Float64Array(row)
                        const convertedArray: number[] = []
                        rowArray.forEach(data => {
                            convertedArray.push(data)
                        })
                        return convertedArray;
                    });
                    this.matrix = mapped;
                    return mapped
                default:
                    this.typedMatrix = null
                    break;
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