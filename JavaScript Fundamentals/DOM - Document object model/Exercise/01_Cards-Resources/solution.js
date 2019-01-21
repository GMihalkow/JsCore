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

    function AppendResult(){    
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

     function CardAction(currentCard, playerDiv) {
        currentCard.addEventListener("click", function(){
                
            currentCard.setAttribute("src", "images/whiteCard.jpg");

            let cardName = currentCard.getAttribute("name");
        
            if(playerDiv.getAttribute("id") == "player1Div"){
                player1CurrentCard = currentCard;
                leftCard = cardName.toString();
                leftSpan.textContent = cardName;    
            }
            else{
                player2CurrentCard = currentCard;
                rightCard = cardName.toString();
                rightSpan.textContent = cardName;
            }

            if(leftSpan.textContent != "" && rightSpan.textContent != ""){
                AppendResult();
            }
        
       })
    }

    let playerOneCards = Array.from(document.getElementById("player1Div").children).forEach((currentCard) => {
        let player1Div = document.getElementById("player1Div");
        CardAction(currentCard, player1Div);
    });

    let playerTwoCards = Array.from(document.getElementById("player2Div").children).forEach( (currentCard) => {
        let player2Div = document.getElementById("player2Div");
        CardAction(currentCard, player2Div);
    });
}
