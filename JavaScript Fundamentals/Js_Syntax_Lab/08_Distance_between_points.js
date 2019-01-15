function CalculateDistance(x1, y1, x2, y2){
    let x = Math.pow(x1 - x2, 2);

    let y = Math.pow(y1 - y2, 2);

    let result = Math.sqrt(x + y);

    return result;
}

console.log(CalculateDistance(2.34, 15.66, -13.55, -2.9985));