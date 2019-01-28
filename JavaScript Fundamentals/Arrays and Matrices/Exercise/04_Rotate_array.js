function solve(inputArr){
    let rotationsCount = +inputArr.pop();
    if(rotationsCount === NaN || rotationsCount >= 260000){

    }
    else{
        for (let index = 0; index < rotationsCount; index++) {
            let firstElement = inputArr.pop();
            inputArr.unshift(firstElement);
        }
    }
    
    console.log(inputArr.join(" "));
}