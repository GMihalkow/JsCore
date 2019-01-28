function solve(inputArr){
    let step = inputArr.pop();
    Array.from(inputArr).forEach((el, index) => { if(index % +step === 0) { console.log(el.toString()) }});
}