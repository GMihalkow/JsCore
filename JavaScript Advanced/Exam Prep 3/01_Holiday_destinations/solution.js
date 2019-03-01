function addDestination(){
    let destinationsList = document.querySelector("#destinationsList");

    let inputFields = document.querySelectorAll("#input input");
    let cityInputField = inputFields[0];
    let countryInputField = inputFields[1];
    let seasonSelect = document.querySelector("#seasons");

    if(cityInputField.value.length > 0 && countryInputField.value.length > 0){
        let tableRow = document.createElement("tr");
        
        let cityAndCountryData = document.createElement("td");
        cityAndCountryData.textContent = cityInputField.value.toString() + ", " + countryInputField.value.toString();

        let seasonData = document.createElement("td");
        seasonData.textContent = seasonSelect.value;
        
        let firstLetter = seasonData.textContent[0];

        seasonData.textContent = firstLetter.toUpperCase() + seasonData.textContent.substr(1);

        tableRow.appendChild(cityAndCountryData);
        tableRow.appendChild(seasonData);

        document.querySelector("#" + seasonSelect.value).value++;

        destinationsList.appendChild(tableRow);
    }

    cityInputField.value = "";
    countryInputField.value = "";
}