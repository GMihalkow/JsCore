function getInfo() {
    let stopName = $("#stopName");

    let stopId = $("#stopId").val();
    let url = "https://testapp-3b30c.firebaseio.com/businfo/" + stopId + ".json";

    let bussesList = $("#buses");

    $.get(url, function(stop){
        if(stop === null){
            stopName.text("Error");
            bussesList.html("");
        } else{
            stopName.text(stop.name);    
            Object.keys(stop.buses).forEach((k) => {
                bussesList.append("<li>Bus " + k.toString() + " arrives in " + stop.buses[k].toString() + " minutes");
            });
        }
    });
}