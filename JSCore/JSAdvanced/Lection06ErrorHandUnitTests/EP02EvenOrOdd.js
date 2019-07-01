let expect = require('chai').expect;
let assert = require('chai').assert;

function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

describe("isOddOrEven(string) ", function() {
    it("with a number parameter, should return undefined]", function() {
        expect(isOddOrEven(13)).to.equal(undefined, 'Function did not return the correct result');
    });
    it("with an object parameter, should return undefined]", function() {
        expect(isOddOrEven({name: "Pesho"})).to.equal(undefined,
            'Function did not return the correct result');
    });
    it("with even number string parameter, should return correct result]", function() {
        assert.equal(isOddOrEven('roar'), 'even', 'Function did not return correct result');
    });
    it("with odd number string parameter, should return correct result]", function() {
        assert.equal(isOddOrEven('roari'), 'odd', 'Function did not return correct result');
    });
    it("with multiple consecutive strings parameter, should return correct result]", function() {
        assert.equal(isOddOrEven('roari'), 'odd', 'Function did not return correct result');
        assert.equal(isOddOrEven('roar'), 'even', 'Function did not return correct result');
        assert.equal(isOddOrEven('roarc'), 'odd', 'Function did not return correct result');
        assert.equal(isOddOrEven(''), 'even', 'Function did not return correct result');
    });


});