function CalculateVat(arr){
    let sum = 0;
    for(i=0;i<arr.length;i++){
        sum += +arr[i];
    }

    console.log("Sum = " + sum);

    let vat = sum * 0.20;
    console.log("VAT = " + vat);

    let total = sum + vat;
    console.log("Total = " + total);

}

let testArr = [1.20, 2.60, 3.50];

CalculateVat(testArr);