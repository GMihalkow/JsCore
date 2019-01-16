function GetEvenNumbersInRange(lastNumber){
    for(i=1; i<=lastNumber; i++){
        if(i%2 == 0){
            console.log(i);
        }
    }
}

GetEvenNumbersInRange(7);