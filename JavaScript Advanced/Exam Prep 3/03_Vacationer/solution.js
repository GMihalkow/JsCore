class Vacationer {
    constructor(fullName, creditCardInfo = [ 1111, "",  111 ]){
        this.fullName = fullName;
        this.addCreditCardInfo(creditCardInfo);
        this.wishList = [];
        this.idNumber = this.generateIDNumber();
    }

    get fullName(){
        return this._fullName;
    }

    set fullName(val){
        if(val.length !== 3){
            throw new Error("Name must include first name, middle name and last name");
        }

        let validNameRegex = new RegExp(/^[A-Z]{1}[a-z]+$/);

        let isValid = Array.from(val).every((n) => {
            return validNameRegex.test(n);
        });

        if(!isValid){
            throw new Error("Invalid full name");
        }

        this._fullName = { firstName: val[0], middleName: val[1], lastName: val[2] };
    }

    generateIDNumber(){
        //Formula
        // 231 * firstName’s first letter’s ASCII code + 139 * middleName length
        let firstName = this.fullName.firstName;
        let middleName = this.fullName.middleName;
        let lastName = this.fullName.lastName;

        let vowels = [ "a", "e", "o", "i", "u" ];
        
        let result = 231 * parseInt(firstName.charCodeAt(0)) + 139 * parseInt(middleName.length);

        let lastCharFromLastName = lastName[lastName.length - 1];

        let addAtEnd = 7;
        if(vowels.includes(lastCharFromLastName)){
            addAtEnd++;
        };

        result = result.toString();
        result += addAtEnd.toString();

        return result;
    }

    addCreditCardInfo(input){
        if(input.length < 3){
            throw new Error("Missing credit card information");
        }

        let inputCardNum = input[0];
        let inputExpirationDate = input[1];
        let inputSecurityNum = input[2];

        if(typeof(inputCardNum) !== "number" || typeof(inputSecurityNum) !== "number"){
            throw new Error("Invalid credit card details");
        }

        let result = {};

        result.cardNumber = inputCardNum;
        result.expirationDate = inputExpirationDate;
        result.securityNumber = inputSecurityNum;

        this.creditCard = result;
    }

    addDestinationToWishList(destination){
        let destinationExists = Array.from(this.wishList).some((dest) => dest === destination);
        if(destinationExists){
            throw new Error("Destination already exists in wishlist");
        }

        this.wishList.push(destination);

        this.wishList = Array.from(this.wishList).sort((a, b) => a.length - b.length);
    }

    getVacationerInfo(){
        let wishListString = "";

        if(this.wishList.length === 0){
            wishListString = "empty";
        } else {
            wishListString = this.wishList.join(", ");
        }

        // “Name: {firstName} {middleName} {lastName}
        // ID number: {idNumber}
        // Wishlist: 
        // empty/destinations, joined with ‘, ’
        // Credit Card:
        // Card Number: {cardNumber}
        // Expiration Date: {expirationDate}
        // Security Number: {securityNumber}”

        let result = "";
        result += "Name: " + this.fullName.firstName + " " + this.fullName.middleName + " " + this.fullName.lastName + "\n";
        result += "ID Number: " + this.idNumber + "\n";
        result += "Wishlist:\n" + wishListString + "\n";
        result += "Credit Card:\n";
        result += "Card Number: " + this.creditCard.cardNumber.toString() + "\n";
        result += "Expiration Date: " + this.creditCard.expirationDate + "\n";
        result += "Security Number: " + this.creditCard.securityNumber.toString() + "\n";

        return result.trim();
    }
}
