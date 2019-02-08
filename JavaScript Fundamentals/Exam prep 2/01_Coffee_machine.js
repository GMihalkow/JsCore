function solve(inputArr){
    let totalIncome = 0;

    Array.from(inputArr).forEach((element) => {
        let splitElement = element.split(", ");
        
        let drinkPrice = 0;

        let insertedCoins = parseFloat(splitElement[0]);
        let drinkType = splitElement[1];
        let coffeeType = "";

        if(drinkType === "coffee"){
            coffeeType = splitElement[2];
            if(coffeeType === "caffeine"){
                drinkPrice = 0.80;
            } else {
                drinkPrice = 0.90;                
            }
        } else {
            drinkPrice = 0.80;
        }

        if(splitElement[3] === "milk" || splitElement[2] === "milk" ){
            drinkPrice += (drinkPrice * 0.10);
            drinkPrice = parseFloat((drinkPrice).toFixed(1));
        }

        if(parseInt(splitElement[4]) || parseInt(splitElement[3]) > 0){
            drinkPrice += 0.10;
        }

        if(drinkPrice <= insertedCoins){
            let change = (insertedCoins - drinkPrice);
            totalIncome += drinkPrice;
            if(coffeeType === ""){
                console.log("You ordered tea. Price: " + drinkPrice.toFixed(2) .toString() + "$ Change: " + change.toFixed(2).toString() + "$");
            } else {
                console.log("You ordered coffee. Price: " + drinkPrice.toFixed(2) .toString() + "$ Change: " + change.toFixed(2).toString() + "$");
            }
        } else {
            let neededMoney = (drinkPrice - insertedCoins);

            if(coffeeType === ""){
                console.log("Not enough money for tea. Need " + neededMoney.toFixed(2).toString() + "$ more.");
            } else {
                console.log("Not enough money for coffee. Need " + neededMoney.toFixed(2).toString() + "$ more.");
            }
        }
    });

    console.log("Income Report: " + totalIncome.toFixed(2).toString() + "$");
}

solve(
    [
    '1.00, coffee, caffeine, milk, 4',
    '0.40, tea, milk, 2',
    '1.00, coffee, decaf, 0'
    ]
)