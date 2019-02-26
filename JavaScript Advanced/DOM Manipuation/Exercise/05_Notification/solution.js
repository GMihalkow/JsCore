function notify(inputMessage){
    let notificationDiv = document.querySelector("#notification");
    notificationDiv.textContent = inputMessage;
    notificationDiv.style.display = "block";
    
    setTimeout(() => {
        notificationDiv.style.display = "none";        
    }, 2000);
}