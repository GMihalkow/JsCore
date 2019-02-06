function solve() {
    let buttons = document.querySelectorAll("button");
    let sections = document.querySelectorAll("section");

    function doesTruckExist(plateNumber, trucks){
        let truckExists = Array.from(trucks).some((tr) =>{
            if(tr.plateNumber.toString() === plateNumber.toString()){
                return true;
            }
        });

        return truckExists;
    }

    function reduceTiresQuality(tires, distance){
        let tempTires = Array.from(tires).slice(0);
        
        let amountToReduce = parseFloat(distance) / 1000;

        tempTires = Array.from(tempTires).map((tr, index) => {
            let newValue = parseFloat(tr) - parseFloat(amountToReduce);
            
            return newValue;
        });

        return tempTires;
    }

    function canTiresEndure(tires, distance){
        let tempTires = Array.from(tires).slice(0);
        
        let amountToReduce = parseFloat(distance) / 1000;

        let areTiresValid = Array.from(tempTires).some((tr) => {
            let newValue = parseFloat(tr) - parseFloat(amountToReduce);

            if (newValue < 0) {
                return false;
            } else {
                return true;
            }
        });

        return areTiresValid;
    }

    let backupTiresOutputDiv = sections[1].querySelectorAll("div")[0];
    let trucksOutputDiv = sections[1].querySelectorAll("div")[1];

    let trucks = [];
    let backupTires = [];

    let newTruckBtn = buttons[0];
    newTruckBtn.addEventListener("click", function(){
        let plateNumber = document.getElementById("newTruckPlateNumber").value;
        let tires = document.getElementById("newTruckTiresCondition").value.toString().trim().split(" ").filter(x => x);

        let truck = { 
            plateNumber : plateNumber, 
            tires : tires, 
            travelledDistance : 0
        };

        if(doesTruckExist(plateNumber, trucks) === false){
            let div = document.createElement("div");
            div.textContent = plateNumber;
            div.classList.add("truck");

            trucksOutputDiv.appendChild(div);

            trucks.push(truck);
        }
    });

    let newTiresBtn = buttons[1];
    newTiresBtn.addEventListener("click", function(){
        let tires = document.getElementById("newTiresCondition").value.toString().trim().split(" ").filter(x => x);
        backupTires.push(tires);
        
        let div = document.createElement("div");
        div.textContent = tires.join(" ");
        div.classList.add("tireSet");

        backupTiresOutputDiv.appendChild(div);
    });

    let travelBtn = buttons[2];
    travelBtn.addEventListener("click", function(){
        let plateNumber = document.getElementById("workPlateNumber").value;
        let distance = parseInt(document.getElementById("distance").value);
        
        trucks = Array.from(trucks).map((tr) => {
            if(tr.plateNumber.toString() === plateNumber.toString()){
                let tiresEndure = canTiresEndure(tr.tires, distance);
                
                if(tiresEndure === true){
                    let newTires = reduceTiresQuality(tr.tires, distance);
                    tr.tires = newTires;
                    tr.travelledDistance += parseFloat(distance);
                } else {  
                    let tempArr = Array.from(backupTiresOutputDiv.children);

                    for(let index = 0; index < tempArr.length; index++){
                        let newSet = tempArr[index].textContent.split(" ");
                        let tiresEndure = canTiresEndure(newSet, distance);
                    
                        if(tiresEndure === true){
                            backupTiresOutputDiv.removeChild(tempArr[index]);
                            tr.tires = newSet;
                            tr.tires = reduceTiresQuality(tr.tires, distance);
                            tr.travelledDistance += parseFloat(distance);
                            break;
                        }
                        
                    }
                }
            }
            return tr;
        });
        
    });

    let endBtn = buttons[3];
    endBtn.addEventListener("click", function() {
        let outputTextArea = document.querySelector("textarea");
        Array.from(trucks).forEach((tr) => {
            outputTextArea.textContent += "Truck " + tr.plateNumber.toString() + " has traveled " + tr.travelledDistance.toString() + ".\n";
        });

        let backupTiresCount = backupTiresOutputDiv.children.length;
        outputTextArea.textContent += "You have " + backupTiresCount.toString() + " sets of tires left.\n";
    })
}