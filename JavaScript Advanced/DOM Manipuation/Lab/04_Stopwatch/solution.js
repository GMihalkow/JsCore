function stopwatch(){
    let timerDiv = document.querySelector("#time");

    let intervalFunction;

    let startBtn = document.querySelector("#startBtn");
    startBtn.addEventListener("click", function(e){
        e.target.setAttribute("disabled", "true");
        document.querySelector("#stopBtn").removeAttribute("disabled");
        timerDiv.textContent = "00:00";

        let seconds = 0;
        let minutes = 0;

        let updatedWatch = "";

        intervalFunction = setInterval(() => {
            seconds++;
            if(seconds > 59){
                seconds = 0;
                minutes++;
            }
             
            if(minutes < 10){
                updatedWatch = "0" + minutes.toString();
            } else {
                updatedWatch = minutes.toString();
            }
            if(seconds < 10){
                updatedWatch += ":0" + seconds.toString();
            } else {
                updatedWatch += ":" + seconds.toString();
            }

            timerDiv.textContent = updatedWatch;
            
        }, 1000);
    });
    
    let stopBtn = document.querySelector("#stopBtn");
    stopBtn.addEventListener("click", function(e){

        e.target.setAttribute("disabled", "true");
        document.querySelector("#startBtn").removeAttribute("disabled");

        clearInterval(intervalFunction);
    });
}

stopwatch();