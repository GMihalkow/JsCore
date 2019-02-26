function focus(){
    let sections = Array.from(document.querySelectorAll("div"));
    sections.shift();
    
    sections.forEach((section) => {
        section.addEventListener("focusin", function(e){
            section.classList.add("focused");
        });
        section.addEventListener("focusout", function(e){
            section.classList.remove("focused");
        });
    });
}