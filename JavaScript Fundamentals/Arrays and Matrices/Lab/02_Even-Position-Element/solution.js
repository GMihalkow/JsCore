function solve() {
  let resultSpan = document.querySelector("#result");
  
  let arr = JSON.parse(document.querySelector("#arr").value);

  let resultArr = [];
  Array.from(arr).forEach(function(el, index){
    if(+index % 2 === 0){
      resultArr.push(el);
    }
  });

  resultSpan.textContent = resultArr.join(" x ");
}