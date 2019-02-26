function addItem(){
    let itemsList = document.querySelector("#items");

    let newText = document.querySelector("#newText");

    let deleteBtn = document.createElement("a");
    deleteBtn.setAttribute("href", "#");
    deleteBtn.textContent = "[Delete]";
    
    deleteBtn.addEventListener("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        let currentChild = e.target.parentElement;
        let parentElement = e.target.parentElement.parentElement;
        parentElement.removeChild(currentChild);
    });

    let listItem = document.createElement("li");
    listItem.textContent = newText.value + " ";
    listItem.appendChild(deleteBtn);

    itemsList.appendChild(listItem);
}