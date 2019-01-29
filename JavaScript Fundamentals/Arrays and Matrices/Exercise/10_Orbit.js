function solve(inputArr){
    let rows = +inputArr[0];
    let cols = +inputArr[1];

    let x = +inputArr[2];
    let y = +inputArr[3];

    function initializingMatrix(rows, cols){
       let tempMatrix = [];

       for (let row = 0; row < rows; row++) {
        tempMatrix.push([]);
           for (let col = 0; col < cols; col++) {
            tempMatrix[row].push(null);
           }
       }

       return tempMatrix;
    }

    let matrix = initializingMatrix(rows, cols);

    let initialNumber = 1;

    matrix[x][y] = initialNumber;

    initialNumber++;
    
    let counter = 1;

    let length = matrix.length;

    function fillingMatrix(counter, initialNumber, x, y, matrix){
       let tempMatrix = matrix.slice(0);
        
        for (let row = +x - counter; row <= +x + counter; row++) {
            if(initialNumber > +rows * +cols){
                break;
            }
            for (let col = +y - counter; col <= +y + counter; col++) {
                if(tempMatrix[row] === undefined){
                    continue;
                }
                if(+tempMatrix[row][col] === 1){
                    continue;
                }
                if(tempMatrix[row][col] === null){
                    tempMatrix[row][col] = initialNumber;
                }
            }
        }   

        return tempMatrix;
    }

    while(counter !== length){
        
        
        matrix = fillingMatrix(counter,initialNumber, x, y, matrix);
        counter++;
        initialNumber++;
    }
    
    Array.from(matrix).forEach((e) => { console.log(e.join(" "));});
}

solve(
    [5,5,1,1]
);