function solve() {
  let resultSpan = document.querySelector("#result");

  let number = document.querySelector("#num1").value;
  let type = document.querySelector("#type").value;

  function Convert(num, type){
    switch(type.toLowerCase()){
      case "celsius":{
        let result = (+num * 1.8) + 32;
        resultSpan.innerHTML = Math.round(result);
      }break;
      case "fahrenheit":{
        let result = (+num - 32) / 1.8;
        resultSpan.innerHTML = Math.round(result);
      }break;
      default:{
        resultSpan.innerHTML = "Error!";
      }break;
    }
  }

  Convert(number, type);
}