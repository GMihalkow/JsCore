function solve() {
  function capitalFirstLetter(word){
    let tempWord = word.slice(0);

    tempWord = tempWord.split("").map((letter, index) => { 
      if(index === 0) {
         return letter.toUpperCase();
        } else {
          return letter;
        }
      }).join("");

    return tempWord;
  }

  function getChildInfo(name, ch){
    let splitChild = ch.textContent.split(": ");
    let childName = splitChild[0];
    let childValue = splitChild[1];

    if(childName.toLowerCase() === name){
      return childValue;
    }
  }

  function defineElementWithTextContent(text, key){
    let paragraphElement = document.createElement("p");
    let firstWord = capitalFirstLetter(key);
    if(key === "decFactor"){
      paragraphElement.textContent = "Decoration factor: " + text.toString();
    } else{
      paragraphElement.textContent = key.toString() + ": " + text.toString();
    }
    return paragraphElement;
  }

  let textAreas = document.querySelectorAll("textarea");
  let buttons = document.querySelectorAll("button");

  let furnitureListDiv = document.querySelector("div#furniture-list");

  let outputTextArea = textAreas[1];

  let boughtProductsObj = {};

  let generateBtn = buttons[0];
  generateBtn.addEventListener("click", function() {
    
  let inputTextArea = textAreas[0];
  let inputArr = JSON.parse(inputTextArea.value);

  Array.from(inputArr).forEach((element) => {
    let div = document.createElement("div");
    div.classList.add("furniture");

    Object.keys(element).forEach((key) => {
      if(key === "img"){
        let imgElement = document.createElement("img");
        imgElement.src = element[key];
        
        div.appendChild(imgElement);
      } else {
        let paragraphElement = defineElementWithTextContent(element[key], key);

        div.appendChild(paragraphElement);
      }
    });

    let checkBtn = document.createElement("input");
    checkBtn.type = "checkbox";
    
    div.appendChild(checkBtn);

    furnitureListDiv.appendChild(div);
    });
  });

  let decFactorsSum = 0;
  let decFactorsCount = 0;

  let buyBtn = buttons[1];
  buyBtn.addEventListener("click", function(){
    let furniture = document.querySelectorAll(".furniture");
    let selectedFurniture = Array.from(furniture).slice(0);
    selectedFurniture = Array.from(furniture).filter((f) => {
      return Array.from(f.children).some((ch) => {
        if(ch.type === "checkbox"){
          return ch.checked === true;
        } else {
          return false;
        }
      })
    });
    
    Array.from(selectedFurniture).forEach((f) => {
      let name = Array.from(f.children).map((ch) => getChildInfo("name", ch)).filter(x => x).toString();
      let price = Array.from(f.children).map((ch) => getChildInfo("price", ch)).filter(x => x).toString();
      let decFactor = Array.from(f.children).map((ch) => getChildInfo("decoration factor", ch)).filter(x => x).toString();
      
      decFactorsSum += parseFloat(decFactor);
      decFactorsCount++;

      if(boughtProductsObj[name] === undefined){
        boughtProductsObj[name] = price;
      } else {
        let futureSum = parseFloat(boughtProductsObj[name]) + parseFloat(price);
        boughtProductsObj[name] = futureSum;
      }
    });
    
    let products = Object.keys(boughtProductsObj).map((key) => { return key; });
    let totalPrice = 0;
    if(Object.values(boughtProductsObj).length === 1){
      totalPrice = parseFloat(Object.values(boughtProductsObj)[0]).toFixed(2);
    } else {
      totalPrice = Object.values(boughtProductsObj).reduce((sum, num) => parseFloat(sum) + parseFloat(num)).toFixed(2);
    }
    let averageDecFactor = parseFloat(decFactorsSum) / parseInt(decFactorsCount);
    
    outputTextArea.textContent += "Bought furniture: " + products.join(", ") + "\n";
    outputTextArea.textContent += "Total price: " + totalPrice.toString() + "\n";
    outputTextArea.textContent += "Average decoration factor: " + averageDecFactor.toString();
  });

}