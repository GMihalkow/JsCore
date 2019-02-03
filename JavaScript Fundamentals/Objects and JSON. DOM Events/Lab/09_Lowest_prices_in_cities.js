function solve(input){
    let lowestPricedProducts = {};

    Array.from(input).forEach((line) => {
        let splitLine = line.split(" | ");

        let townName = splitLine[0];
        let product = splitLine[1];
        let price = parseFloat(splitLine[2]);
        
        if(lowestPricedProducts[product] === undefined){
            lowestPricedProducts[product] = { [price] : [townName] };
        } else if(parseFloat(Object.keys(lowestPricedProducts[product])[0]) > price){
            lowestPricedProducts[product] = { [price] : [townName] };
        } 
    });

    Object.keys(lowestPricedProducts).forEach((key) => 
    { 
        Object.keys(lowestPricedProducts[key]).forEach((innerKey) => console.log(key + " -> " + Object.keys(lowestPricedProducts[key])[0].toString() + " (" + lowestPricedProducts[key][innerKey] + ")"));
        });
}

solve(
    [
    "Sofia City | Audi | 100000",
    "Sofia City | BMW | 100000",
    "Sofia City | Mitsubishi | 10000",
    "Sofia City | Mercedes | 10000",
    "Sofia City | NoOffenseToCarLovers | 0",
    "Mexico City | Audi | 1000",
    "Mexico City | BMW | 99999",
    "New York City | Mitsubishi | 10000",
    "New York City | Mitsubishi | 1000",
    "Mexico City | Audi | 100000",
    "Washington City | Mercedes | 1000"
    ]
)