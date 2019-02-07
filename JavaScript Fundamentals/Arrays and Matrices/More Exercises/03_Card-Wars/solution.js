function solve() {
  let inputArr = JSON.parse(document.getElementById("arr").value);
  
  function transformCard(card){
    let newValue = 0;
    
    switch(card){
      case "A": newValue = 14; break;
      case "K": newValue = 13; break;
      case "Q": newValue = 12; break;
      case "J": newValue = 11; break;
    }

    return newValue;
  }

  function transformCardBack(card){
    let newValue = "";
    
    switch(card){
      case 14: newValue = "A"; break;
      case 13: newValue = "K"; break;
      case 12: newValue = "Q"; break;
      case 11: newValue = "J"; break;
      default: newValue = card.toString(); break;
    }

    return newValue;
  }

  let firstPlayersHand = inputArr[0];
  let secondPlayersHand = inputArr[1];

  let maxRoundsCount = 20;
  let roundsCounter = 1;
  while(roundsCounter <= maxRoundsCount){
    if(firstPlayersHand.length === 0 || secondPlayersHand.length === 0){
      break;
    }
    let playerOneCard = firstPlayersHand.shift();
    
    if(playerOneCard === "K" || playerOneCard === "J" || playerOneCard === "A" || playerOneCard === "Q"){
      playerOneCard = parseInt(transformCard(playerOneCard));
    } else {
      playerOneCard = parseInt(playerOneCard);
    }

    let playerTwoCard = secondPlayersHand.shift();
    
    if(playerTwoCard === "K" || playerTwoCard === "J" || playerTwoCard === "A" || playerTwoCard === "Q"){
      playerTwoCard = parseInt(transformCard(playerTwoCard));
    } else {
      playerTwoCard = parseInt(playerTwoCard);
    }

    if(playerOneCard > playerTwoCard){
      playerOneCard = transformCardBack(playerOneCard);
      playerTwoCard = transformCardBack(playerTwoCard);
      firstPlayersHand.push(playerOneCard);
      firstPlayersHand.push(playerTwoCard);
    } else {
      playerOneCard = transformCardBack(playerOneCard);
      playerTwoCard = transformCardBack(playerTwoCard);
      secondPlayersHand.push(playerOneCard);
      secondPlayersHand.push(playerTwoCard);
    }

    roundsCounter++;
  }

  let resultSpan = document.getElementById("result");
  let p1Paragraph = document.createElement("p");
  p1Paragraph.textContent = "First -> " + firstPlayersHand.join (", ");
  resultSpan.appendChild(p1Paragraph);

  let p2Paragraph = document.createElement("p");
  p2Paragraph.textContent = "Second -> " + secondPlayersHand.join (", ");
  resultSpan.appendChild(p2Paragraph);
}