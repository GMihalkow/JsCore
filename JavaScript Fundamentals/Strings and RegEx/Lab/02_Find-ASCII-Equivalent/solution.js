function solve() {
  let resultSpan = document.getElementById("result");

  let input = document.getElementById("str").value.split(" ");

  let numbers = Array.from(input).filter((element) => { return +element; });
  let words = Array.from(input).filter((element) => { return isNaN(element);});
  
  Array.from(words)
  .forEach((element) => {
    let paragraph = document.createElement("p");

      Array.from(element.split(""))
        .forEach((char, index) => {
          if(index === (+element.length - 1)){
            paragraph.textContent += element.charCodeAt(index).toString(); 
          }
          else{
            paragraph.textContent += element.charCodeAt(index).toString() + " ";  
          }
        }); 
    
      resultSpan.appendChild(paragraph);
    });

  let secretWord = Array.from(numbers).map((el) => {return String.fromCharCode(+el)}).join("").toString();
  
  let lastParagraph = document.createElement("p");
  lastParagraph.textContent = secretWord;  

  resultSpan.appendChild(lastParagraph);
}
