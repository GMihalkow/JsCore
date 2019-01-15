function ConcatNumbers(num){
    let result = "";
    for(i=1; i<=+num; i++){
        result+=i.toString();
    }
    
    return result;
}

console.log(ConcatNumbers(10));