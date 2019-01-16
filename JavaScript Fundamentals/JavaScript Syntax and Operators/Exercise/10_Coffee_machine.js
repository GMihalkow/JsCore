function Order(inputArr){
    let income = 0;

    for(i=0; i<inputArr.length; i++){
        let totalPrice = 0;

        let orderInfo = inputArr[i].split(`, `);

        let insertedCoins = +orderInfo[0];

        let drinkType = orderInfo[1];
        if(drinkType == `coffee`){
            let coffeeType = orderInfo[2];
            if(coffeeType == `caffeine`)
            {
                totalPrice += 0.80;
            }
            else{
                totalPrice += 0.90;
            }
            
            if(orderInfo[3] == `milk`){
                let milkPrice = Number((totalPrice * 0.10).toFixed(1));

                totalPrice += milkPrice;

                let sugar = +orderInfo[4] != 0;
                if(sugar){
                    totalPrice += 0.10;
                }
                
            }
            else{
                let sugar = +orderInfo[3] != 0;
                if(sugar){
                    totalPrice += 0.10;
                }
            }
            
        }
        else{
            totalPrice += 0.80;
            if(orderInfo[2] == `milk`){
                let milkPrice = Number((totalPrice * 0.10).toFixed(1));

                totalPrice += milkPrice;
                
                let sugar = +orderInfo[3] !== 0;
                if(sugar){
                    totalPrice += 0.10;
                }
            }
            else{
                let sugar = +orderInfo[2] !== 0;
                if(sugar){
                    totalPrice += 0.10;
                }
            }
        }

        if(totalPrice <= insertedCoins){
            console.log(`You ordered ${drinkType}. Price: ${totalPrice.toFixed(2)}$ Change: ${(insertedCoins - totalPrice).toFixed(2)}$`);
            income+=totalPrice;
        }
        else{
            console.log(`Not enough money for ${drinkType}. Need ${(totalPrice - insertedCoins).toFixed(2)}$ more.`);
        }
    }

    console.log(`Income Report: ${income.toFixed(2)}$`);
}

Order(['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2','1.00, coffee, decaf, 0']);