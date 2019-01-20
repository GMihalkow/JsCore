function solve() {
    function EvaluateExpression(exp){
        let expressionParameters = exp.split(" ");
        console.log(expressionParameters);

        let leftNum = expressionParameters[0];
        let operator = expressionParameters[1];
        let rightNum = expressionParameters[2];

        if((operator == "+" || operator == "/" || operator == "*" || operator == "-") && leftNum != "" && rightNum != ""){
            console.log("HIT");
            return eval(exp);
        }
        else{
            return "NaN";
        }

    }

    let calculatorBtns = document.querySelectorAll("button");
    
    let expressionField = document.getElementById("expressionOutput");
    let resultField = document.getElementById("resultOutput");

    let clearBtn = calculatorBtns[0];
    clearBtn.addEventListener("click", function() {
        expressionField.textContent = "";
        resultField.textContent = "";
    });
        
    let equalsBtn = calculatorBtns[14];
    equalsBtn.addEventListener("click", function() {
        resultField.textContent += EvaluateExpression(expressionField.textContent);

    });

    for(i=0; i<calculatorBtns.length; i++){
        if(i === 0 || i === 14){
            continue;
        }

        if(i === 1 || i === 2 || i === 3 || i === 7){
            let currentBtn = calculatorBtns[i];
            currentBtn.addEventListener("click", function(){
                expressionField.textContent += " " + currentBtn.value + " ";
            });
        }
        else{
            let currentBtn = calculatorBtns[i];
            currentBtn.addEventListener("click", function(){
                expressionField.textContent += currentBtn.value;
            });
        }
    }
}