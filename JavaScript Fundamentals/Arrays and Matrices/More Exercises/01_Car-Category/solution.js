function solve() {
  let resultSpan = document.getElementById("result");

  let arr = JSON.parse(document.getElementById("arr").value);

  let resultObj = {};
  
  let bulgarianArmyRegex = new RegExp(/^BA [0-9]{3} [0-9]{3}$/);
  let civilProtectionRegex = new RegExp(/^CP [0-9]{2} [0-9]{3}$/);
  let diplomaticRegex = new RegExp(/^C [0-9]{4}|CT [0-9]{4}$/);
  let foreignersRegex = new RegExp(/^XX [0-9]{4}$/);
  let transientArmyRegex = new RegExp(/^[0-9]{3} \w{1} [0-9]{3}$/);
  let sofiaRegex = new RegExp(/^CA [0-9]{4} \w{1,2}|C [0-9]{4} \w{1,2}|CB [0-9]{4} \w{1,2}$/);
  let provinceRegex = new RegExp(/^(?!(?:CA|CB|C|CT))\w{1,2} [0-9]{4} \w{1,2}$/);

  function ValidateNumber(number){
    let str;

    if(bulgarianArmyRegex.test(number)){
      str = "BulgarianArmy : " + number.toString();
    }
    else if(civilProtectionRegex.test(number)){
      str = "CivilProtection : " + number.toString();
    }
    else if(sofiaRegex.test(number)){
      str = "Sofia : " + number.toString();
    }
    else if(provinceRegex.test(number)){
      str = "Province : " + number.toString();
    }
    else if(foreignersRegex.test(number)){
      str = "Foreigners : " + number.toString();
    }
    else if(transientArmyRegex.test(number)){
      str = "Transient : " + number.toString();
    }
    else if(diplomaticRegex.test(number)){
      str = "Diplomatic : " + number.toString();
    }
    else{
      str = "Other : " + number.toString();
    }

    return JSON.stringify(str);
  }

  Array.from(arr).forEach(function(el, index){
    let splitElementInfo = el.split(" ");

    let result = ValidateNumber(el).split(" : ");
    
    let categorie = result[0].slice(1);
    
    let number = result[1].slice(0, result[1].length - 2);
    
    if(typeof(resultObj[categorie]) === "undefined"){
      resultObj[categorie] = 1
    } else {
      resultObj[categorie]++; 
    }
  });

  resultObj = Object.keys(resultObj)
  .sort((a, b) => { return resultObj[b] - resultObj[a];})
  .sort()
  .map((a) => { let test = {}; test[a] = resultObj[a]; return test;});
  
  console.log(resultObj);
  Object.keys(resultObj).forEach(function (a){
    let obj = resultObj[a];
    Object.keys(obj).forEach(function(a){
      let paragraph = document.createElement("p");
      paragraph.textContent = a.toString() + " -> " + obj[a].toString();

      resultSpan.appendChild(paragraph);
    });
  });
}