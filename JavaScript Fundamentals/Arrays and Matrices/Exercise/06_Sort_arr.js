function solve(inputArr){
     Array.from(inputArr)
     .sort((a,b) => { 
            let lengthComparison = +a.length - +b.length;
            let asc = a.toLowerCase() >= b.toLowerCase();
            return lengthComparison ? lengthComparison : asc;
         })
     .forEach((el) => { console.log(el)});
}