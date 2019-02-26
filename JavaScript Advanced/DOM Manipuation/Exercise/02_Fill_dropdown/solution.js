function addItem(){
    let selectMenu = document.querySelector("#menu");

    let itemText = document.querySelector("#newItemText").value;
    let itemValue = document.querySelector("#newItemValue").value;

    let option = document.createElement("option");
    option.textContent = itemText;
    option.value = itemValue;

    selectMenu.appendChild(option);
    document.querySelector("#newItemText").value = "";
    document.querySelector("#newItemValue").value = "";
}