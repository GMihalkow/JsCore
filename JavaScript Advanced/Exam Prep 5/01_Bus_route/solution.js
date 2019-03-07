function busRoute(){
    let busStopFields = document.querySelectorAll("input");

    let firstBusStopField = busStopFields[0];
    let secondBusStopField = busStopFields[1];

    let busStops = Array.from(document.querySelectorAll("#bus-stops > li"));
    let tempStops = busStops;

    let startStop = parseInt(firstBusStopField.value) + 1;
    let endStop = parseInt(secondBusStopField.value) + 1;

    if(startStop - 1 > 0 && endStop <= busStops.length + 1 && startStop < endStop && isInt(startStop) && isInt(endStop)){
        let resultList = document.querySelector("#selected-bus-stops");
        resultList.innerHTML = "";

        let selectedRoute = document.querySelector("#selected-route > span");
        selectedRoute.textContent = firstBusStopField.value.toString() + "-" + secondBusStopField.value.toString();

        let alteredStartStop = startStop - 2;
        if(alteredStartStop < 0){
            alteredStartStop = 0;
        }

        let selectedStops = tempStops.slice(alteredStartStop, endStop - 1);

        Array.from(selectedStops).forEach((el) => {
            let clone = el.cloneNode(true);
            resultList.appendChild(clone);
        });
        
        busStopFields[0].value = "";
        busStopFields[1].value = "";
    }

    function isInt(n){
        return !isNaN(n) && n % 1 === 0;
    }

    tempStops = busStops;
}