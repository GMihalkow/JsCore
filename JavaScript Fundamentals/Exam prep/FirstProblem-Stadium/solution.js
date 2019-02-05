function solve() {
    let outputArea = document.getElementById("output");

    let profit = 0;
    let fansCount = 0;

    function getSector(rowIndex){
        let sector = "";

        if(rowIndex === 0){
            sector = "A";
        } else if(rowIndex === 1){
            sector = "B";
        } else {
            sector = "C";
        }

        return sector;
    }

    function getTicketsPrice(sector, teamName){
        let ticketPrice = 0;

        if(sector === "A" && (teamName === "Levski" || teamName === "Litex")){
            ticketPrice = 10;
        } else if(sector === "B" && (teamName === "Levski" || teamName === "Litex")){
            ticketPrice = 7;
        } else if(sector === "C" && (teamName === "Levski" || teamName === "Litex")){
            ticketPrice = 5;
        } else if(sector === "B" && teamName === "VIP"){
            ticketPrice = 15;
        } else if(sector === "C" && teamName === "VIP"){
            ticketPrice = 10;
        } else if(sector === "A" && teamName === "VIP"){
            ticketPrice = 25;
        }

        return ticketPrice;
    }

    function processTickets (event, teamName, index){
        let sector = getSector(index);

        let ticketPrice = getTicketsPrice(sector, teamName);

        if(event.target.classList.contains("taken")){
            outputArea.value += " Seat " + event.target.textContent.toString() + " in zone " + teamName + " sector " + sector + " is unavailable.\n";
        } else {
            event.target.classList.add("taken");
            event.target.style.backgroundColor = "rgb(255,0,0)";
            
            fansCount++;
            profit += parseInt(ticketPrice);

            outputArea.value += " Seat " + event.target.textContent.toString() + " in zone " + teamName + " sector " + sector + " was taken.\n";
        }
    }

    let levskiTableRows = document.querySelectorAll(".Levski tr");
    Array.from(levskiTableRows).shift();
    Array.from(levskiTableRows).forEach((row) => {
        let seats = row.querySelectorAll(".seat");
        Array.from(seats).forEach((btn, index) => {
            btn.addEventListener("click", (event) => processTickets(event, "Levski", index));
        });
    });
    
    let litexTableRows = document.querySelectorAll(".Litex tr");
    Array.from(litexTableRows).shift();
    Array.from(litexTableRows).forEach((row) => {
        let seats = row.querySelectorAll(".seat");;
        Array.from(seats).forEach((btn, index) => {
            btn.addEventListener("click", (event) => processTickets(event, "Litex", index));
        });
    });

    let vipTableRows = document.querySelectorAll(".VIP tr");
    Array.from(vipTableRows).shift();
    Array.from(vipTableRows).forEach((row) => {
        let seats = row.querySelectorAll(".seat");;
        Array.from(seats).forEach((btn, index) => {
            btn.addEventListener("click", (event) => processTickets(event, "VIP", index));
        });
    });

    let summaryBtn = document.querySelector("#summary button");
    let summarySpan = document.querySelector("#summary span");
    summaryBtn.addEventListener("click", function(){
        summarySpan.textContent = profit.toString() + " leva, " + fansCount.toString() + " fans.";
    });
}