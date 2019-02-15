function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

describe("isOddOrEven", () => {
    let chai;
    before(() => {
        chai = require("chai");
    });

    it("should return undefined if an invalid type is suplied", () => {
        let input = 2;

        let result = isOddOrEven(input);

        chai.assert.isUndefined(result);
    });

    it("should return even with input 'test'", () => {
        let input = "test";

        let result = isOddOrEven(input);

        chai.assert.equal(result, "even");
    });

    it("should return even with input 'test1'", () => {
        let input = "test1";

        let result = isOddOrEven(input);

        chai.assert.equal(result, "odd");
    });
});