function deleteByEmail(){
    let resultDiv = document.querySelector("#result");
    
    let emailInput = document.querySelector("input");

    let tds = document.querySelectorAll("td");
    
    Array.from(tds).filter((d) => d.textContent.includes(emailInput.value))
    .forEach((d) => {
        let parent = d.parentElement.parentElement;

        let tableRowElement = d.parentElement;
        
        parent.removeChild(tableRowElement);
    });
}