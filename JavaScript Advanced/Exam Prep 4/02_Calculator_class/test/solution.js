class Calculator {
    constructor() {
        this.expenses = [];
    }

    add(data) {
        this.expenses.push(data);
    }

    divideNums() {
        let divide;
        for (let i = 0; i < this.expenses.length; i++) {
            if (typeof(this.expenses[i]) === 'number') {
                if (i === 0 || divide===undefined) {
                    divide = this.expenses[i];
                } else {
                    if (this.expenses[i] === 0) {
                        return 'Cannot divide by zero';
                    }
                    divide /= this.expenses[i];
                }
            }
        }
        if (divide !== undefined) {
            this.expenses = [divide];
            return divide;
        } else {
           throw new Error('There are no numbers in the array!')
        }
    }

    toString() {
        if (this.expenses.length > 0)
            return this.expenses.join(" -> ");
        else return 'empty array';
    }

    orderBy() {
        if (this.expenses.length > 0) {
            let isNumber = true;
            for (let data of this.expenses) {
                if (typeof data !== 'number')
                    isNumber = false;
            }
            if (isNumber) {
                return this.expenses.sort((a, b) => a - b).join(', ');
            }
            else {
                return this.expenses.sort().join(', ');
            }
        }
        else return 'empty';
    }
}

describe("Calculator", function(){
    let chai;
    before(() => {
        chai = require("chai");
    });

    it("should instanciate properly", () =>{
        let testObj = new Calculator();

        let result = testObj.expenses !== undefined;

        chai.assert.isTrue(result);
    });

    it("should add item to expenses", () =>{
        let testObj = new Calculator();

        testObj.add(20);

        chai.assert.equal(1, testObj.expenses.length);
    });

    it("divide should throw if expenses is empty", () =>{
        let testObj = new Calculator();

        let resultError = "There are no numbers in the array!";

        chai.assert.throws(function(){
            testObj.divideNums();
        }, resultError);
    });

    it("divide should throw if expenses is filled with incorrect type", () =>{
        let testObj = new Calculator();

        testObj.add("pesho");
        testObj.add("ivan");
        testObj.add("gosho");

        let resultError = "There are no numbers in the array!";

        chai.assert.throws(function(){
            testObj.divideNums();
        }, resultError);
    });

    it("divide should not divide by zero", () =>{
        let testObj = new Calculator();

        testObj.add(20);
        testObj.add(0);
        testObj.add(10);

        let resultMessage = "Cannot divide by zero";

        chai.assert.equal(resultMessage, testObj.divideNums());
    });

    it("divide should return first number divided by all others for positive numbers", () =>{
        let testObj = new Calculator();

        testObj.add(20);
        testObj.add(5);
        testObj.add(4);

        let result = 1;

        chai.assert.equal(result, testObj.divideNums());
    });

    it("divide should return first number divided by all others for negative numbers", () =>{
        let testObj = new Calculator();

        testObj.add(-20);
        testObj.add(-5);
        testObj.add(4);

        let result = 1;

        chai.assert.equal(result, testObj.divideNums());
    });

    it("divide should return first number divided by all others for floating point numbers", () =>{
        let testObj = new Calculator();

        testObj.add(20.5);
        testObj.add(2.95);
        testObj.add(7.26);

        let result = 0.96;

        chai.assert.closeTo(result, 0.01, testObj.divideNums());
    });

    it("orderBy should return 'empty' if expenses is empty", () => {
        let testObj = new Calculator();

        let result = "empty";

        chai.assert.equal(result, testObj.orderBy());
    });

    it("orderBy sort numbers correctly", () => {
        let testObj = new Calculator();

        testObj.add(1);
        testObj.add(2);
        testObj.add(3);
        testObj.add(4);

        let result = "1, 2, 3, 4";

        chai.assert.equal(result, testObj.orderBy());
    });

    it("orderBy sort strings correctly", () => {
        let testObj = new Calculator();

        testObj.add("alex");
        testObj.add("biser");
        testObj.add("chris");
        testObj.add("daniel");

        let result = "alex, biser, chris, daniel";

        chai.assert.equal(result, testObj.orderBy());
    });

    it("toString() should return 'empty' if expenses is empty", () => {
        let testObj = new Calculator();

        let result = "empty array";

        chai.assert.equal(result, testObj.toString());
    });

    it("toString() should run properly when numbers are added", () => {
        let testObj = new Calculator();

        testObj.add(1);
        testObj.add(2);
        testObj.add(3);
        testObj.add(4);

        let result = "1 -> 2 -> 3 -> 4";

        chai.assert.equal(result, testObj.toString());
    });
});