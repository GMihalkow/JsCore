function solve() {
	let resultSpan = document.getElementById("result");
	// resultSpan.innerHTML = "";

	// "[[1,2,3],[4,5,6]]"
	// "[[7,9,11],[8,10,12]]"
	let firstMatrix = document.getElementById("mat1").value;

	let secondMatrix = document.getElementById("mat2").value;
	
	firstMatrix = JSON.parse(firstMatrix);
	secondMatrix = JSON.parse(secondMatrix);

	function transposeMatrix(rowLength){
		let tempMatrix = [];
		let newRow = [];

		for (let row = 0; row < +secondMatrix[0].length; row++) {
			for (let col = 0; col < rowLength; col++) {
				
				newRow.push(secondMatrix[col][row]);
				if(newRow.length === rowLength){
					// console.log("hit");
					tempMatrix.push(newRow);
					newRow = [];
				}
			}	
		}
		return tempMatrix;
	}

	let rowLength = secondMatrix[0].length - 1;
	secondMatrix = transposeMatrix(rowLength)
	console.log(secondMatrix);
	let resultMatrix = [];
	let newRow = [];
	
	let sum = 0;
	for (let row = 0; row < firstMatrix.length; row++) {
		sum=0;
		let tempRow = 0;
		console.log("ROW: " + row);
		while(tempRow <= firstMatrix.length-1){
			
				for (let col = 0; col < firstMatrix[row].length; col++) {
					console.log("COL:" + col);
					console.log(+firstMatrix[row][col] + " * " + +secondMatrix[col][tempRow]);
					sum += +firstMatrix[row][col] * +secondMatrix[col][tempRow];		
				}
				console.log("SUM: " + sum);
				console.log("Push");
				
				newRow.push(sum);
				if(newRow.length === rowLength){	
					resultMatrix.push(newRow);
					newRow = [];
				}	
				sum=0;
				tempRow++;
		}
	}

	console.log(resultMatrix);
	for (let index = 0; index < resultMatrix.length; index++) {
		let paragraph = document.createElement("p");
		paragraph.textContent = resultMatrix[index].join(", ");
		resultSpan.appendChild(paragraph);	
	}
}