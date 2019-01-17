function GetHumanizedNumbers(inputText){
    
    function SetNumberSuffix(i) {
        let j = i % 10
             k = i % 100;

        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }
    
    let pattern = new RegExp('[0-9]+');

    while(pattern.exec(inputText) != null){
        let match = pattern.exec(inputText)[0];
        inputText = inputText.replace(match, "got it");
       
       match =  SetNumberSuffix(match);
     
       console.log(match);
    }
}

GetHumanizedNumbers('Yesterday I bought 12 pounds of peppers, 3 kilograms of carrots and 5 kilograms of tomatoes.');