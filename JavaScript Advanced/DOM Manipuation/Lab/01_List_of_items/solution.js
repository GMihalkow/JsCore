function addItem(){
    let itemsList = document.querySelector("#items");

    let inputFields = document.getElementsByTagName("input");
    
    let textInput = inputFields[0];
    let listItem = document.createElement("li");

    listItem.textContent = textInput.value;

    itemsList.appendChild(listItem);

}