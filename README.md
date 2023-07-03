<h1>matrixjs-core</h1>
<br>
<br>
<b>
    <h1>Goal</h1>
</b>
<hr />
<p>The goal is that providing matrix processes which is neccesary for linear algebra or others</p>
<hr />
<br>
<b>
    <h1>Matrix Class</h1>
</b>
<ul>
    <li>constructor(matrix: number[][], dataType: dataTypes = "Float64")</li>
    <li>public transpose(): Matrix </li>
    <li>public getX(): number</li>
    <li>public getY(): number</li>
	<li>public set(x: number, y: number, number: number): void</li>
	<li>public convertNumberToDataType(number: number, dataType: dataTypes): number</li>
    <li>public getTypedArray():MatrixType</li>
    <li>public get type(): string</li>
    <li>public clone(): number[][]</li>
    <li>public convertDataType(dataType: dataTypes): number[][] | undefined to Matrix class</li>
    <code>
        dataType can be "Float64" | "Float32" | "UInt8" | "UInt16" | "UInt32" | "Int8" | "Int16" | "Int32"
    </code>
    <li>public write(options?)</li>
    <u>options</u>
    <code>{
        rows?: {
            start?: number,
            end?: number
        },
        cols?: {
            start?: number,
            end?: number
        }
    }</code>

</ul>
<b>
    <h1>Matrix Inherited Processes</h1>
</b>
<ul>
    <li>public static constArithmeticProcess(matrix: Matrix, num: number, process: "mul" | "div" | "sub" | "sum",
        fixed?: number): Matrix</li>
    <li>public static multiply(matrixFirst: Matrix, matrixSecond: Matrix, options?: ArithmeticProps): Matrix </li>
    <u>options</u>
    <code>{
        fixed?: number
    }</code>
    <li>public static sum(matrixFirst: Matrix, matrixSecond: Matrix, options?: ArithmeticProps): Matrix</li>
    <u>options</u>
    <code>{
        fixed?: number
    }</code>
</ul>
<ul>
 <li>public static sub(matrixFirst: Matrix, matrixSecond: Matrix, options?: ArithmeticProps): Matrix</li>
    <u>options</u>
    <code>{
        fixed?: number
    }</code>
    <li>public static generateMatrix(options: GenerateMatrixProps): Matrix</li>
    <u>options</u>
    <code>{
        x: number,
        y: number,
        fixed?: number,
        dataType?: dataTypes,
        scala: {
            max: number,
            min: number
        }
    }</code>
    <li>public static ifso(matrix: Matrix, queryFunc: (value: number) => boolean, doFunc: (value: number) => number,
        doFalseFunc?: (value: number) => number): Matrix</li>
	<li>public static eye(y:number,x:number):Matrix</li>
	<li>public static fill(x:number,y:number,number:number):Matrix</li>
</ul>
<b>
    <h1>Installation</h1>
</b>
<code>
    npm i matrixjs-core
</code>
<b>
    <h1>Usage</h1>
</b>
<b>const {Matrix} =require("matrixjs-core")</b>
<br>
<br>
<code>
let matrix=new Matrix([[1,1,1],[1,2,3]])
</code>
<br>
<code>
Matrix.constArithmeticProcess(matrix,3,"mul",2)
</code>
<hr>


<b>
    <h1>Version 1.0.5-BETA</h1>
</b>
<ul>
    <b>Deprecated</b>
    <li>getMatrix() from Matrix class</li>
</ul>
<ul>
    <b>News</b>
    <li>added 'type' property to Matrix class</li>
    <li>Matrix constructor changed to constructor(matrix: number[][], dataType: dataTypes = "Float64") from
        constructor(matrix: number[][])</li>
    <li>added public convertDataType(dataType: dataTypes): number[][] | undefined to Matrix class</li>
    <li>added generateMatrix method with dataType</li>
    <li><code>
        added Data types like "Float64" | "Float32" | "UInt8" | "UInt16" | "UInt32" | "Int8" | "Int16" | "Int32"
    </code></li>
    <li>added public getTypedArray():MatrixType method to Matrix class</li>
    <code>MatrixType 
        Uint16Array |
Uint8Array |
Uint32Array |
Int32Array |
Int8Array |
Int16Array | Float32Array | Float64Array | null
    </code>
</ul>
<b>
    <h1>Version 1.0.5</h1>
</b>

<ul>
   <li>added public set(x: number, y: number, number: number): void</li>
   <li>added public convertNumberToDataType(number: number, dataType: dataTypes): number</li>
   <li>added public static eye(y:number,x:number):Matrix</li>
   <li>added public static fill(x:number,y:number,number:number):Matrix</li>
</ul>
<b>
    <h1>Version 1.0.53</h1>
</b>

<ul>
   <li>Fixed setting value problem</li>
</ul>
<b>
    <h1>Version 1.0.6</h1>
</b>

<ul>
<li>Solved Maximum call stack size exceeded problem</li>
<li>Solved shallow clone problem</li>
<li>Added ravel function </li>
<li>Added filter function</li>
</ul>

