function addSticker(){
    let stickerList = document.getElementById("sticker-list");

    let title = document.getElementsByClassName("title")[0].value;
    let text = document.getElementsByClassName("content")[0].value;

    if(title.length !== 0 && text.length !== 0){
        let listItem = document.createElement("li");
        listItem.classList.add("note-content");

        let titleHeader = document.createElement("h2");
        titleHeader.textContent = title;

        let xBtn = document.createElement("a");
        xBtn.textContent = "x";
        xBtn.classList.add("button");
        xBtn.onclick = function(e){
            e.preventDefault();
            e.stopPropagation();

            let target = e.target;
            let parent = target.parentElement;
            let rootElement = parent.parentElement;

            rootElement.removeChild(parent);
        };
        
        let hr = document.createElement("hr");

        let textParagraph = document.createElement("p");
        textParagraph.textContent = text;

        listItem.appendChild(xBtn);
        listItem.appendChild(titleHeader);
        listItem.appendChild(hr);
        listItem.appendChild(textParagraph);

        stickerList.appendChild(listItem);
        
        document.getElementsByClassName("title")[0].value = "";
        document.getElementsByClassName("content")[0].value = "";
    }
    
}