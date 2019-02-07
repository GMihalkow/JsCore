function solve() {
  let inputArr = JSON.parse(document.getElementById("arr").value);
  let resultSpan = document.getElementById("result");

  let counterObj = { cut: 0, etch: 0, xRay: 0, lap: 0, grind:0, polish: 0};

  function cut(num, desiredThickness, cuts){
    let tempValue = num;
    while((num / 4) >= desiredThickness || (num / 4) === (desiredThickness - 1)){
      num = (num / 4);
      cuts++;
    }

    if(tempValue !== num){
      let actionParagraph = document.createElement("p");
      actionParagraph.textContent = "Cut x" + cuts.toString();
      resultSpan.appendChild(actionParagraph);
      
      num = polish(num);
    }

    let resultObj = { resultNum: num, actionsCount: cuts };

    return resultObj;
  }

  function lap(num, desiredThickness, laps){
    let tempValue = num;
    while((num * 0.8) >= desiredThickness || (num * 0.8) === desiredThickness - 1){
      num = (num * 0.8);
      laps++;
    }
    
    if(tempValue !== num){
      let actionParagraph = document.createElement("p");
      actionParagraph.textContent = "Lap x" + laps.toString();
      resultSpan.appendChild(actionParagraph);
      
      num = polish(num);
    }

    let resultObj = { resultNum: num, actionsCount: laps };

    return resultObj;
  }

  function xRay(num, desiredThickness, xRays){
    let tempValue = num;
    if((num + 1) === desiredThickness && xRays === 0){
      num++;
      xRays++;
    }

    if(tempValue !== num){
      let actionParagraph = document.createElement("p");
      actionParagraph.textContent = "X-ray x" + xRays.toString();
      resultSpan.appendChild(actionParagraph);
      
    }

    let resultObj = { resultNum: num, actionsCount: xRays };

    return resultObj;
  }

  function etch(num, desiredThickness, etchs){
    let tempValue = num;
    while((num - 2) >= desiredThickness || (num - 2) === desiredThickness - 1){
      num = (num - 2);
      etchs++;
    }

    if(tempValue !== num){
      let actionParagraph = document.createElement("p");
      actionParagraph.textContent = "Etch x" + etchs.toString();
      resultSpan.appendChild(actionParagraph);
      
      num = polish(num);
    }

    let resultObj = { resultNum: num, actionsCount: etchs };

    return resultObj;
  }

  function grind(num, desiredThickness, grinds){
    let tempValue = num;
    while((num - 20) >= desiredThickness || (num - 20) === desiredThickness - 1){
      num = (num - 20);
      grinds++;
    }
    
    if(tempValue !== num){
      let actionParagraph = document.createElement("p");
      actionParagraph.textContent = "Grind x" + grinds.toString();
      resultSpan.appendChild(actionParagraph);
      
      num = polish(num);
    }

    let resultObj = { resultNum: num, actionsCount: grinds };

    return resultObj;
  }

  function polish(num){
    let paragraph = document.createElement("p");
    paragraph.textContent = "Transporting and washing";
    resultSpan.appendChild(paragraph);

    return Math.floor(num);
  }

  let desiredThickness = parseInt(inputArr.shift());

  Array.from(inputArr).forEach((num) => {
    let tempNumber = parseFloat(num);

    let counter = 0;

    let firstParagraph = document.createElement("p");
    firstParagraph.textContent = "Processing chunk " + num.toString() + " microns";
    resultSpan.appendChild(firstParagraph);

    while(tempNumber > desiredThickness || tempNumber === (desiredThickness - 1)){
      if(counter >= 100){
        break;
      }
      counter++;

      let resultCutObj = cut(tempNumber, desiredThickness, counterObj.cut);
      counterObj.cut = resultCutObj.actionsCount;
      if(tempNumber !== resultCutObj.resultNum){
        tempNumber = resultCutObj.resultNum;
        continue;
      }
      
      let resultLapObj = lap(tempNumber, desiredThickness, counterObj.lap);
      counterObj.lap = resultLapObj.actionsCount;
      if(tempNumber !== resultLapObj.resultNum){
        tempNumber = resultLapObj.resultNum;
        continue;
      }

      let resultGrindObj = grind(tempNumber, desiredThickness, counterObj.grind);
      counterObj.grind = resultGrindObj.actionsCount;
      if(tempNumber !== resultGrindObj.resultNum){
        tempNumber = resultGrindObj.resultNum;
        continue;
      }

      let resultEtchObj = etch(tempNumber, desiredThickness, counterObj.etch);
      counterObj.etch = resultEtchObj.actionsCount;
      if(tempNumber !== resultEtchObj.resultNum){
        tempNumber = resultEtchObj.resultNum;
        continue;
      }
      
      let resultXRayObj = xRay(tempNumber, desiredThickness, counterObj.xRay);
      counterObj.xRay = resultXRayObj.actionsCount;
      if(tempNumber !== resultXRayObj.resultNum){
        tempNumber = resultXRayObj.resultNum;
        continue;
      }
    }

    let lastParagraph = document.createElement("p");
    lastParagraph.textContent = "Finished crystal " + tempNumber.toString() + " microns";
    resultSpan.appendChild(lastParagraph);
    counterObj = { cut: 0, etch: 0, xRay: 0, lap: 0, grind:0, polish: 0};
    
  });
  
}
