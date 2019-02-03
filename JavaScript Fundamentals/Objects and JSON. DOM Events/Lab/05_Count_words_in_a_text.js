function solve(input){
    let wordPattern = new RegExp(/[a-zA-Z0-9_]+/, "g");

    let resultObj = {};

    let matches = input.match(wordPattern);
    Array.from(matches).forEach((word) => {
        if(resultObj[word] === undefined){
            resultObj[word] = 1;
        } else {
            resultObj[word]++;
        }
    });

    console.log(JSON.stringify(resultObj));
}