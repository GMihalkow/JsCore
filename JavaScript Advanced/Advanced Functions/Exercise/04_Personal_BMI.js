function solve(name, age, weight, height){
    let heightInMeters = height / 100;

    function calculateBMI(weight, heightInMeters){
        return Math.round((parseFloat(weight) / parseFloat(Math.pow(heightInMeters, 2))));
    }

    function chooseStatus(BMI){
        if(BMI < 18.5){
            return "underweight";
        } else if(BMI < 25 && BMI >= 18.5){
            return "normal";
        } else if(BMI >= 25 && BMI < 30){
            return "overweight";
        } else{
            return "obese";
        }
    }

    let BMI = calculateBMI(weight, heightInMeters);

    let status = chooseStatus(BMI);

    let resultObj = {
         "name": name,
         "personalInfo":{
            "age": age,
            "weight": weight,
            "height": height
         },
         "BMI": BMI,
         "status": status
    };

    if(status === "obese"){
        resultObj.recommendation = "admission required";
    }

    return resultObj;
}

console.log(solve("Peter", 29, 75, 182));