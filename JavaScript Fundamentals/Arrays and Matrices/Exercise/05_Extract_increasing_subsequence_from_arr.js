function solve(inputArr){
    let resultArr = Array.from(inputArr).filter(function(el, index, array){
        let tempArr = array.concat();
        let largestNumberSoFar = +tempArr.slice(0, index).sort((a,b) =>{ return b-a; })[0];
       
        let currentNumber = +array[index];
        let previousNumber = +array[index-1];
        
        if(previousNumber.toString() === "NaN"){
            return true;
        }
        
        return currentNumber >= previousNumber && currentNumber >= largestNumberSoFar;
    }).forEach((el) => {console.log(el);});
}