function getInfo() {
    let stopName = $("#stopName");

    let stopId = $("#stopId").val();
    let url = "https://judgetests.firebaseio.com/businfo/" + stopId + ".json";

    let bussesList = $("#buses");

    $.get(url).then((stop) => {
        stopName.text(stop.name);    
        Object.keys(stop.buses).forEach((k) => {
            bussesList.append("<li>Bus " + k.toString() + " arrives in " + stop.buses[k].toString() + " minutes");
        });
    }).catch((error) => {
        stopName.text("Error");
        bussesList.html("");
    });
}