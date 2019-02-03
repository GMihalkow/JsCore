function solve(input){
    let wordPattern = new RegExp(/[a-zA-Z0-9_]+/, "g");

    let currentProperties = [];

    let resultObj = {};

    let matches = input.match(wordPattern);
    Array.from(matches).forEach((match) => {
        let lowerCasedWord = match.toLowerCase();

        if(currentProperties.includes(lowerCasedWord)){
            resultObj[lowerCasedWord]++;
        } else {
            currentProperties.push(lowerCasedWord);
            resultObj[lowerCasedWord] = 1;
        }
    });

    Object.keys(resultObj).sort().forEach((word) => {
        console.log(`'${word}' -> ${resultObj[word]} times`);
    });
}