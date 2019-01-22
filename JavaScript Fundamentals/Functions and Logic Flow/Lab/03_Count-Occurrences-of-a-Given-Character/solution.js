function solve() {
  let resultSpan = document.querySelector("#result");

  let string = document.querySelector("#string").value;
  let charToLookFor = document.querySelector("#character").value;

  function CalculateResult(count, char){
    if(count > 0){
      if(+count % 2 === 0)
      {
        return "Count of " + char.toString() + " is even.";
      }
      else{
        return "Count of " + char.toString() + " is odd.";
      }
    }
  }

  function CountOccurences(text, char){
    let counter = 0;

    let charArr = text.toString().split("");
    for(i=0; i<charArr.length; i++){
      if(charArr[i].toString() === char.toString()){
        counter++;
      }
    }
    resultSpan.textContent = CalculateResult(counter, char);
  }

  CountOccurences(string, charToLookFor);
}