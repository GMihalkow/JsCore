function solve(matrix){
    let firstSum = matrix[0].reduce((sum, num) => sum + num);
    
    function transposeArray(array, arrayLength){
        var newArray = [];
        for(var i = 0; i < array.length; i++){
            newArray.push([]);
        };
    
        for(var i = 0; i < array.length; i++){
            for(var j = 0; j < arrayLength; j++){
                newArray[j].push(+array[i][j]);
            };
        };
    
        return newArray;
    }

    transposedMatrix = transposeArray(matrix, +matrix.length)
    
    let rowsSum = [];
    let columnsSum = [];
    
    rowsSum = Array.from(matrix)
    .map((e) => { 
        return Array.from(e).reduce((sum, el) => sum + +el);
    });

    columnsSum = Array.from(transposedMatrix)
    .map((e) => { 
        return Array.from(e).reduce((sum, el) => sum + +el);
    });

    let isMagic = Array.from(rowsSum).every((el, index) => 
    { 
        return +rowsSum[index] === firstSum && +columnsSum[index] === firstSum;
    });

    console.log(isMagic);
}

solve(
    [
        [3,2],
        [2,3]
    ]
   
);