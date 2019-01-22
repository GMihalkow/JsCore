function solve() {
  let resultSpan = document.querySelector("#result");

  let text = document.querySelector("#string").value;

  function IsCharWhiteSpace(char){
    if(char === " "){
      return true;
    }
    else{
      return false;
    }
  }

  function ExtractUniqueCharacters(text){
    let encounteredChars = [];

    let filteredText = [];

    for(i=0; i<text.length; i++){
      if(!IsCharWhiteSpace(text[i])){
        if(!encounteredChars.includes(text[i])){
          filteredText.push(text[i]);
          encounteredChars.push(text[i]);
        }
      }
      else{
        filteredText.push(text[i]);
      }
    }

    let result = filteredText.join("");
    
    return result;
  }

  resultSpan.textContent = ExtractUniqueCharacters(text);
}