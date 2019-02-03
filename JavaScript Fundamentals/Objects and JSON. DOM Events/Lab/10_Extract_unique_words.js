function solve(input){
    let wordPattern = new RegExp(/[a-zA-Z]+/, "g");

    let wordsObj = {};

    let matchedWords = input.match(wordPattern);
    matchedWords = Array.from(matchedWords).map((word) => { return word.toLowerCase()});
    matchedWords = Array.from(matchedWords).forEach((word) => { wordsObj[word] = true; });

    let uniqueWords = Object.keys(wordsObj).map((key) => { return key; });
    console.log(uniqueWords.join(", "));
}