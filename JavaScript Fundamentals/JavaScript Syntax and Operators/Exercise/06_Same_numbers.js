function FindDuplicatingNumbers(num){
    let digitsSum = 0;

    let allDigitsAreTheSame = true;

    let numberAsString = num.toString();

    let firstDigit = numberAsString[0];

    for(i=0; i<numberAsString.length; i++){

        if(numberAsString[i] != firstDigit){
            allDigitsAreTheSame = false;
        }

        digitsSum += Number(numberAsString[i]);
    }

    console.log(allDigitsAreTheSame);
    console.log(digitsSum);
}

FindDuplicatingNumbers(1234);