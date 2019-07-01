let expect = require('chai').expect;
let assert = require('chai').assert;

function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

describe("isOddOrEven(string) ", function() {
    it("with a non string first parameter, should return undefined]", function() {
        expect(lookupChar(13,2)).to.equal(undefined, 'Function did not return the correct result');
    });
    it("with a non number second parameter, should return undefined]", function() {
        expect(lookupChar('pesho', ' gosho')).to.equal(undefined, 'Function did not return the correct result');
    });
    it("with a floatting point number as second parameter, should return undefined]", function() {
        expect(lookupChar('pesho', 3.14)).to.equal(undefined, 'Function did not return the correct result');
    });

    it("with incorrect index, should return Incorrect index]", function() {
        expect(lookupChar('pesho', 17)).to.equal("Incorrect index", 'Function did not return the correct result');
    });

    it("with negative index, should return Incorrect index]", function() {
        expect(lookupChar('pesho', -2)).to.equal("Incorrect index", 'Function did not return the correct result');
    });
    it("with index value equal the string length, should return Incorrect index]", function() {
        expect(lookupChar('pesho', 5)).to.equal("Incorrect index", 'Function did not return the correct result');
    });
    it("with correct parameters, should return correct value]", function() {
        expect(lookupChar('pesho', 0)).to.equal("p", 'Function did not return the correct result');
    });
    it("with correct parameters, should return correct value]", function() {
        expect(lookupChar('stamat', 3)).to.equal("m", 'Function did not return the correct result');
    });

});