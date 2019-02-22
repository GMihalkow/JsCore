function solve(){
    let numbers = [0];
    function fibonacci(){    
        let numIndex = numbers.length - 1;
        
        if(numbers.length === 0){
            numIndex = 0;   
        }
        
        let previousNum1 = parseInt(numbers[numIndex - 1]);
        let previousNum2 = parseInt(numbers[numIndex]);

        if(isNaN(previousNum1)){
            previousNum1 = 1;
        }
        if(isNaN(previousNum2)){
            previousNum2 = 0;
        }
        
        let newNum = previousNum1 + previousNum2;
        numbers.push(newNum);

        return newNum;
    }
    return fibonacci;
}