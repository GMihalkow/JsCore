function solve() {
  let inputNumber = parseInt(document.getElementById("num").value);
  let resultSpan = document.getElementById("result");

  let asterixCount = 2;
  let dashesCount = 0;
  let letters = ["AT", "CG", "TT", "AG", "GG"];
  let bottonPart = false;

  let lettersIndex = 0;

  for (let index = 0; index < inputNumber; index++) {
    if(asterixCount === 0){
      bottonPart = true;
    } else if(asterixCount === 2){
      bottonPart = false;
    }
    
    let paragraph = document.createElement("p");
    paragraph.textContent += ("*".repeat(asterixCount) + letters[lettersIndex][0] + "-".repeat(dashesCount) + letters[lettersIndex][1] + "*".repeat(asterixCount));
    resultSpan.appendChild(paragraph);

    if(bottonPart === false){
      asterixCount--;
      dashesCount+=2
    } else {
      dashesCount-=2;
      asterixCount++;
    }

    lettersIndex++;
    if(lettersIndex >= letters.length){
      lettersIndex = 0;
    }
    
  }
}
