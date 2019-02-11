function solve(input){
    let resultFunction = input.bind(input, ",", "$", true);
    return resultFunction;
}

solve(
    function currencyFormatter(separator = ",", symbol = "$", symbolFirst = true, value) {
        let result = Math.trunc(value) + separator;
        result += value.toFixed(2).substr(-2,2);
        if (symbolFirst) return symbol + ' ' + result;
        else return result + ' ' + symbol;
    }    
)