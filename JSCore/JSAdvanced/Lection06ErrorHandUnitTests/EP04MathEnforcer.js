let expect = require('chai').expect;
let assert = require('chai').assert;

let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

describe("mathEnforcer", function() {
    describe("addFive(num) ", function() {
        it("with a non number parameter, should return undefined]", function() {
            expect(mathEnforcer.addFive('pesho')).to.equal(undefined, 'Function did not return the correct result');
        });
        it("with a positive number parameter, should return correct answer]", function() {
            expect(mathEnforcer.addFive(5)).to.equal(10, 'Function did not return the correct result');
        });
        it("with a negative number parameter, should return correct answer]", function() {
            expect(mathEnforcer.addFive(-3)).to.equal(2, 'Function did not return the correct result');
        });
        it("with a positive floating point number parameter, should return correct answer]", function() {
            expect(mathEnforcer.addFive(5.5)).to.closeTo(10.5, 0.01, 'Function did not return the correct result' );
        });
        it("with a negative floating point number parameter, should return correct answer]", function() {
            expect(mathEnforcer.addFive(-5.5)).to.closeTo(-0.5, 0.01, 'Function did not return the correct result' );
        });

    });

    describe("subtractTen(num) ", function() {
        it("with a non number parameter, should return undefined]", function() {
            expect(mathEnforcer.subtractTen('pesho')).to.equal(undefined, 'Function did not return the correct result');
        });
        it("with a positive number parameter, should return correct answer]", function() {
            expect(mathEnforcer.subtractTen(5)).to.equal(-5, 'Function did not return the correct result');
        });
        it("with a negative number parameter, should return correct answer]", function() {
            expect(mathEnforcer.subtractTen(-3)).to.equal(-13, 'Function did not return the correct result');
        });
        it("with a positive floating point number parameter, should return correct answer]", function() {
            expect(mathEnforcer.subtractTen(5.5)).to.closeTo(-4.5, 0.01, 'Function did not return the correct result' );
        });
        it("with a negative floating point number parameter, should return correct answer]", function() {
            expect(mathEnforcer.subtractTen(-5.5)).to.closeTo(-15.5, 0.01, 'Function did not return the correct result' );
        });

    });

    describe("sum(num1 + num2) ", function() {
        it("with a non number parameter, should return undefined]", function() {
            expect(mathEnforcer.sum('pesho', 3)).to.equal(undefined, 'Function did not return the correct result');
        });
        it("with a non number parameter, should return undefined]", function() {
            expect(mathEnforcer.sum(3, 'pesho')).to.equal(undefined, 'Function did not return the correct result');
        });

        it("with a positive numbers parameters, should return correct answer]", function() {
            expect(mathEnforcer.sum(5, 3)).to.equal(8, 'Function did not return the correct result');
        });
        it("with a negative numbers parameters, should return correct answer]", function() {
            expect(mathEnforcer.sum(-3, -4)).to.equal(-7, 'Function did not return the correct result');
        });
        it("with a positive and negative numbers parameters, should return correct answer]", function() {
            expect(mathEnforcer.sum(3, -4)).to.equal(-1, 'Function did not return the correct result');
        });
        it("with a positive and negative numbers parameters, should return correct answer]", function() {
            expect(mathEnforcer.sum(-4, 4)).to.equal(0, 'Function did not return the correct result');
        });


        it("with a positive floating point numbers parameters, should return correct answer]", function() {
            expect(mathEnforcer.sum(5.5, 2.1)).to.closeTo(7.6, 0.01, 'Function did not return the correct result' );
        });
        it("with a negative floating point numbers parameters, should return correct answer]", function() {
            expect(mathEnforcer.sum(-5.5, -3.3)).to.closeTo(-8.8, 0.01, 'Function did not return the correct result' );
        });

        it("with a positive and negative floatting numbers parameters, should return correct answer]", function() {
            expect(mathEnforcer.sum(3.1, -4.1)).to.closeTo(-1, 0.01, 'Function did not return the correct result');
        });
        it("with a positive and negative numbers parameters, should return correct answer]", function() {
            expect(mathEnforcer.sum(-4.3, 7.45)).to.closeTo(3.15, 0.01, 'Function did not return the correct result');
        });

    });


});