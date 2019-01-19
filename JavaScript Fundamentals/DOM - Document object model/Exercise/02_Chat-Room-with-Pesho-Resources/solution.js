function solve() {
    let targetDiv = document.getElementById("chatChronology");

    let peshoBtn = document.getElementsByName("peshoBtn")[0];
    peshoBtn.addEventListener("click", function(){
        let peshoChatBox = document.getElementById("peshoChatBox");
        
        let div = document.createElement("div");

        let span = document.createElement("span");
        span.textContent = "Pesho";

        div.appendChild(span);

        let paragraph = document.createElement("p");
        paragraph.textContent = peshoChatBox.value;

        div.appendChild(paragraph);

        div.style.textAlign = "right";

        peshoChatBox.value = "";

        targetDiv.appendChild(div);
    });

    let myBtn = document.getElementsByName("myBtn")[0];
    myBtn.addEventListener("click", function(){
        let myChatBox = document.getElementById("myChatBox");
        
        let div = document.createElement("div");

        let span = document.createElement("span");
        span.textContent = "Me";
        div.appendChild(span);

        let paragraph = document.createElement("p");
        paragraph.textContent = myChatBox.value;

        div.appendChild(paragraph);

        div.style.textAlign = "left";

        myChatBox.value = "";

        targetDiv.appendChild(div);
    });
}