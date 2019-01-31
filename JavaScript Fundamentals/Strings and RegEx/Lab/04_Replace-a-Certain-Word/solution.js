function solve() {
  let resultSpan = document.getElementById("result");

  let inputArr = JSON.parse(document.getElementById("arr").value);
  let word = document.getElementById("str").value;

  let wordToReplace = inputArr[0].split(" ")[2].toString();

  let pattern = new RegExp(wordToReplace, "i");
  
  Array.from(inputArr).forEach(function(element){
    element = element.replace(pattern, word.toString());
    
    let paragraph = document.createElement("p");
    paragraph.textContent = element;

    resultSpan.appendChild(paragraph);
  });
}