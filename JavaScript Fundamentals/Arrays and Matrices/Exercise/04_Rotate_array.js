function solve(inputArr){
    let rotationsCount = +inputArr.pop();
    
    for (let index = 0; index < +rotationsCount % inputArr.length; index++) {
        let firstElement = inputArr.pop();
        inputArr.unshift(firstElement);
    }
    
    console.log(inputArr.join(" "));
}