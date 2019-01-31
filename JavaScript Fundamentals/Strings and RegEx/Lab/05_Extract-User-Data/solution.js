function solve() {
  let resultSpan = document.getElementById("result");

  let inputArr = JSON.parse(document.getElementById("arr").value);

  let pattern = new RegExp(/^([A-Z]{1}[a-z]* [A-Z]{1}[a-z]*) (\+359-[0-9]{1}-[0-9]{3}-[0-9]{3}|\+359 [0-9]{1} [0-9]{3} [0-9]{3}) ([a-z]+@[a-z]+\.[a-z]{2,3})$/);

  function appendValidInput(element, resultSpan, pattern){
    let fullMatch = pattern.exec(element.toString());
  
    let name = fullMatch[1].toString();
    let number = fullMatch[2].toString();
    let email = fullMatch[3].toString();

    let nameParagraph = document.createElement("p");
    nameParagraph.textContent = "Name: " + name;

    resultSpan.appendChild(nameParagraph);

    let numberParagraph = document.createElement("p");
    numberParagraph.textContent = "Phone Number: " + number;

    resultSpan.appendChild(numberParagraph);

    let emailParagraph = document.createElement("p");
    emailParagraph.textContent = "Email: " + email;

    resultSpan.appendChild(emailParagraph);
  }

  function appendInvalidInput(resultSpan){
    let firstParagraph = document.createElement("p");
    firstParagraph.textContent = "Invalid data"

    resultSpan.appendChild(firstParagraph);
  }

  Array.from(inputArr).forEach(function(element){
    let match = pattern.test(element.toString());
    let lastParagraph = document.createElement("p");
    lastParagraph.textContent = "- - -";
    
    if(match){
      appendValidInput(element, resultSpan, pattern);

    } else {
      appendInvalidInput(resultSpan);
    }

    resultSpan.appendChild(lastParagraph);
  });
}