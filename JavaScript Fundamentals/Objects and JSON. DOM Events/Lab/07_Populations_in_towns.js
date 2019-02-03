function solve(input){
    let resultObj = {};

    Array.from(input).forEach((el) =>{
        let splitElement = el.split(" <-> ");

        let townName = splitElement[0];
        let population = parseInt(splitElement[1]);

        if(resultObj[townName] === undefined){
            resultObj[townName] = population;
        } else {
            resultObj[townName] += population;
        }
    });

    Object.keys(resultObj).forEach((key) => console.log(key + " : " + resultObj[key]));
}