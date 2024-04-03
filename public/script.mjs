async function createMatrixInputs() {
    const rows1 = parseInt(document.getElementById('rows1').value);
    const cols1 = parseInt(document.getElementById('cols1').value);
    const rows2 = parseInt(document.getElementById('rows2').value);
    const cols2 = parseInt(document.getElementById('cols2').value);

    const matrixInputsDiv = document.getElementById('matrixInputs');
    matrixInputsDiv.innerHTML = '';

    matrixInputsDiv.innerHTML += '<h2>Matriz 1:</h2>';
    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols1; j++) {
            matrixInputsDiv.innerHTML += `<input type="number" id="matrix1_${i}_${j}">`;
        }
        matrixInputsDiv.innerHTML += '<br>';
    }

    matrixInputsDiv.innerHTML += '<h2>Matriz 2:</h2>';
    for (let i = 0; i < rows2; i++) {
        for (let j = 0; j < cols2; j++) {
            matrixInputsDiv.innerHTML += `<input type="number" id="matrix2_${i}_${j}">`;
        }
        matrixInputsDiv.innerHTML += '<br>';
    }
}

async function multiplyMatrices() {
    const rows1 = parseInt(document.getElementById('rows1').value);
    const cols1 = parseInt(document.getElementById('cols1').value);
    const rows2 = parseInt(document.getElementById('rows2').value);
    const cols2 = parseInt(document.getElementById('cols2').value);

    const matrix1 = [];
    for (let i = 0; i < rows1; i++) {
        matrix1[i] = [];
        for (let j = 0; j < cols1; j++) {
            matrix1[i][j] = parseFloat(document.getElementById(`matrix1_${i}_${j}`).value);
        }
    }

    const matrix2 = [];
    for (let i = 0; i < rows2; i++) {
        matrix2[i] = [];
        for (let j = 0; j < cols2; j++) {
            matrix2[i][j] = parseFloat(document.getElementById(`matrix2_${i}_${j}`).value);
        }
    }

    const response = await fetch('/multiply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matrix1, matrix2 })
    });

    const data = await response.json();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h2>Matriz Resultante:</h2>';
    displayResult(data.result, resultDiv);
}

function displayResult(result, resultDiv) {
    const table = document.createElement('table');
    result.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    resultDiv.appendChild(table);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('createMatricesBtn').addEventListener('click', createMatrixInputs);
    document.getElementById('multiplyMatricesBtn').addEventListener('click', multiplyMatrices);
});