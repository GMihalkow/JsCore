function solve() {
    let input = document.getElementById("input");
    let output = document.getElementById("output");

    let extractBtn = document.querySelector("button");
    extractBtn.addEventListener("click", function(){
        let inputText = input.value;
        let numLength = 0;
        let numberRegex = new RegExp(/[0-9]+/);

        let startingNumber = parseInt(numberRegex.exec(inputText));
        numLength = startingNumber.toString().length;
        
        inputText = inputText.substr(numLength, startingNumber);
        
        let symbolToSplitWith = inputText.split("").pop();
        
        let firstPart = new RegExp("[" + inputText.split(symbolToSplitWith)[0] + "]", "g");
        let secondPart = inputText.split(symbolToSplitWith)[1].toString();
        
        let matches = secondPart.match(firstPart);
        Array.from(matches).forEach((match) => {
            secondPart = secondPart.replace(match, "");
        });

        secondPart = Array.from(secondPart.split("")).map((letter) => {
            if(letter === "#"){
                return " ";
            } else {
                return letter;
            }
        }).join("").toString();

        output.textContent = secondPart;
    });
}