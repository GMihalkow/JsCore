function solve() {
    let historyDiv = document.getElementById("history");

    let spans = document.querySelectorAll("span");

    let player1CurrentCard = "";
    let player2CurrentCard = "";

    let leftCard = "";

    let rightCard = "";

    let tempHistory = "";

    let leftSpan = spans[0];
    let rightSpan = spans[2];

    let playerOneCards = document.getElementById("player1Div").children;

    for(i=0; i<playerOneCards.length; i++){
        let currentCard = playerOneCards[i];
        
        currentCard.addEventListener("click", function () {
            currentCard.setAttribute("src", "images/whiteCard.jpg");
            player1CurrentCard = currentCard;

            let cardName = currentCard.getAttribute("name");
        
            leftCard = cardName.toString();
            
            leftSpan.textContent = cardName;

            if(leftSpan.textContent != "" && rightSpan.textContent != ""){
                leftSpan.textContent = "";
                rightSpan.textContent = "";

                if(+leftCard > +rightCard){
                    player1CurrentCard.style.border = "2px solid green";
                    player2CurrentCard.style.border = "2px solid darkred";
                }
                else{
                    player2CurrentCard.style.border = "2px solid green";
                    player1CurrentCard.style.border = "2px solid darkred";
                }

                setTimeout(() => {
                    leftSpan.textContent = "";
                    rightSpan.textContent = "";
                }, 2000);
                
                historyDiv.textContent += "[" + leftCard + " vs " + rightCard + "] ";
            }
        })

    }

    let playerTwoCards = document.getElementById("player2Div").children;

    for(i=0; i<playerTwoCards.length; i++){
        let currentCard = playerTwoCards[i];
        
        currentCard.addEventListener("click", function () {
            currentCard.setAttribute("src", "images/whiteCard.jpg");
            player2CurrentCard = currentCard;

            let cardName = currentCard.getAttribute("name");
            
            rightCard = cardName.toString();
            rightSpan.textContent = cardName;

            if(leftSpan.textContent != "" && rightSpan.textContent != "" ){
                leftSpan.textContent = "";
                rightSpan.textContent = "";
                
                if(+leftCard > +rightCard){
                    player2CurrentCard.style.border = "2px solid darkred";
                    player1CurrentCard.style.border = "2px solid green";
                }
                else{
                    player2CurrentCard.style.border = "2px solid green";
                    player1CurrentCard.style.border = "2px solid darkred";
                }

                setTimeout(() => {
                    leftSpan.textContent = "";
                    rightSpan.textContent = "";
                }, 2000);

                historyDiv.textContent += "[" + leftCard + " vs " + rightCard + "] ";
            }
        })

    }
    
}