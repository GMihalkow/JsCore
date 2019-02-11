function solve(input){
    let resultText = "";

    function append(word){
        resultText += word.toString();
    }

    function removeStart(word, n){
        let tempWord = word.substring(n, word.length);
        return tempWord;
    }

    function removeEnd(word, n){
        let tempWord = Array.from(word.split("")).reverse().join("").substring(n, word.length).split("").reverse().join("");
        return tempWord;
    }

    Array.from(input).forEach((line) => {
        let splitLine = line.split(" ");
        let command = splitLine[0];
        
        if(command === "append"){
            let value = splitLine[1];
            append(value);
        }

        if(command === "removeStart"){
            let value = parseInt(splitLine[1]);
            resultText = removeStart(resultText, value);
        }
        
        if(command === "removeEnd"){
            let value = parseInt(splitLine[1]);
            resultText = removeEnd(resultText, value);
        }
    });

    console.log(resultText);
}

solve(
    ['append 123',
 'append 45',
 'removeStart 2',
 'removeEnd 1',
 'print']

)