function solve() {
  let resultSpan = document.querySelector("#result");

  let num = document.querySelector("#num").value;
  let arr = JSON.parse(document.querySelector("#arr").value);
  
  let resultArr = Array.from(arr).map(function(el, index, array){
    let tempArr = [];
    let elIndex = el.toString().indexOf(num);
    if(elIndex >= 0){
      tempArr.push("true -> " + elIndex.toString());
    }
    else{
      tempArr.push("false -> -1");
    }

    return tempArr;
  });

  resultSpan.innerHTML = resultArr.join(",");
}