function solve(){
    let timerDiv = document.querySelector("#time");

    let intervalFunction;

    let startBtn = document.querySelector("#startBtn");
    startBtn.addEventListener("click", function(e){
        e.target.setAttribute("disabled", "true");
        document.querySelector("#stopBtn").removeAttribute("disabled");

        let seconds = 0;
        let minutes = 0;

        let updatedWatch = "";

        intervalFunction = setInterval(() => {
            if(seconds > 59){
                seconds = 0;
                minutes++;
            }
             
            if(minutes < 10){
                updatedWatch = "0" + minutes.toString();
            }
            if(seconds < 10){
                updatedWatch += ":0" + seconds.toString();
            } 

            timerDiv.textContent = updatedWatch;
            
            seconds++;
        }, 1000);
    });
    
    let stopBtn = document.querySelector("#stopBtn");
    stopBtn.addEventListener("click", function(e){
        e.target.setAttribute("disabled", "true");
        document.querySelector("#startBtn").removeAttribute("disabled");

        clearInterval(intervalFunction);
    });
}

solve();