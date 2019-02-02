function solve() {
    let input = document.getElementById("str").value.split(", ");
    
    let text = input[0];
    let command = input[1];

    let namesPattern = /[ ]([A-Z]{1}[A-Za-z]*[-][A-Z]{1}[A-Za-z]*[.][-][A-Z]{1}[A-Za-z]*|[A-Z]{1}[A-Za-z]*[-][A-Z]{1}[A-Za-z]*)[ ]/;
    let airportPattern = /[ ]([A-Z]{3}\/[A-Z]{3})[ ]/;
    let fightNumberPattern = /[ ]([A-Z]{1,3}[0-9]{1,5})[ ]/;
    let companyPattern = /\-\ ([A-Z]{1}[a-z]*\*[A-Z]{1}[a-z]*)[ ]/;

    let resultSpan = document.getElementById("result");
    
    let outputText = "";
    switch(command){
        case "all":{
            let name = namesPattern.exec(text)[1].trim();
            name = Array.from(name.split("").map((letter) => {if(letter.toString() === "-"){return " "} else{return letter;}})).join("");

            let companyName = companyPattern.exec(text)[1].trim();
            companyName = companyName.replace("*", " ");
            
            let flightNumber = fightNumberPattern.exec(text)[1].trim();
            let airports = airportPattern.exec(text)[1].trim().split("/");
            let fromAirport = airports[0];
            let toAirport = airports[1];
            outputText = `Mr/Ms, ${name}, your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}. Have a nice flight with ${companyName}.`;
        }break;
        case "name":{
            let name = namesPattern.exec(text)[1].trim();
            name = Array.from(name.split("").map((letter) => {if(letter.toString() === "-"){return " "} else{return letter;}})).join("");
            
            outputText = `Mr/Ms, ${name}, have a nice flight!`;
        }break;
        case "company":{
            let companyName = companyPattern.exec(text)[1].trim();
            companyName = companyName.replace("*", " ");
            
            outputText = `Have a nice flight with ${companyName}.`;
        }break;
        case "flight":{
            let flightNumber = fightNumberPattern.exec(text)[1].trim();
            let airports = airportPattern.exec(text)[1].trim().split("/");
            let fromAirport = airports[0];
            let toAirport = airports[1];

            outputText = `Your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}.`;
        }break;
        default: break;
    }

    resultSpan.textContent = outputText;
}