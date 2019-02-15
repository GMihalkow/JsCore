function rgbToHexColor(red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255))
        return undefined; // Red value is invalid
    if (!Number.isInteger(green) || (green < 0) || (green > 255))
        return undefined; // Green value is invalid
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255))
        return undefined; // Blue value is invalid
    return "#" +
    ("0" + red.toString(16).toUpperCase()).slice(-2) +
    ("0" + green.toString(16).toUpperCase()).slice(-2) +
    ("0" + blue.toString(16).toUpperCase()).slice(-2);
}

describe("rgbToHexColor", function(){
    let chai;
    before(() => {
        chai = require("chai");
    });
    
    it("should return undefined if color < 0 || color > 255",() => {
        let belowZero = -1;
        let over255 = 256;

        let invalidType = "25";

        let greenBelowZeroResult = rgbToHexColor(1, belowZero, 1);
        let greenOver255Result = rgbToHexColor(1, over255, 1);
        let greenInvalidTypeResult = rgbToHexColor(1, invalidType, 1);
        
        let blueBelowZeroResult = rgbToHexColor(1, 1, belowZero);
        let blueOver255Result = rgbToHexColor(1, 1, over255);
        let blueInvalidTypeResult = rgbToHexColor(1, 1, invalidType);
        
        let redBelowZeroResult = rgbToHexColor(belowZero, 1, 1);
        let redOver255Result = rgbToHexColor(over255, 1, 1);
        let redInvalidTypeResult = rgbToHexColor(invalidType, 1, 1);

        chai.assert.isUndefined(greenBelowZeroResult);
        chai.assert.isUndefined(greenOver255Result);
        chai.assert.isUndefined(greenInvalidTypeResult);
        
        chai.assert.isUndefined(blueBelowZeroResult);
        chai.assert.isUndefined(blueOver255Result);
        chai.assert.isUndefined(blueInvalidTypeResult);
        
        chai.assert.isUndefined(redBelowZeroResult);
        chai.assert.isUndefined(redOver255Result);
        chai.assert.isUndefined(redInvalidTypeResult);
    });

    it("should return correct result for 24, 24, 24", () => {
        let red = 24;
        let green = 24;
        let blue = 24;

        let expectedOutput = "#" + 
        ("0" + red.toString(16).toUpperCase()).slice(-2) + 
        ("0" + green.toString(16).toUpperCase()).slice(-2) + 
        ("0" + blue.toString(16).toUpperCase()).slice(-2);

        let result = rgbToHexColor(red, green, blue);

        chai.assert.equal(result, expectedOutput);
    });

    it("should return undefined result for 24, '24', 24", () => {
        let red = 24;
        let green = '24';
        let blue = 24;

        let expectedOutput = "#" + 
        ("0" + red.toString(16).toUpperCase()).slice(-2) + 
        ("0" + green.toString(16).toUpperCase()).slice(-2) + 
        ("0" + blue.toString(16).toUpperCase()).slice(-2);

        let result = rgbToHexColor(red, green, blue);

        chai.assert.isUndefined(result);
    });

});