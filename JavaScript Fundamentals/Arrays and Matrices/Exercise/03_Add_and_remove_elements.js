function solve(inputArr){
    let initialNumber = 0;

    let arr = [ ];

    Array.from(inputArr).forEach(function(el){
        +initialNumber++;
        if(el === "add"){
            arr.push(+initialNumber);
        }
        else if(el === "remove"){
            arr.pop();
        }
        else{

        }
    });

    if(+arr.length === 0){
        console.log("Empty");
    }
    else{
        Array.from(arr).forEach((el) => {console.log(el)});
    }
}