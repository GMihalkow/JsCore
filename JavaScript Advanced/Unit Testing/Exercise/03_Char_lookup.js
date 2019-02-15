function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}
// console.log(
//     lookupChar("test", NaN)
//         );

describe("lookupChar", () => {
    let chai;
    before(() => {
        chai = require("chai");
    });

    it("should return undefined when an invalid string value is suplied", () => {
        let input = 2;

        let result = lookupChar(undefined, 2);

        chai.assert.isUndefined(result);
    });

    it("should return undefined when double value is suplied", () => {
        let input = 2.23;

        let result = lookupChar("test", input);

        chai.assert.isUndefined(result);
    });

    it("should return undefined when an invalid int value is suplied", () => {
        let input = "test";

        let result = lookupChar(input, input);

        chai.assert.isUndefined(result);
    });

    it("should return 'Incorrect index' when too big index is suplied", () => {
        let inputIndex = 4;
        let inputText = "test";

        let result = lookupChar(inputText, inputIndex);

        chai.assert.equal(result, "Incorrect index");
    });

    it("should return 'Incorrect index' when negative index is suplied", () => {
        let inputIndex = -1;
        let inputText = "test";

        let result = lookupChar(inputText, inputIndex);

        chai.assert.equal(result, "Incorrect index");
    });

    it("should return 't' at index 0 for 't'", () => {
        let inputIndex = 0;
        let inputText = "t";

        let result = lookupChar(inputText, inputIndex);

        chai.assert.equal(result, "t");
    });

    it("should return 't' at index 0 for 'test'", () => {
        let inputIndex = 0;
        let inputText = "test";

        let result = lookupChar(inputText, inputIndex);

        chai.assert.equal(result, "t");
    });

    it("should return 'h' at index 3 for 'pesho'", () => {
        let inputIndex = 3;
        let inputText = "pesho";

        let result = lookupChar(inputText, inputIndex);

        chai.assert.equal(result, 'h');
    });
     
    it("should char for edge case 'test', 3", () => {
        let inputText = "test";
        let inputIndex = 3;

        let result = lookupChar(inputText, inputIndex);

        chai.assert.equal(result, "t");
    });
});
