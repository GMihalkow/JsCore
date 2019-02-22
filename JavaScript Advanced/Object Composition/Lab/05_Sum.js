function solve(){
    let resultObj = {
        selector1:"",
        selector2: "",
        resultSelector: "",
        init: function(selector1, selector2, resultSelector){
            this.selector1 = selector1;
            this.selector2 = selector2;
            this.resultSelector = resultSelector;
        },
        add: function(){
            let firstElement = document.querySelector(this.selector1).value;
            let secondElement = document.querySelector(this.selector2).value;
            let resultNum = parseFloat(firstElement) + parseFloat(secondElement);

            let resultElement = document.querySelector(this.resultSelector);
            resultElement.value = resultNum;
        },
        subtract: function(){
            let firstElement = document.querySelector(this.selector1).value;
            let secondElement = document.querySelector(this.selector2).value;
            let resultNum = parseFloat(firstElement) - parseFloat(secondElement);

            let resultElement = document.querySelector(this.resultSelector);
            resultElement.value = resultNum;
        }
    }

    return resultObj;
}
