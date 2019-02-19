class CheckingAccount{
    constructor(clientId, email, firstName, lastName){
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.products = [];
    }

    get lastName(){
        return this._lastName;
    }

    set lastName(val){
        if(val.length < 3 || val.length > 20){
            throw new TypeError("Last name must be between 3 and 20 characters long");
        }
        let allowedCharactersRegex = /^[A-Za-z]+$/;
        if(!(allowedCharactersRegex.test(val))){
            throw new TypeError("Last name must contain only Latin characters");
        }

        this._lastName = val;
        return val; 
    }

    get firstName(){
        return this._firstName;
    }

    set firstName(val){
        if(val.length < 3 || val.length > 20){
            throw new TypeError("First name must be between 3 and 20 characters long");
        }
        let allowedCharactersRegex = /^[A-Za-z]+$/;
        if(!(allowedCharactersRegex.test(val))){
            throw new TypeError("First name must contain only Latin characters");
        }

        this._firstName = val;
        return val; 
    }

    get email(){
        return this._email;
    }

    set email(val){
        let emailRegex = /^[a-zA-Z0-9]+\@[a-zA-Z0-9\.]+$/;

        if(emailRegex.test(val)){
            this._email = val;
            return val;
        } 
        throw new TypeError("Invalid e-mail");
    }

    get clientId(){
        return this._clientId;
    }

    set clientId(val){
        let idRegex = /^[0-9]{6}$/;
        if(idRegex.test(val)){
            this._clientId = val;
            return val;
        }
        throw new TypeError("Client ID must be a 6-digit number");
    }

}
