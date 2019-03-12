class PaymentPackage {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.VAT = 20;      // Default value    
        this.active = true; // Default value
    }

    get name() {
        return this._name;
    }

    set name(newValue) {
        if (typeof newValue !== 'string') {
        throw new Error('Name must be a non-empty string');
        }
        if (newValue.length === 0) {
        throw new Error('Name must be a non-empty string');
        }
        this._name = newValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (typeof newValue !== 'number') {
        throw new Error('Value must be a non-negative number');
        }
        if (newValue < 0) {
        throw new Error('Value must be a non-negative number');
        }
        this._value = newValue;
    }

    get VAT() {
        return this._VAT;
    }

    set VAT(newValue) {
        if (typeof newValue !== 'number') {
        throw new Error('VAT must be a non-negative number');
        }
        if (newValue < 0) {
        throw new Error('VAT must be a non-negative number');
        }
        this._VAT = newValue;
    }

    get active() {
        return this._active;
    }

    set active(newValue) {
        if (typeof newValue !== 'boolean') {
        throw new Error('Active status must be a boolean');
        }
        this._active = newValue;
    }

    toString() {
        const output = [
        `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
        `- Value (excl. VAT): ${this.value}`,
        `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
        ];
        return output.join('\n');
    }
}

describe("PaymentPackage", () => {
    let chai;
    before(() => {
        chai = require("chai");
    });

    it("should instanciate properly", () => {
        let testObj = new PaymentPackage("test", 10);    

        let result = testObj.name === "test" && testObj.value === 10 && testObj.VAT === 20 && testObj.active;

        chai.assert.isTrue(result);
    });

    it("should throw when name is invalid type", () => {
        let errorMessage = "Name must be a non-empty string";

        chai.assert.throws(function() {
            new PaymentPackage(10, 10);    
        }, errorMessage)
    });

    it("should throw when name is empty string", () => {
        let errorMessage = "Name must be a non-empty string";

        chai.assert.throws(function() {
            new PaymentPackage("", 10);    
        }, errorMessage)
    });

    it("should throw when value is not a number", () => {
        let errorMessage = "Value must be a non-negative number";

        chai.assert.throws(function() {
            new PaymentPackage("test", "10");    
        }, errorMessage)
    });

    it("should throw when value is a negative number", () => {
        let errorMessage = "Value must be a non-negative number";

        chai.assert.throws(function() {
            new PaymentPackage("test", -1);    
        }, errorMessage)
    });

    it("should change value properly", () => {
        let testObj = new PaymentPackage("test", 10);    
        testObj.value = 0;

        let result = 0;

        chai.assert.equal(result, testObj.value);
    });

    it("VAT should throw when value is not a number", () => {
        let testObj = new PaymentPackage("test", 10);    

        let errorMessage = "VAT must be a non-negative number";

        chai.assert.throws(function() {
            testObj.VAT = "10";
        }, errorMessage)
    });

    it("VAT should throw when value is a negative number", () => {
        let testObj = new PaymentPackage("test", 10);    

        let errorMessage = "VAT must be a non-negative number";

        chai.assert.throws(function() {
            testObj.VAT = -1;
        }, errorMessage)
    });

    it("VAT should change value properly", () => {
        let testObj = new PaymentPackage("test", 10);    
        testObj.VAT = 10;

        let result = 10;

        chai.assert.equal(result, testObj.VAT);
    });

    it("VAT should change value properly when 0", () => {
        let testObj = new PaymentPackage("test", 10);    
        testObj.VAT = 0;

        let result = 0;

        chai.assert.equal(result, testObj.VAT);
    });

    it("active should throw when value is not boolean", () => {
        let testObj = new PaymentPackage("test", 10);    

        let errorMessage = "Active status must be a boolean";

        chai.assert.throws(function() {
            testObj.active = "true";
        }, errorMessage)
    });

    it("active should change value properly", () => {
        let testObj = new PaymentPackage("test", 10);    
        testObj.active = false;
        
        let result = false;

        chai.assert.equal(result, testObj.active);
    });

    it("toString should return active result", () =>{
        let testObj = new PaymentPackage("test", 10);

        let result = "Package: " + testObj.name.toString() + "\n" +
        "- Value (excl. VAT): " + testObj.value.toString() + "\n" +
        "- Value (VAT " + testObj.VAT +"%): " + testObj.value * (1 + testObj.VAT / 100);

        chai.assert.equal(result, testObj.toString());
    });

    it("toString should return inactive result", () =>{
        let testObj = new PaymentPackage("test", 10);
        testObj.active = false;

        let result = "Package: " + testObj.name.toString() + " (inactive)" + "\n" +
        "- Value (excl. VAT): " + testObj.value.toString() + "\n" +
        "- Value (VAT " + testObj.VAT +"%): " + testObj.value * (1 + testObj.VAT / 100);

        chai.assert.equal(result, testObj.toString());
    });
});