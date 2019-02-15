function createCalculator() {
    let value = 0;
    return {
        add: function(num) { value += Number(num); },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    }
}

describe("createCalculator", function(){
    let chai;
    before(() => {
        chai = require("chai");
    });

    it("should return correct object", () => {
        let result = createCalculator();

        let neededKeys = [ "add", "subtract", "get" ];

        chai.assert.property(result, "add");
        chai.assert.property(result, "get");
        chai.assert.property(result, "subtract");
    });
    
    it("should return value of 1 when adding", () => {
        let obj = createCalculator();
        obj.add(1);

        let result = obj.get();
        
        chai.assert.equal(result, 1);
    });

    it("should return value of -1 when adding", () => {
        let obj = createCalculator();
        obj.add(-1);

        let result = obj.get();
        
        chai.assert.equal(result, -1);
    });

    it("should return value of -1 when subtracting", () => {
        let obj = createCalculator();
        obj.subtract(1);

        let result = obj.get();
        
        chai.assert.equal(result, -1);
    });

    it("should return value of '-1' when adding", () => {
        let obj = createCalculator();
        obj.add('-1');

        let result = obj.get();
        
        chai.assert.equal(result, -1);
    });

    it("should return value of '-1' when subtracting", () => {
        let obj = createCalculator();
        obj.subtract('1');

        let result = obj.get();
        
        chai.assert.equal(result, -1);
    });

    it("should return value of 1 when subtracting", () => {
        let obj = createCalculator();
        obj.add(2);
        obj.subtract(1);

        let result = obj.get();
        
        chai.assert.equal(result, 1);
    });

    it("should return 0 when nothing is added", () => {
        let obj = createCalculator();
        let result = obj.get();

        chai.assert.equal(result, 0);
    });

    it("should return 0 when 1 is added and 1 is subtracted", () => {
        let obj = createCalculator();
        obj.add(1);
        obj.subtract(1);
        let result = obj.get();

        chai.assert.equal(result, 0);
    });

    it("should return NaN when invalid type is given to add", () => {
        let obj = createCalculator();
        obj.add("test");
        let result = obj.get();

        chai.assert.isNaN(result);
    });

    it("should return NaN when invalid type is given to subtract", () => {
        let obj = createCalculator();
        obj.subtract("test");
        let result = obj.get();

        chai.assert.isNaN(result);
    });

    it("should return 1 when falsy value is given to add", () => {
        let obj = createCalculator();
        obj.add(true);
        let result = obj.get();

        chai.assert.equal(result, 1);
    });

    it("should return 0 when falsy value is given to subtract", () => {
        let obj = createCalculator();
        obj.subtract(false);
        let result = obj.get();

        chai.assert.equal(result, 0);
    });
});