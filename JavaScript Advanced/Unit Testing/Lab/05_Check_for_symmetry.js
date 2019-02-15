function isSymmetric(arr) {
    if (!Array.isArray(arr))
        return false; // Non-arrays are non-symmetric
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}

describe("isSymmetric", function(){
    let chai;
    before(() => {
        chai = require("chai");
    });

    it("should return false if no array is suplied", () => {
        let expectedResult = isSymmetric();
        
        chai.assert.isFalse(expectedResult);
    });

    it("should return false if 'test'", () => {
        let input = "test";

        let expectedResult = isSymmetric(input);
        
        chai.assert.isFalse(expectedResult);
    });

    it("should return true if [1,2,3,3,2,1]", () => {
        let inputArr = [1, 2, 3, 3, 2, 1];

        let expectedResult = isSymmetric(inputArr);
        
        chai.assert.isTrue(expectedResult);
    });

    it("should return false if [1,2,23,3,24,'test']", () => {
        let inputArr = [1, 2, 23, 3, 24, 'test'];

        let expectedResult = isSymmetric(inputArr);
        
        chai.assert.isFalse(expectedResult);
    });

    it("should return true if []", () => {
        let inputArr = [];

        let expectedResult = isSymmetric(inputArr);
        
        chai.assert.isTrue(expectedResult);
    });
})