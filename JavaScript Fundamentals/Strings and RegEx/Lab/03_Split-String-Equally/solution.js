function solve() {
  let resultSpan = document.getElementById("result");

  let text = document.getElementById("str").value;
  let num = document.getElementById("num").value;

  let tempText = text.slice(0);

  let resultText = [];  
  let counter = 0;

  function appendRestOfText(secondPartLength, tempText){
    let localFuncText = tempText.slice(0);

    let firstPart = tempText.substr(0, +num);
    let secondPart = text.substr(0, +secondPartLength);
    
    localFuncText = tempText.replace(secondPart.toString(), "");
    // resultText.push(firstPart.toString() + secondPart.toString());

    localFuncText = localFuncText.replace(firstPart.toString(), "");
    
    return { text: localFuncText, part: firstPart.toString() + secondPart.toString() };
  }

  while(+tempText.length > 0){
    if(+num > +tempText.length){
      let secondPartLength = +num - +tempText.length;
     
      let result = appendRestOfText(secondPartLength, tempText);

      tempText = result.text;

      resultText.push(result.part);
      
      counter++;
      continue;
    }
    let substring = tempText.substr(0, +num);
    
    tempText = tempText.replace(substring.toString(), "");
    resultText.push(substring);
    counter++;
  }

  resultSpan.textContent = resultText.join(" ");
}