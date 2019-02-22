function solve(inputObj){
    if(inputObj.handsShaking === false){
        return inputObj;
    }

    let neededAlcoholAmount = parseFloat(inputObj.weight) * parseFloat(inputObj.experience) * 0.1;
    inputObj.bloodAlcoholLevel += neededAlcoholAmount;
    inputObj.handsShaking = false;
    return inputObj;
}

console.log(solve({ weight: 120,
    experience: 20,
    bloodAlcoholLevel: 200,
    handsShaking: true }
))