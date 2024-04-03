import express from 'express';
import { readFile } from 'fs/promises';
import { join } from 'path';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/multiply', (req, res) => {
    const matrix1 = req.body.matrix1;
    const matrix2 = req.body.matrix2;

    if (!isValidMatrix(matrix1) || !isValidMatrix(matrix2)) {
        return res.status(400).send('Las matrices proporcionadas no son válidas.');
    }

    const result = multiplyMatrices(matrix1, matrix2);
    res.json({ result });
});

function isValidMatrix(matrix) {
    if (!Array.isArray(matrix) || matrix.length === 0) return false;
    const cols = matrix[0].length;
    return matrix.every(row => Array.isArray(row) && row.length === cols && row.every(num => !isNaN(num)));
}

function multiplyMatrices(matrix1, matrix2) {
    const result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix2[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrix1[0].length; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});