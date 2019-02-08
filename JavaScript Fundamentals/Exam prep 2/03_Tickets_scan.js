function solve(inputText, inputCommand){
    let text = inputText
    let command = inputCommand;

    let namesRegex = new RegExp(/[ ][A-Z]{1}[A-Za-z]*\-[A-Z]{1}[A-Za-z]*[ ]|[ ][A-Z]{1}[A-Za-z]*\-[A-Z]{1}[A-Za-z]*\.\-[A-Z]{1}[A-Za-z]*[ ]/, "g");
    let airportRegex = new RegExp(/[ ][A-Z]{3}\/[A-Z]{3}[ ]/);
    let flightNumberRegex = new RegExp(/[ ][A-Z]{1,3}\d{1,5}[ ]/);
    let companyRegex = new RegExp(/\-\ [A-Z]{1}[A-Za-z]*\*[A-Z]{1}[A-Za-z]*[ ]/);

    switch(command){
        case "name":{
            let match = namesRegex.exec(text);
            let name = match[0];
            name = name.trim();
            name = Array.from(name.split("")).map((letter) => {
                if(letter === "-"){
                    return " ";
                }
                return letter;
            }).join("");

            console.log("Mr/Ms, " + name.toString() + ", have a nice flight!");
        }break;
        case "flight":{
            let flightMatch = flightNumberRegex.exec(text);
            let flightNum = flightMatch[0];
            flightNum = flightNum.trim();

            let airportMatch = airportRegex.exec(text);
            let fromAirport = airportMatch[0].trim().split("/")[0];
            let toAirport = airportMatch[0].trim().split("/")[1];

            console.log("Your flight number " + flightNum.toString() + " is from " + fromAirport.toString() + " to " + toAirport.toString() + ".");
        }break;
        case "all":{
            let nameMatch = namesRegex.exec(text);
            let name = nameMatch[0];
            name = name.trim();
            name = Array.from(name.split("")).map((letter) => {
                if(letter === "-"){
                    return " ";
                }
                return letter;
            }).join("");

            let flightMatch = flightNumberRegex.exec(text);
            let flightNum = flightMatch[0];
            flightNum = flightNum.trim();

            let airportMatch = airportRegex.exec(text);
            let fromAirport = airportMatch[0].trim().split("/")[0];
            let toAirport = airportMatch[0].trim().split("/")[1];

            let companyMatch = companyRegex.exec(text);
            let company = companyMatch[0].replace("- ", "");
            company = company.trim();
            company = company.replace("*" , " ");

            console.log("Mr/Ms, " + name.toString() + ", your flight number " + flightNum.toString() + " is from " + fromAirport.toString() + " to " + toAirport.toString() + ". Have a nice flight with " + company.toString() + ".");
        }break;
        case "company":{
            let companyMatch = companyRegex.exec(text);
            let company = companyMatch[0].replace("- ", "");
            company = company.trim();
            company = company.replace("*" , " ");
            
            console.log("Have a nice flight with " + company.toString() + ".");
        }break;
        default: console.log("test");
    }
}

solve(

    'ahah Second-Testov.-Peshov )*))&&ba SOF/VAR ela**  FB973  - Bulgaria*Air -op pa- SOF/VAr ',
    'name'
)