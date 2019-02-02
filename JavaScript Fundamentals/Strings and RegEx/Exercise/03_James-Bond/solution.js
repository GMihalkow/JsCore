function solve() {
  let inputText = JSON.parse(document.getElementById("arr").value);

  let messagePattern = new RegExp(/([!%$#A-Z]{8,})/);

  let key = inputText.shift();

  let keyPattern = /^([A-Za-z]+)$/;

  let pattern = new RegExp(`(^|[ ])(${key})[ ]+([!%$#A-Z]{8,})(\\.|[ ]|\\,|$)`, "gi");
  if(keyPattern.test(key)){
    inputText = Array.from(inputText).map((line) => {
      let matches = line.match(pattern);
      if(!matches){
        return line;
      }
      let newMatches = Array.from(matches).map(
        (el) => 
        { 
          let splitWord = el.trim().split(" ");
          let oldMsg = splitWord[1].toString();
          console.log(oldMsg);
          let msg = oldMsg;
          
          if(messagePattern.test(msg) && 
              (splitWord[0].toString().toLowerCase() 
              === 
              key.toString().toLowerCase())){

            msg = msg.split("");
            msg = Array.from(msg).map(function(letter,index){
              if(letter.toString() === "!"){
                return "1";
              } else if(letter.toString() === "%"){
                return "2";
              } else if(letter.toString() === "#"){
                return "3";
              } else if(letter.toString() === "$"){
                return "4";
              } else if(msg.join("").charCodeAt(index) >= 65 && msg.join("").charCodeAt(index) <= 90){
                return letter.toLowerCase();
              } else{
                return letter;
              }
            }).join("");
            
            console.log("before: " + el);
            el = el.replace(oldMsg.toString(), msg.toString());
            console.log("after: " + el);
            return el;
          }

          return el;
        });
      
        newMatches
        .forEach((m, i) => 
        {
           line = line.replace(matches[i].toString(), newMatches[i].toString());
        });

        return line;
      });
      
    let resultSpan = document.getElementById("result");
    Array.from(inputText).forEach((line) => {
      let paragraph = document.createElement("p");
      paragraph.textContent = line.toString();
      resultSpan.appendChild(paragraph);
    });
  }
}