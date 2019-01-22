function solve() {
    let resultSpan = document.querySelector("#result");
    resultSpan.innerHTML = "";

    let inputs = document.querySelectorAll("input");

    let num1Input = inputs[0];
    let num2Input = inputs[1];

    function MultiplyNumber(num, multiplier){
      for(i=+num; i<=+multiplier; i++){
        let multiplicationResult = i * +multiplier;

        let paragraph = document.createElement("p");
        let textResult = `${i} * ${+multiplier} = ${multiplicationResult}`;

        paragraph.innerHTML = textResult;

        resultSpan.appendChild(paragraph);
      }
    }

    function ValidateResult(num, multiplier){
      if((+num > +multiplier)){
        resultSpan.innerHTML = "Try with other numbers."
        return false;
      }
      else{
        return true;
      }
    }

    if(ValidateResult(num1Input.value, num2Input.value)){
      MultiplyNumber(num1Input.value, num2Input.value);
    }
}