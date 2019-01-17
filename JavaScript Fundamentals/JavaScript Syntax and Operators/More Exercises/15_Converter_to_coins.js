function CoinsConverter(num, coinsValues){
    let orderedCoinsValues = coinsValues.sort(function(a, b){return b - a});

    let convertedCoins = [];

    let total = 0;

    for(i=0; i<orderedCoinsValues.length; i++){

        if(total > num){
            break;
        }

        let tempTotal = total;

        let temp = tempTotal += +orderedCoinsValues[i];

        if(temp <= num){
            total += +orderedCoinsValues[i];
            convertedCoins.push(+orderedCoinsValues[i]);
            i--;
        }
        else{
            continue;
        }
    }

    return convertedCoins.join(", ");
}

console.log(CoinsConverter(123, [5, 50, 2, 1, 10]));