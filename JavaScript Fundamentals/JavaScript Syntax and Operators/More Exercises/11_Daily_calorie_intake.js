function CalculateCalories(inputArr, workoutsCount){    
    let sex = inputArr[0];
    let weight = +inputArr[1];
    let height = +inputArr[2];
    let age = +inputArr[3];

    let calories = 0;

    if(sex === `f`){
        calories = 655 + 9.7 * weight + 1.85 * height - 4.7 * age;
    }

    if(sex === `m`){
        calories = 66 + 13.8 * weight + 5 * height - 6.8 * age;
    }

    let af = 1.2;

    if(workoutsCount >= 1 && workoutsCount <=2){
        af = 1.375;
    }
    else if(workoutsCount >= 3 && workoutsCount <= 5){
        af = 1.55;
    }
    else if(workoutsCount >= 6 && workoutsCount <= 7){
        af = 1.725;
    }
    else if(workoutsCount > 7){
        af = 1.90;
    }

    let totalIntake = af * calories;

    return Math.round(totalIntake);

}

console.log(CalculateCalories(['m', 86, 185, 25], 3));