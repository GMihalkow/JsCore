function sum(arr) {
    let sum = 0;
    for (num of arr)
        sum += Number(num);
    return sum;
}

function solve() {
    describe("sum", function() {
        let assert; 
        before(() => {
            assert = require("assert");
        });

        it("should return throw if no array is suplied", () => {
            assert.throws(function(){
                sum();
            });
        });

        it("should return 0 if array is empty", () => {
            let array = [];
            
            let result = sum(array);

            assert.equal(result, 0);
        });

        it("should return 3 if array is [1,2]", () => {
            let array = [1,2];

            let result = sum(array);

            assert.equal(result, 3);
        });
    });
}