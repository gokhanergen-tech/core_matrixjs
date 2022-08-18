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
    <li>constructor(matrix: number[][])</li>
    <li>public transpose(): Matrix </li>
    <li>public getX(): number</li>
    <li>public getY(): number</li>
    <li>public getMatrix(): number[][]</li>
    <li>public clone(): number[][]</li>
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
        scala: {
            max: number,
            min: number
        }
    }</code>
    <li>public static ifso(matrix: Matrix, queryFunc: (value: number) => boolean, doFunc: (value: number) => number,
        doFalseFunc?: (value: number) => number): Matrix</li>

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
