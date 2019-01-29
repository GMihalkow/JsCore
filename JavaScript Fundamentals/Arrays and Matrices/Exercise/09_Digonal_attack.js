function solve(inputMatrix){
    inputMatrix = Array.from(inputMatrix).map((el) => {
        el = el.split(" ");
        el = Array.from(el).map((el) => {return Number(el)});
        return el;
    });
    
    function diagonalSum(matrix){
        let sum = 0;
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if(+row === +col){
                    sum += matrix[row][col];
                }
            }
        }

        return sum;
    }

    let regularMatrix = inputMatrix.slice(0);
    let leftDiagonalSum;
    leftDiagonalSum = diagonalSum(regularMatrix);

    let reversedMatrix = Array.from(regularMatrix).map((el) => { return el.reverse();});
    let rightDiagonalSum;
    rightDiagonalSum = diagonalSum(reversedMatrix);
     
    inputMatrix = Array.from(inputMatrix).map((el) => { return el.reverse();});

    if(+leftDiagonalSum === +rightDiagonalSum){
        for (let row = 0; row < inputMatrix.length; row++) {
            for (let col = 0; col < inputMatrix[row].length; col++) {
                if(+row === +col || +row + +col === +inputMatrix[row].length - 1){
                    continue;
                }
                
                inputMatrix[row][col] = leftDiagonalSum;
            }
        }
        Array.from(inputMatrix).forEach((el) => { console.log(el.join(" ")); });
    }
    else{
        Array.from(inputMatrix).forEach((el) => { console.log(el.join(" ")); });
    }
}