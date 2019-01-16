function CalorieObject(inputArr){
    let obj = {};

    for(i=0; i<inputArr.length; i++){
    
        if((i + 1) % 2 != 0){
            obj[inputArr[i]] = +inputArr[i+1];
        }
    
    }

    return obj;
}

console.log(CalorieObject(['Potato', 93, 'Skyr', 63, 'Cucumber', 18, 'Milk', 42]));