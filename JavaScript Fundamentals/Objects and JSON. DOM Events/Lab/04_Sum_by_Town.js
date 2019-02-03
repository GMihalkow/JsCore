function solve(input){
    let resultObj = {};

    Array.from(input).forEach((el, index) => {
        if(index % 2 === 0){
            if(resultObj[el] !== undefined){
                resultObj[el] += parseFloat(input[+index + 1]);
            } else {
                resultObj[el] = parseFloat(input[+index + 1]);
            }
        }
    })

    console.log(JSON.stringify(resultObj));
}
