function attachEvents(){
    let weatherSymbolsObj = {
        Sunny: "☀",
        Partlysunny: "⛅",
        Overcast: "☁",
        Rain: "☂",
        Degrees: "°"
    };

    let getWeatherBtn = $("#submit");
    getWeatherBtn.on("click", function(){
        let locationName = $("#location").val();

        $("#current").html("<div class='label'>Current conditions</div>");
        $("#upcoming").html("<div class='label'>Three-day forecast</div>");

        $.get("https://judgetests.firebaseio.com/locations.json")
        .then((data) => {
            let location = Array.from(data).find((l) => l.name === locationName);
            if(location !== undefined){
                $.get("https://judgetests.firebaseio.com/forecast/today/" + location.code + ".json")
                    .then((castData) => {
                        $("#forecast").removeAttr("style");
                        let symbol = weatherSymbolsObj[castData.forecast.condition.split(" ").join("")];
                        let current = $("#current");

                        current.append("<span class='condition symbol'>" + symbol + "</span");
                        current.append(
                            "<span class='condition'>"
                            +
                            "<span class='forecast-data'>" + castData.name + "</span>"
                            +
                            "<span class='forecast-data'>" + castData.forecast.low + weatherSymbolsObj["Degrees"] + "/" +  castData.forecast.high + weatherSymbolsObj["Degrees"]  + "</span>"
                            +
                            "<span class='forecast-data'>" + castData.forecast.condition + "</span>"
                            +
                            "</span>");
                    });

                $.get("https://judgetests.firebaseio.com/forecast/upcoming/" + location.code + ".json")
                    .then((upcomingData) => {
                        let upcoming = $("#upcoming");
                        console.log(upcomingData);
                        Array.from(upcomingData.forecast).forEach((cast) => {
                            let currentSymbol = weatherSymbolsObj[cast.condition.split(" ").join("")];
                            upcoming.append(
                            "<span class='upcoming'>"
                            +
                            "<span class='symbol'>" + currentSymbol + "</span>"
                            + 
                            "<span class='forecast-data'>" + cast.low + weatherSymbolsObj["Degrees"] + "/" +  cast.high + weatherSymbolsObj["Degrees"]  + "</span>"
                            +
                            "<span class='forecast-data'>" + cast.condition + "</span>"
                            +
                            "</span>");
                        });
                    })
            } else {
                $("#forecast").html("Error");
            }
        })
        .catch(() => {
            $("#forecast").html("Error");
        });
    });
}