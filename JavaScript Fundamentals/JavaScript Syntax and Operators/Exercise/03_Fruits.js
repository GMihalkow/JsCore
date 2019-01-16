function GetFruitInformation(name, weightInGrams, pricePerKg){
    let weightInKgs = weightInGrams/1000;
    
    let totalPrice = weightInKgs * pricePerKg;

    let result = `I need ${totalPrice.toFixed(2)} leva to buy ${weightInKgs.toFixed(2)} kilograms ${name}.`;

    return result;
}

console.log(GetFruitInformation(`apple`, 1563, 2.35));