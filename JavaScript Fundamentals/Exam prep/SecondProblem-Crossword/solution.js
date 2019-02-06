function solve() {
   let outputParagraph = document.querySelector("#output p");

   let input = document.querySelector("input[type=text]");
   
   let buttons = document.querySelectorAll("button");

   function clearSelectedOptions(options, neededOption){
      let tempOptions = Array.from(options).slice(0); 
      Array.from(tempOptions).forEach((opt) => {
         if(opt.value === neededOption){
            opt.selected = true;
         } else {
            opt.selected = false;
         }
      });
   }

   function isLetterUppercase(letter){
      let asciiNumber = parseInt(letter.charCodeAt(0));
      if(asciiNumber >= 65 && asciiNumber <= 90){
         return true;
      } else {
         return false;
      }
   }

   function isLetterADigit(letter){
      let num = parseInt(letter);
      if(num.toString() !== "NaN"){
         return true;
      }
      return false;
   }

   function getSelectedOption(options){
      let selectedOption = Array.from(options).find((e) => 
      { 
         return e.selected;
      });

      console.log("The selected option is: " + selectedOption.value.toString());
      return selectedOption.value;
   }

   let secondaryFilterSelect = document.getElementById("filterSecondaryCmd");
   secondaryFilterSelect.addEventListener("change", function(e){
      this.selected = true;   
      clearSelectedOptions(secondaryFilterSelect.children, this.value);
   }, false);

   let secondarySortSelect = document.getElementById("sortSecondaryCmd");
   secondarySortSelect.addEventListener("change", function(e){
      this.selected = true;   
      clearSelectedOptions(secondarySortSelect.children, this.value);
   }, false);

   let filterBtn = buttons[0];
   filterBtn.addEventListener("click", function(){
      let inputText = input.value;
      let filterNumber = document.getElementById("filterPosition").value;
      let option = getSelectedOption(secondaryFilterSelect.children);
      
      switch(option){
         case "uppercase":{
            let neededLetter = Array.from(inputText.split(""))
            .map((letter) => {
               if(isLetterUppercase(letter)){
                  return letter;
               }
            })
            .filter(x => x)
            .find((letter, index) => {
               if((parseInt(index) + 1) === parseInt(filterNumber)){
                  return true;
               }
            });

            outputParagraph.textContent += neededLetter;
         }break;
         case "lowercase":{
            let neededLetter = Array.from(inputText.split(""))
            .map((letter) => {
               if(isLetterUppercase(letter) === false){
                  return letter;
               }
            })
            .filter(x => x)
            .find((letter, index) => {
               if((parseInt(index) + 1) === parseInt(filterNumber)){
                  return true;
               }
            });
            
            outputParagraph.textContent += neededLetter;
         }break;
         case "nums":{
            let neededLetter = Array.from(inputText.split(""))
            .map((letter) => {
               if(isLetterADigit(letter)){
                  return letter;
               }
            })
            .filter(x => x)
            .find((letter, index) => {
               if((parseInt(index) + 1) === parseInt(filterNumber)){
                  return true;
               }
            });

            outputParagraph.textContent += neededLetter;
         }break;
      }

      input.value = "";
      
   });

   let sortBtn = buttons[1];
   sortBtn.addEventListener("click", function(){
      let inputText = input.value;
      let sortPosition = document.getElementById("sortPosition").value;
      let option = getSelectedOption(secondarySortSelect.children);

      switch(option){
         case "A":{
            let neededLetter = Array.from(inputText)
            .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
            .filter(x => x)
            .find((letter, index) => {
               console.log(letter);
               if((parseInt(index) + 1) === parseInt(sortPosition)){
                  return true;
               }
            });

            outputParagraph.textContent += neededLetter;
         }break;
         case "Z":{
            let neededLetter = Array.from(inputText)
            .sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0))
            .filter(x => x)
            .find((letter, index) => {
               console.log(letter);
               if((parseInt(index) + 1) === parseInt(sortPosition)){
                  return true;
               }
            });

            outputParagraph.textContent += neededLetter;
         }break;
      }

      input.value = "";
   });

   let rotateBtn = buttons[2];
   rotateBtn.addEventListener("click", function(){
      let inputText = input.value;
      let rotatePosition = parseInt(document.getElementById("rotatePosition").value);
      let rotatesCount = parseInt(document.getElementById("rotateSecondaryCmd").value);

      for (let index = 0; index < rotatesCount; index++) {
         inputText = inputText.split("");
         
         let newFirstElement = inputText.pop();
         inputText.unshift(newFirstElement);
         
         inputText = inputText.join("");
      }

      let neededLetter = inputText[rotatePosition-1];

      outputParagraph.textContent += neededLetter.toString();

      input.value = "";
   });


   let getBtn = buttons[3];
   getBtn.addEventListener("click", function(){
      let inputText = input.value;
      let getPosition = parseInt(document.getElementById("getPosition").value);

      let neededLetter = inputText[getPosition - 1];

      outputParagraph.textContent += neededLetter.toString();

      input.value = "";
   });

}