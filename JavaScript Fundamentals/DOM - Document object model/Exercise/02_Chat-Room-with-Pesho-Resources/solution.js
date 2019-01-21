function solve() {
    let targetDiv = document.getElementById("chatChronology");

    function UpdateChat(username, chatBox){
        let peshoChatBox = chatBox;
        
        let div = document.createElement("div");

        let span = document.createElement("span");
        if(username === "Pesho"){
            span.textContent = "Pesho";
        }
        else{            
            span.textContent = "Me";
        }

        div.appendChild(span);

        let paragraph = document.createElement("p");
        paragraph.textContent = peshoChatBox.value;

        div.appendChild(paragraph);

        if(username === "Pesho"){
            div.style.textAlign = "right";
        }
        else{
            div.style.textAlign = "left";
        }
        peshoChatBox.value = "";

        targetDiv.appendChild(div);
    }

    let peshoBtn = document.getElementsByName("peshoBtn")[0];
    peshoBtn.addEventListener("click", function(){
        let peshoChatBox = document.getElementById("peshoChatBox");
        UpdateChat("Pesho", peshoChatBox);
    });

    let myBtn = document.getElementsByName("myBtn")[0];
    myBtn.addEventListener("click", function(){
        let myChatBox = document.getElementById("myChatBox");
        UpdateChat("Me", myChatBox);
    });
}