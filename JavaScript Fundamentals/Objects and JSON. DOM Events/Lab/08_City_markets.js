function solve(input){
    let resultObj = {};

    Array.from(input).forEach((line) => {
        let splitLine = line.split(/ -> | : /);
        
        let townName = splitLine[0];
        let product = splitLine[1];
        let salesCount = parseFloat(splitLine[2]);
        let oneUnitPrice = parseFloat(splitLine[3]);
        let totalIncome = salesCount * oneUnitPrice;

        if(resultObj[townName] === undefined){
            resultObj[townName] = [];
        }
        
        resultObj[townName].push("$$$" + product.toString() + " : " + totalIncome);
    });

    Object.keys(resultObj).forEach((key) => { 
        console.log("Town - " + key);
        Array.from(resultObj[key]).forEach((el) => console.log(el));
    });
}