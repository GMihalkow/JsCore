function solve(inputArr){
    let coffeeObj = {};

    function coffeeExists(brand, name){
        let result = Array.from(coffeeObj[brand])
        .some((cf) => {
            if(cf.name === name){
                return true;
            }
        });

        return result;
    }

    function outCommand(line){
        let splitLine = line.split(", ");
        
        let brand = splitLine[1];
        let name = splitLine[2];
        let expireDate = new Date(splitLine[3]);
        let quantity = parseInt(splitLine[4]);

        if(coffeeObj[brand] !== undefined){
            Array.from(coffeeObj[brand]).forEach((c, index) => {
                if(c.name === name){
                    if(c.date > expireDate){
                        if(c.quantity >= quantity){
                            coffeeObj[brand][index].quantity -= quantity;
                        }
                    }
                }
            });
        }
    }

    function inCommand(line){
        let splitLine = line.split(", ");
        
        let brand = splitLine[1];
        let name = splitLine[2];
        let expireDate = new Date(splitLine[3]);
        let quantity = parseInt(splitLine[4]);

        let coffee = {
            brand: brand,
            name: name,
            date: expireDate,
            quantity: quantity
        }

        if(coffeeObj[brand] === undefined){
            coffeeObj[brand] = [];
            coffeeObj[brand].push(coffee);
        } else{
            let doesCoffeeExist = coffeeExists(brand, name);
            if(doesCoffeeExist === true){
                Array.from(coffeeObj[brand]).forEach((c, index) => {
                    if(c.name === name){
                        if(c.date < expireDate){
                            coffeeObj[brand][index] = coffee;
                        } else if(c.date.getTime() === expireDate.getTime()){
                            coffeeObj[brand][index] += quantity;
                        }
                    }
                });
            } else {
                coffeeObj[brand].push(coffee);
            }
        }

    }

    function inspectionCommand(coffeeObj){
        console.log(">>>>> INSPECTION! <<<<<");
        Object.keys(coffeeObj).sort().forEach((key) => {
            console.log("Brand: " + key + ":");
            Array.from(coffeeObj[key])
            .sort((a, b) => b.quantity - a.quantity)
            .forEach((cf) => {
                var res = cf.date.toISOString().slice(0,10);

                console.log("-> " + cf.name + " -> " + res.toString() + " -> " + cf.quantity + ".");
            });
        });
    }

    function reportCommand(coffeeObj){
        console.log(">>>>> REPORT! <<<<<");
        Object.keys(coffeeObj).forEach((key) => {
            console.log("Brand: " + key + ":");
            Array.from(coffeeObj[key]).forEach((cf) => {
                var res = cf.date.toISOString().slice(0,10);

                console.log("-> " + cf.name + " -> " + res.toString() + " -> " + cf.quantity + ".");
            });
        });
    }

    Array.from(inputArr).forEach((inputLine) => {
        let splitLine = inputLine.split(", ");
        let command = splitLine[0];

        if(command === "IN"){
            inCommand(inputLine);
        }

        if(command === "OUT"){
            outCommand(inputLine);
        }

        if(command === "REPORT"){
            reportCommand(coffeeObj);
        }

        if(command === "INSPECTION"){
            inspectionCommand(coffeeObj);
        }
    });

}

solve(
[
    "IN, Batdorf & Bronson, Espresso, 2025-05-25, 20",
    "IN, Folgers, Black Silk, 2023-03-01, 14",
    "IN, Lavazza, Crema e Gusto, 2023-05-01, 5",
    "IN, Lavazza, Crema e Gusto, 2023-05-02, 5",
    "IN, Folgers, Black Silk, 2022-01-01, 10",
    "IN, Lavazza, Intenso, 2022-07-19, 20",
    "OUT, Dallmayr, Espresso, 2022-07-19, 5",
    "OUT, Dallmayr, Crema, 2022-07-19, 5",
    "OUT, Lavazza, Crema e Gusto, 2020-01-28, 2",
    "REPORT",
    "INSPECTION",
])