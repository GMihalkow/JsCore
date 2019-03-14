class PaymentProcessor {
    constructor(options) {
        const defaultValue = {
                types: ["service", "product", "other"],
                precision: 2
            };
            
        this._options = {};
        this.payments = [];

        if(options == undefined){
            this._options.types = defaultValue.types;
            this._options.precision = defaultValue.precision;
        } else {
            if(options.types !== undefined 
                && options.precision !== undefined){
                    this.setOptions(options);
            } else if(options.types !== undefined 
                && options.precision === undefined){
                    this._options.precision = defaultValue.precision;         
                    this._options.types = options.types;
            } else{
                this._options.precision = options.precision;       
                this._options.types = defaultValue.types;         
            }
        }
    }

    get getOptions(){
        return this._options;
    }

    setOptions(options){
        if(options.types !== undefined && options.precision !== undefined){
            this._options = options;
        } else if(options.types !== undefined && options.precision === undefined){
            this._options.types = options.types;
        } else if(options.types === undefined && options.precision !== undefined){
            this._options.precision = options.precision;
        } else {
            throw new Error();
        }
    }

    registerPayment(id, name, type, value){
        if(typeof(id) !== "string" || typeof(name) !== "string" || typeof(type) !== "string" || typeof(value) !== "number"){
            throw new Error();
        }
        else{
            if(id.length < 1 || name.length < 1){
                throw new Error();
            }
        }

        let isIdFound = Array.from(this.payments).some((p) => p.id === id);
        if(isIdFound){
            throw new Error();
        }

        let isTypeValid = this.getOptions.types.includes(type);
        if(!isTypeValid){
            throw new Error();
        }

        let paymentObj = {
            id,
            name,
            type,
            value: parseFloat(value.toFixed(this.getOptions.precision))
        };

        this.payments.push(paymentObj);
    }

    deletePayment(id){
        let isIdFound = Array.from(this.payments).some((p) => p.id === id);
        if(isIdFound){
            let paymentIndex = Array.from(this.payments).indexOf((p) => p.id === id);
            this.payments.splice(paymentIndex, 1);
        } else{
            throw new Error("ID not found");
        }
    }

    get(id){
        let isIdFound = Array.from(this.payments).some((p) => p.id === id);
        if(!isIdFound){
            throw new Error("ID not found");
        } else {
            // Details about payment ID: E028
            // - Name: Rare-earth elements
            // - Type: material
            // - Value: 8000.00
            let payment = Array.from(this.payments).find((p) => p.id === id);
            let result = "Details about payment ID: " + id.toString() + "\n";
            result += "- Name: " + payment.name + "\n";
            result += "- Type: " + payment.type + "\n";
            result += "- Value: " + payment.value.toString();

            return result.trim().toString();
        }
    }

    toString(){
        // Summary:
        // - Payments: 2
        // - Balance: 38000.00
        let result = "Summary:" + "\n";
        result += "- Payments: " + this.payments.length.toString() + "\n";
        let totalBalance = Array.from(this.payments).reduce((a, sum) => a + sum.value, 0);
        // if(isNaN(totalBalance)){
        //     totalBalance = 0;
        // }
        result += "- Balance: " + totalBalance.toFixed(this.getOptions.precision).toString();

        return result.trim().toString();
    }
}

let testObj = new PaymentProcessor({types: ['service']});

testObj.registerPayment("1", "test", "service", 2.03);
testObj.registerPayment("2", "test", "service", 3.25644);

console.log(testObj.toString());
testObj.setOptions({precision: 5});
console.log(testObj.toString());
