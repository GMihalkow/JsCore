function solve() {
  let resultSpan = document.getElementById("result");

  let input = document.getElementById("str").value.toString().split("");

  let sum = Array.from(input).reduce((sum, el) => sum += +el, 0);
  while(+sum >= 10){
    sum = +Array.from(sum.toString().split("")).reduce((sum, el) => sum += +el, 0);
  }
  let neededLength = sum;
    
  let parts = [];

  function partsOfEight(el, index){
    if(index <= +7){
      return el;
    }
    else{
    }
  }

  function filterNumbers(el, index, neededLength){
    if(index < +neededLength){

    }
    else{
      return el;
    }
  }

  let stringParsedInput = input.join("").toString();

  let tempInput = stringParsedInput.slice(0);

  tempInput = Array.from(tempInput.split(""))
  .map((el, index) => filterNumbers(el, index, +neededLength))
  .filter((el) => !isNaN(el))
  .reverse()
  .map((el,index) => filterNumbers(el, index, +neededLength))
  .filter((el) => !isNaN(el))
  .reverse()
  .join("")
  .toString();

  while(+tempInput.length > 0){
    let part = Array.from(tempInput.split(""))
      .map((el,index) => partsOfEight(el, index))
      .join("").toString();

    parts.push(part);

    tempInput = Array.from(tempInput.split(""))
    .map((el, index) => filterNumbers(el, index, 8))
    .filter((el) => !isNaN(el))
    .join("")
    .toString();
  }

  let result = 
    parts
    .filter((el) => {
      let asciiNum = parseInt(el,2);
      return +asciiNum === 32 
      || 
      (+asciiNum >= 65 && +asciiNum <= 90) 
      ||
      (+asciiNum >= 97 && +asciiNum <= 122); 
    })
    .map((el) => { return parseInt(el, 2)})
    .map((el) => { return String.fromCharCode(+el)})
    .join("")
    .toString();

  resultSpan.textContent = result;
}