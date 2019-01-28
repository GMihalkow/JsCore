function solve(matrix){
    function transposeArray(array, arrayLength){
		var newArray = [];
		for(var i = 0; i < arrayLength; i++){
			newArray.push([]);
		};
	
		for(var i = 0; i < array.length; i++){
			for(var j = 0; j < arrayLength; j++){
                if(array[i][j] !== undefined){
                    newArray[j].push(array[i][j]);
                }
			};
		};
	
		return newArray;
	}

    let transposedMatrix = transposeArray(matrix, matrix.length)

    let rowsSum = [];
    let columnsSum = [];
    
    rowsSum = Array.from(matrix)
        .map((e) => { 
            return Array.from(e).reduce((sum, el) => sum+= +el, 0);
        });
    
    columnsSum = Array.from(transposedMatrix)
        .map((e) => { 
            return Array.from(e).reduce((sum, el) => sum+= +el, 0);
        });

        let isMagic = true;
        
        // console.log(transposedMatrix);
        // console.log(rowsSum);
        // console.log(columnsSum);
    if(+rowsSum.length !== +columnsSum.length){
        isMagic = false;
    }
    else{
        rowsSum.forEach((el, index) => {
            if(+rowsSum[index] !== +columnsSum[index]){
                isMagic = false;
            } 
        });
    }

    console.log(isMagic);
}

solve(
    [[2,2,2], [2,2,2], [2,2,"test"]]
);