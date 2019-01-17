function GetCommonNumbers(firstArr, secondArr, thirdArr){
    let commonNumbers = [];
    let commonNumbersSum = 0;
    let median = 0;

    for(i=0; i<firstArr.length; i++){
        if(secondArr.includes(firstArr[i]) && thirdArr.includes(firstArr[i]) && !commonNumbers.includes(firstArr[i])){
            commonNumbers.push(firstArr[i]);
        }
    }

    for(i=0; i<secondArr.length; i++){
        if(firstArr.includes(secondArr[i]) && thirdArr.includes(secondArr[i]) && !commonNumbers.includes(secondArr[i])){
            commonNumbers.push(secondArr[i]);
        }
    }

    for(i=0; i<thirdArr.length; i++){
        if(firstArr.includes(thirdArr[i]) && secondArr.includes(thirdArr[i]) && !commonNumbers.includes(thirdArr[i])){
            commonNumbers.push(thirdArr[i]);
        }
    }

    for(i=0; i<commonNumbers.length; i++){
        commonNumbersSum += +commonNumbers[i];
    }

    commonNumbers = commonNumbers.sort();

    if(commonNumbers.length % 2 == 0){
        let firstNum =  commonNumbers[(commonNumbers.length / 2) - 1];

        let secondNum = commonNumbers[(commonNumbers.length / 2)];

        median = (+firstNum + +secondNum) / 2;
    }
    else{
        median = commonNumbers[Math.round(commonNumbers.length / 2) - 1];
    }

    console.log("The common elements are " + commonNumbers.join(", ") + ".");
    console.log("Average: " + commonNumbersSum / commonNumbers.length + ".");
    console.log("Median: "  + median + ".");
}

GetCommonNumbers([1, 2, 3, 4, 5],
    [3, 2, 1, 5, 8],
    [2, 5, 3, 1, 16]
    
    );