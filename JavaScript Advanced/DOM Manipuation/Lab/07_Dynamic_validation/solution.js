function validate(){
    let emailRegex = new RegExp(/^[a-z]+\@[a-z]+\.[a-z]+$/);

    let inputField = document.querySelector("#email");
    inputField.addEventListener("change", function(e){
        let text = e.target.value;
        if(emailRegex.test(text)){
            inputField.classList.remove("error");
        } else {
            inputField.classList.add("error");
        }
    });
}