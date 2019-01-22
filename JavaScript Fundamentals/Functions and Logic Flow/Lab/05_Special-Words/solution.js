function solve() {
  let resultSpan = document.querySelector("#result");

  let firstNumber = document.querySelector("#firstNumber").value;
  let secondNumber = document.querySelector("#secondNumber").value;

  let firstString = document.querySelector("#firstString").value;
  let secondString = document.querySelector("#secondString").value;
  let thirdString = document.querySelector("#thirdString").value;

  function IsMultipleOfThree(num){
    let result = +num % 3 === 0;;
    
    return result;
  }

  function IsMultipleOfFive(num){
    let result = +num % 5 === 0;;
    
    return result;
  }

  function CategorizeStrings(firstNum, secondNum, firstStr, secondStr, thirdStr){
    for(i=+firstNum; i<=+secondNum; i++){
      let paragraph = document.createElement("p");
      
      if(IsMultipleOfFive(i) && IsMultipleOfThree(i)){
        paragraph.innerHTML = i.toString() + " " + firstStr + "-" + secondStr + "-" + thirdStr;
        resultSpan.appendChild(paragraph);
        continue;
      }
      
      if(IsMultipleOfFive(i)){
        paragraph.innerHTML = i.toString() + " " + thirdStr;
        resultSpan.appendChild(paragraph);
        continue;
      }
      
      if(IsMultipleOfThree(i)){
        paragraph.innerHTML = i.toString() + " " + secondStr;
        resultSpan.appendChild(paragraph);
        continue;
      }
      
      paragraph.innerHTML = i.toString();
      resultSpan.appendChild(paragraph);
    }
  }

  CategorizeStrings(firstNumber, secondNumber, firstString, secondString, thirdString);
}