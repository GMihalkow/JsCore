function solve(rows, cols){
    let matrix = [];
    for (let index = 0; index < rows; index++) {
        matrix.push([]); 
        for (let innerIndex = 0; innerIndex < cols; innerIndex++) {
            matrix[index].push(null);
        }
    }

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
    
        newArray = newArray.reverse();
		return newArray;
	}

    let endNum = +rows * +cols;
    let initialNumber = 1;
    for (let row = 0; row < rows; row++) {
        if(initialNumber > endNum){
            break;
        }
        for (let col = 0; col < cols; col++) {
            if(+matrix[row][col] !== 0){
                continue;
            }
            matrix[row][col] = initialNumber;
            initialNumber++;
        }
        
        matrix = transposeArray(matrix, matrix.length);
        if(matrix[row].includes(null)){
            row--;
        }
    }

    while(matrix[0][0] !== 1){
        matrix = transposeArray(matrix, matrix.length);
    }

    Array.from(matrix).forEach((el) => {console.log(el.join(" "));});
}