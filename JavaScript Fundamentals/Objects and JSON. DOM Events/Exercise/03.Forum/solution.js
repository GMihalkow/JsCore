function solve() {
    let buttons = document.querySelectorAll("button");

    buttons[0].addEventListener("click", function(e) {
        e.preventDefault();
        
        let tableBody = document.querySelector("tbody");
        
        let textInputs = document.querySelectorAll("input[type=text]");
        let passwordInput = document.querySelector("input[type=password]");

        let topicCheckBoxes = document.querySelectorAll(".topics > input[type=checkbox]");

        let usernameTableData = document.createElement("td");
        let emailTableData = document.createElement("td");
        let topicTableData = document.createElement("td");

        usernameTableData.textContent = textInputs[0].value;
        emailTableData.textContent = textInputs[1].value;
        topicTableData.textContent = Array.from(topicCheckBoxes).map((e) => 
        { 
           if(e.checked){
               return e.value;
           }
        }).filter(x => x).join(" ");

        let tableRow = document.createElement("tr");
        tableRow.appendChild(usernameTableData);
        tableRow.appendChild(emailTableData);
        tableRow.appendChild(topicTableData);

        tableBody.appendChild(tableRow);
    });

    buttons[1].addEventListener("click", function(e) {
        let tableBody = document.querySelector("tbody");
        let textInputs = document.querySelectorAll("input[type=text]");
        let searchInputArea = textInputs[2];

        Array.from(tableBody.children).forEach((tr) => {
            let isValid = Array.from(tr.children).some((td) => {
                return td.textContent.includes(searchInputArea.value);
            });
            
            if(isValid === false){
                tr.style.visibility = "hidden";
            } else {
                tr.style.visibility = "visible";
            }
        });
    });
}