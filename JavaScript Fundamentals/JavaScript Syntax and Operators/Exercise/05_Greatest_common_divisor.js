function GetGreatestCommonDivisor(firstNumber, secondNumber){
    let smallerNumber = Math.min(firstNumber, secondNumber);

    let commonDivisors = [];

    for(i=1; i<=smallerNumber; i++){
        if(firstNumber % i == 0 && secondNumber % i == 0){
            commonDivisors.push(i);
        }
    }

    return Math.max.apply(Math, commonDivisors);
}

console.log(GetGreatestCommonDivisor(2154, 458));