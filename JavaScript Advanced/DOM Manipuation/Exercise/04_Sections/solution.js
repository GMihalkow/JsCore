function create(inputArr){
    let contentDiv = document.querySelector("#content");

    Array.from(inputArr).forEach((el) => {
        let divElement = document.createElement("div");
        
        let paragraphElement = document.createElement("p");
        paragraphElement.textContent = el;
        paragraphElement.style.display = "none";

        divElement.appendChild(paragraphElement);
        
        divElement.addEventListener("click", function(e){
            let paragraph = Array.from(e.target.children)[0];
            paragraph.style.display = "block";
        });

        contentDiv.appendChild(divElement);
    });
}