function attachEventsListeners(){
    let outputDistance = document.getElementById("outputDistance");
    let outputUnit = document.getElementById("outputUnits");

    let inputDistance = document.getElementById("inputDistance");
    let inputUnit = document.getElementById("inputUnits");
    
    let convertBtn = document.getElementById("convert");
    convertBtn.addEventListener("click", function(){
        let distance = parseFloat(inputDistance.value);
        switch(inputUnit.value){
            case "km": {
                switch(outputUnit.value){
                    case "km": outputDistance.value = distance; break;
                    case "m": outputDistance.value = distance * 1000; break;
                    case "cm": outputDistance.value = distance * 1000 * 100; break;
                    case "mm": outputDistance.value = distance * 1000 * 1000; break;
                    case "mi": outputDistance.value = distance / 1.60934; break;
                    case "yrd": outputDistance.value = distance * 1093.613298; break;
                    case "ft": outputDistance.value = distance * 3280.8; break;
                    case "in": outputDistance.value = distance * 3937007874; break;
                }
            } break;
            case "m": {
                switch(outputUnit.value){
                    case "km": outputDistance.value = distance / 1000; break;
                    case "m": outputDistance.value = distance; break;
                    case "cm": outputDistance.value = distance * 0.1; break;
                    case "mm": outputDistance.value = distance * 1000; break;
                    case "mi": outputDistance.value = distance * 0.0006213711922; break;
                    case "yrd": outputDistance.value = distance * 1.093613298; break;
                    case "ft": outputDistance.value = distance * 3.280839895; break;
                    case "in": outputDistance.value = distance * 39.37007874; break;
                }
            } break;
            case "cm": {
                switch(outputUnit.value){
                    case "km": outputDistance.value = distance / 100 / 1000; break;
                    case "m": outputDistance.value = distance / 100; break;
                    case "cm": outputDistance.value = distance; break;
                    case "mm": outputDistance.value = distance * 10; break;
                    case "mi": outputDistance.value = distance * 0.000006213711922; break;
                    case "yrd": outputDistance.value = distance * 0.01093613298; break;
                    case "ft": outputDistance.value = distance * 0.03280839895; break;
                    case "in": outputDistance.value = distance * 0.3937007874; break;
                }
            } break;
            case "mm": {
                switch(outputUnit.value){
                    case "km": outputDistance.value = distance * 0.000001; break;
                    case "m": outputDistance.value = distance * 0.001; break;
                    case "cm": outputDistance.value = distance * 0.1; break;
                    case "mm": outputDistance.value = distance; break;
                    case "mi": outputDistance.value = distance * 6.213711922e-7; break;
                    case "yrd": outputDistance.value = distance * 0.001093613298; break;
                    case "ft": outputDistance.value = distance * 0.003280839895; break;
                    case "in": outputDistance.value = distance * 0.03937007874; break;
                }
            } break;
            case "mi": {
                switch(outputUnit.value){
                    case "km": outputDistance.value = distance * 1.609344; break;
                    case "m": outputDistance.value = distance * 1609.344; break;
                    case "cm": outputDistance.value = distance * 160934.4; break;
                    case "mm": outputDistance.value = distance * 1609344; break;
                    case "mi": outputDistance.value = distance; break;
                    case "yrd": outputDistance.value = distance * 1760; break;
                    case "ft": outputDistance.value = distance * 5280; break;
                    case "in": outputDistance.value = distance * 63360; break;
                }
            } break;
            case "yrd": {
                switch(outputUnit.value){
                    case "km": outputDistance.value = distance * 0.0009144; break;
                    case "m": outputDistance.value = distance * 0.9144; break;
                    case "cm": outputDistance.value = distance * 91.44; break;
                    case "mm": outputDistance.value = distance * 914.4; break;
                    case "mi": outputDistance.value = distance * 0.0005681818182; break;
                    case "yrd": outputDistance.value = distance; break;
                    case "ft": outputDistance.value = distance * 3; break;
                    case "in": outputDistance.value = distance * 36; break;
                }
            } break;
            case "ft": {
                switch(outputUnit.value){
                    case "km": outputDistance.value = distance * 0.0003048; break;
                    case "m": outputDistance.value = distance * 0.3048; break;
                    case "cm": outputDistance.value = distance * 30.48; break;
                    case "mm": outputDistance.value = distance * 304.8; break;
                    case "mi": outputDistance.value = distance * 0.0001893939394; break;
                    case "yrd": outputDistance.value = distance * 0.3333333333; break;
                    case "ft": outputDistance.value = distance; break;
                    case "in": outputDistance.value = distance * 12; break;
                }
            } break;
            case "in": {
                switch(outputUnit.value){
                    case "km": outputDistance.value = distance * 0.0000254; break;
                    case "m": outputDistance.value = distance * 0.0254; break;
                    case "cm": outputDistance.value = distance * 2.54; break;
                    case "mm": outputDistance.value = distance * 25.4; break;
                    case "mi": outputDistance.value = distance * 0.00001578282828; break;
                    case "yrd": outputDistance.value = distance * 0.02777777778; break;
                    case "ft": outputDistance.value = distance * 0.08333333333; break;
                    case "in": outputDistance.value = distance; break;
                }
            } break;
        }
    });
}