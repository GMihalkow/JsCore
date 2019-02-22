function solve(inputObj){
    let resultObj = {};
    resultObj.model = inputObj.model;
    if(inputObj.power <= 90){
        resultObj.engine = {    
            power: 90,
            volume: 1800
        }
    } else if(inputObj.power > 90 && inputObj.power <= 120){
        resultObj.engine = {    
            power: 120,
            volume: 2400
        }
    } else {
        resultObj.engine = {    
            power: 200,
            volume: 3500
        }
    }

    if(inputObj.carriage === "hatchback"){
        resultObj.carriage = {
            type: "hatchback",
            color: inputObj.color
        }
    } else {
        resultObj.carriage = {
            type: "coupe",
            color: inputObj.color
        }
    }

    let tempWheelDiameter = inputObj.wheelsize;
    if(tempWheelDiameter % 2 === 0){
        tempWheelDiameter--;
    }

    let wheels = [ tempWheelDiameter, tempWheelDiameter, tempWheelDiameter, tempWheelDiameter ];
    resultObj.wheels = wheels;

    return resultObj;
}