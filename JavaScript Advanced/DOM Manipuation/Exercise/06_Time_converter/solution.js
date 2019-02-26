function attachEventsListeners(){
    let daysField = document.getElementById("days");
    let hoursField = document.getElementById("hours");
    let minutesField = document.getElementById("minutes");
    let secondsField = document.getElementById("seconds");
    
    let buttons = document.querySelectorAll("input[type='button']");
    Array.from(buttons).forEach((btn) => {    
        btn.addEventListener("click", function(e) {
            let target = e.target;
            let targetId = target.id;
            let targetValue = 0;

            if(targetId === "daysBtn"){
                targetValue = parseInt(daysField.value);

                hoursField.value = targetValue * 24;
                minutesField.value = targetValue * 24 * 60;
                secondsField.value = targetValue * 24 * 60 * 60;
            } else if (targetId === "hoursBtn"){
                targetValue = parseInt(hoursField.value);

                daysField.value = (targetValue * 0.041667);
                minutesField.value = targetValue * 60;
                secondsField.value = targetValue * 60 * 60;
            } else if (targetId === "minutesBtn"){
                targetValue = parseInt(minutesField.value);

                daysField.value = (targetValue * (1/24) * (1/60));
                hoursField.value = (targetValue * (1/60));
                secondsField.value = targetValue * 60;
                
            } else if (targetId === "secondsBtn"){
                targetValue = parseInt(secondsField.value);
            
                daysField.value = (targetValue * (1/24) * (1/60) * (1/60));
                hoursField.value = (targetValue * (1/60) * (1/60));
                minutesField.value = (targetValue * (1/60));
            }
        });
    });
}