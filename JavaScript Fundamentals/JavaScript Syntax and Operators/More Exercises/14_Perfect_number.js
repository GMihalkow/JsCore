function FindPerfectNumbers(inputArr){
    let perfectNumbers = [];

    function isPerfect(number)
    {
    var temp = 0;
       
        for(var i=1;i<=number/2;i++)
         {
             if(number%i === 0)
              {
                temp += i;
              }
         }
       
         if(temp === number && temp !== 0)
         {
             return true;
         } 
         else
         {
             return false;
         }   
     } 

    for(i=0; i<inputArr.length; i++){
        if(isPerfect(inputArr[i]) == true){
            perfectNumbers.push(inputArr[i]);
        }
    }

    if(perfectNumbers.length > 0){
        return perfectNumbers.join(", ");
    }
    else{
        return "No perfect number";
    }
}

console.log(FindPerfectNumbers([5, 32, 82]));