function subtract(){
    let resultDiv = document.querySelector("#result");
    
    let firstNumber = document.querySelector("#firstNumber").value;
    let secondNumber = document.querySelector("#secondNumber").value;

    let result = parseFloat(firstNumber) - parseFloat(secondNumber);
    resultDiv.textContent = result;
}