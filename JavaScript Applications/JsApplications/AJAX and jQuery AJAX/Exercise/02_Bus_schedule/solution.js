function solve() {
    let nextStop = "depot";

    function depart(){
        $.get("https://judgetests.firebaseio.com/schedule/" + nextStop.toString() + ".json", function(obj){
            let name = obj.name;
            let next = obj.next;
            nextStop = next;

            $(".info").text("Next stop " + name.toString());
            $("#depart").attr("disabled", "true");
            $("#arrive").removeAttr("disabled");
        }).fail(() => {
            $(".info").text("Error");
            $("#arrive").attr("disabled", "true");
            $("#depart").attr("disabled", "true");  
        });
    }
    
    function arrive(){
        let stopName = $(".info").text().split(" ")[2];
        $(".info").text("Arriving at " + stopName.toString());
        $("#arrive").attr("disabled", "true");
        $("#depart").removeAttr("disabled");
    }

    return {
      depart,
      arrive
    };
}

let result = solve();