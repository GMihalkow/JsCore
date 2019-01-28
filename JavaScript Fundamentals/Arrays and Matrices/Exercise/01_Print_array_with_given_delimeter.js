function solve(inputArr){
    let delimeter = inputArr[inputArr.length-1].toString();

    let realArr = inputArr.slice(0, inputArr.length-1);
    console.log(realArr.join(delimeter));
}