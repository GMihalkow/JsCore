function solve(cards){
    let processedCards = [];

    function makeCard(face, suit){
        let validFaces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        let validSuits = { S:"\u2660", H:"\u2665", D:"\u2666", C:"\u2663" };
        if(!validFaces.includes(face.toString())){
            throw new Error("Error");
        } else if(!Object.keys(validSuits).includes(suit.toString())){
            throw new Error("Error");
        }

        return face + validSuits[suit];
    };

    Array.from(cards).forEach((input) => {
        let cardFace = "";
        let cardSuit = "";

        if(input.length == 3){
            cardFace = input.substr(0, 2);
            cardSuit = input.substr(2, 1);
        } else {
            cardFace = input.substr(0, 1);
            cardSuit = input.substr(1, 1);
        }

        try {
            let newCard = makeCard(cardFace, cardSuit);
            processedCards.push(newCard);
        } catch (error) {
            console.log("Invalid card: " + input);
        }
    });

    if(processedCards.length === cards.length){
        console.log(processedCards.join("\n"));
    }
}

solve(
    ['5S', '3D', 'QD', '1C']
);