(function solve(){
    let suits = {
        SPADES: "\u2660",
        HEARTS: "\u2665",
        CLUBS: "\u2663",
        DIAMONDS :"\u2666"
    };

    function isSuitValid(inputSuit){
        return Object.values(suits).some((s) => s === inputSuit);
    }

    let cardClass = class Card{
        constructor(face, suit){
            let validFaces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
            let suitValid = isSuitValid(suit);

            if(!validFaces.includes(face) || !suitValid){
                throw new Error();
            }
            this._face = face;
            this._suit = suit;
        }

        get suit(){
            return this._suit;
        }

        set suit(val){
            this._suit = val;
            return val;
        }

        get face(){
            return this._face;
        }

        set face(val){
            this._face = val;
            return val;
        }
    };

    return {
        Suits: suits,
        Card: cardClass
    }
})();
