function solve() {
  let resultSpan = document.getElementById("result");

  let text = document.getElementById("str1").value;
  
  let casing = document.getElementById("str2").value;

  switch(casing){
    case "Camel Case":{
      let resultText = convertToCamel(text);
      resultSpan.textContent = resultText;
    }break;
    case "Pascal Case":{
      let resultText = convertToPascal(text);
      resultSpan.textContent = resultText;
    }break;
    default: resultSpan.textContent = "Error!";
      break;
  }

  function convertToCamel(text){
    let tempText = text.split(" ");

    tempText = Array.from(tempText).map((el, index) => {
      let tempWord = el;
      tempWord = tempWord.toLowerCase();

      if(index === 0){
        return tempWord;
      }
      else{
        tempWord = tempWord.split("").map((char, i) => {if(i=== 0){ return char.toUpperCase();} else{return char;}});
        return tempWord.join("");
      }
    });

    tempText = tempText.join("");

    return tempText;
  }

  function convertToPascal(text){
    let tempText = text.split(" ");

    tempText = Array.from(tempText).map((el, index) => {
      let tempWord = el;
      tempWord = tempWord.toLowerCase();

      tempWord = tempWord.split("").map((char, i) => {if(i=== 0){ return char.toUpperCase();} else{return char;}});
      return tempWord.join("");
      });

    tempText = tempText.join("");

    return tempText;
  }
}