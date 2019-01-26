function solve() {
    let resultSpan = document.querySelector("#result");
    resultSpan.innerHTML = "";

    let arr = JSON.parse(document.querySelector("#arr").value);

    let tempArr = Array.from(arr).map(function(el, index, array){
      let copyArr = arr.slice(0);
      
      let tempArr = [];

      let lastElement = Number(copyArr.pop());
      
      let result = Number(el) * +array.length;
      tempArr.push(result);

      return tempArr;
    });

    Array.from(tempArr).forEach((el, index) => { 
      let resultSpan = document.querySelector("#result"); 
      let p = document.createElement("p"); p.innerHTML = index.toString() + " -&gt " + el.toString(); 
      resultSpan.appendChild(p); });

}