function solve(input){
    let macros = { protein: 0, carbohydrate: 0, fat: 0, flavour: 0 };

    function manage(){
        let splitInput = arguments[0].split(" ");
        let command = splitInput[0];

        if(command === "restock"){
            let macroName = splitInput[1];
            let value = parseInt(splitInput[2]);

            macros[macroName] += value;

            return("Success");
        } else if(command === "prepare"){
            let foodName = splitInput[1];
            let quantity = parseInt(splitInput[2]);

            switch(foodName){
                case "apple": {
                    if(macros.carbohydrate < (1 * quantity)){
                        return("Error: not enough carbohydrate in stock");
                    } else if(macros.flavour < (2 * quantity)){
                        return("Error: not enough flavour in stock");
                    } else {
                        macros.carbohydrate -= (1 * quantity);
                        macros.flavour -= (2 * quantity);
                        return("Success");
                    }
                 } break;
                case "coke":{
                    if(macros.carbohydrate < (10 * quantity)){
                        return("Error: not enough carbohydrate in stock");
                    } else if(macros.flavour < (20 * quantity)){
                        return("Error: not enough flavour in stock");
                    } else {
                        macros.carbohydrate -= (10 * quantity);
                        macros.flavour -= (20 * quantity);
                        return("Success");
                    }
                } break;
                case "burger":{
                    if(macros.carbohydrate < (5 * quantity)){
                        return("Error: not enough carbohydrate in stock");
                    } else if(macros.fat < (7 * quantity)){
                        return("Error: not enough fat in stock");
                    } else if(macros.flavour < (3 * quantity)){
                        return("Error: not enough flavour in stock");
                    } else {
                        macros.carbohydrate -= (5 * quantity);
                        macros.fat -= (7 * quantity);
                        macros.flavour -= (3 * quantity);
                        return("Success");
                    }
                } break;
                case "omelet":{
                    if(macros.protein < (5 * quantity)){
                        return("Error: not enough protein in stock");
                    } else if(macros.fat < (1 * quantity)){
                        return("Error: not enough fat in stock");
                    } else if(macros.flavour < (1 * quantity)){
                        return("Error: not enough flavour in stock");
                    } else {
                        macros.protein -= (5 * quantity);
                        macros.fat -= (1 * quantity);
                        macros.flavour -= (1 * quantity);
                        return("Success");
                    }
                } break;
                case "cheverme":{
                    let neededValue = quantity * 10;
                    if(macros.protein < neededValue){
                        return("Error: not enough protein in stock");
                    } else if(macros.carbohydrate < neededValue){
                        return("Error: not enough carbohydrate in stock");
                    } else if(macros.fat < neededValue){
                        return("Error: not enough fat in stock");
                    } else if(macros.flavour < neededValue){
                        return("Error: not enough flavour in stock");
                    }  else {
                        macros.protein -= neededValue;
                        macros.carbohydrate -= neededValue;
                        macros.fat -= neededValue;
                        macros.flavour -= neededValue;

                        return("Success");
                    }
                } break;
            }
        } else{
            let reportText = "protein=" + macros.protein.toString() + " carbohydrate=" + macros.carbohydrate.toString() + " fat=" + macros.fat.toString() + " flavour=" + macros.flavour.toString();
            return(reportText);
        }
        
        return manage;
    }

    return manage;
}