let expect = require('chai').expect;
let assert = require('chai').assert;

let Calculator = require('../EP02Calculator');

describe("Test suite", function () {
    let calculator;
    beforeEach(function () {
        calculator = new Calculator();
    });
    describe("General cases", function () {
        it("should be Function", () => {
            expect(calculator.constructor.name).to.equal('Calculator');
        });
        it("should be initialized with empty array", () => {
            expect(Object.getPrototypeOf(calculator.expenses).constructor.name).to.equal('Array');
        });
        it("should be initialized with empty array", () => {
            expect(calculator.expenses.length).to.equal(0);
        });
    });
    describe("Add element", function () {
        it("should add elements", () => {
            calculator.add(5);
            expect(calculator.expenses[0]).to.equal(5);
            calculator.add('pesho');
            expect(calculator.expenses[1]).to.equal('pesho');
        });
        it("should add null elements", () => {
            calculator.add(5);
            calculator.add('pesho');
            calculator.add(null);
            expect(calculator.expenses[2]).to.equal(null, "Was not able to add null");
        });
        it("should add undefined elements", () => {
            calculator.add(5);
            calculator.add('pesho');
            calculator.add(null);
            calculator.add(undefined);
            expect(calculator.expenses[3]).to.equal(undefined, "Was not able to add undefined");
        });
    });
    describe("Divide", function () {
        it("should throw error if empty array", () => {
            expect(()=>{
                calculator.divideNums();
            }).to.throw(Error, 'There are no numbers in the array!', 'empty array');
        });
        it("should throw error if there are no numbers in the array", () => {
            calculator.add('pesho');
            calculator.add("5");
            expect(()=>{
                calculator.divideNums();
            }).to.throw(Error, 'There are no numbers in the array!', 'calculator.expenses = [pesho, "5"]');
        });

        it("should return the number itself, if there is only one number", () => {
            calculator.add('pesho');
            calculator.add('5');
            calculator.add(5);
            expect(calculator.divideNums()).to.equal(5);
            expect(calculator.expenses.length).to.equal(1, '[pesho, "5", 5]');
            expect(calculator.expenses[0]).to.equal(5, '[pesho, "5", 5]');
        });
        it("should return correct value, if there are numbers in the array", () => {
            calculator.add(18);
            calculator.add('pesho');
            calculator.add('5');
            calculator.add(5);
            expect(calculator.divideNums()).to.equal(3.6, 'Uncorrect division of [18, "pesho", "5", 5]');
            expect(calculator.expenses.length).to.equal(1, '[18, "pesho", "5", 5]');
            expect(calculator.expenses[0]).to.equal(3.6, '[18, "pesho", "5", 5]');
        });
        it("should return correct value, if there are numbers in the array", () => {
            calculator.add(17.45);
            calculator.add('pesho');
            calculator.add('5');
            calculator.add(5);
            expect(calculator.divideNums()).to.closeTo(3.49, 0.01, 'Uncorrect division of [18, "pesho", "5", 5]');
            expect(calculator.expenses.length).to.equal(1, '[18, "pesho", "5", 5]');
            expect(calculator.expenses[0]).to.closeTo(3.49, 0.01, '[18, "pesho", "5", 5]');
        });
        it("should return correct value, if there are numbers in the array", () => {
            calculator.add(17.45);
            calculator.add('pesho');
            calculator.add('5');
            calculator.add(5.3);
            expect(calculator.divideNums()).to.closeTo(3.29, 0.01, 'Uncorrect division of [17.45, "pesho", "5", 5.3]');
            expect(calculator.expenses.length).to.equal(1, '[17.45, "pesho", "5", 5.3]');
            expect(calculator.expenses[0]).to.closeTo(3.29, 0.01, '[17.45, "pesho", "5", 5.3]');
        });
        it("should return correct value, if there are numbers in the array", () => {
            calculator.add(-17.45);
            calculator.add('pesho');
            calculator.add('5');
            calculator.add(5);
            expect(calculator.divideNums()).to.closeTo(-3.49, 0.01, 'Uncorrect division of [-17.45, "pesho", "5", 5]');
            expect(calculator.expenses.length).to.equal(1, '[17.45, "pesho", "5", 5]');
            expect(calculator.expenses[0]).to.closeTo(-3.49, 0.01, '[-17.45, "pesho", "5", 5]');
        });
        it("should return correct value, if there are numbers in the array", () => {
            calculator.add(17.45);
            calculator.add('pesho');
            calculator.add('5');
            calculator.add(-5.3);
            expect(calculator.divideNums()).to.closeTo(-3.29, 0.01, 'Uncorrect division of [18, "pesho", "5", 5]');
            expect(calculator.expenses.length).to.equal(1, '[17.45, "pesho", "5", 5]');
            expect(calculator.expenses[0]).to.closeTo(-3.29, 0.01, '[17.45, "pesho", "5", -5.3]');
        });
        it("should return correct string with error, if there is 0 in the array", () => {
            calculator.add(17.45);
            calculator.add('pesho');
            calculator.add('5');
            calculator.add(0);
            expect(calculator.divideNums()).to.equal('Cannot divide by zero', 'Uncorrect division of [18, "pesho", "5", 0]');
            expect(calculator.expenses.length).to.equal(4, '[17.45, "pesho", "5", 0]');
        });
        it("should return correct string with error, if there is 0 in the array", () => {
            calculator.add(0);
            calculator.add('pesho');
            calculator.add('5');
            calculator.add(0);
            expect(calculator.divideNums()).to.equal('Cannot divide by zero', 'Uncorrect division of [0, "pesho", "5", 0]');
            expect(calculator.expenses.length).to.equal(4, '[0, "pesho", "5", 0]');
        });
        it("should return correct string with error, if there is 0 in the array", () => {
            calculator.add(0);
            calculator.add('pesho');
            calculator.add('5');
            calculator.add(3);
            expect(calculator.divideNums()).to.equal(0, 'Uncorrect division of [0, "pesho", "5", 0]');
            expect(calculator.expenses.length).to.equal(1, '[0, "pesho", "5", 3]');
            expect(calculator.expenses[0]).to.equal(0,  '[0, "pesho", "5", 3]');

        });
    });
    describe("toString", function () {
        it("should return 'empty array' if empty array", () => {
            expect(calculator.toString()).to.equal('empty array', 'toString with empty array []');
        });
        it("should return joined array ", () => {
            calculator.add(0);
            calculator.add('pesho');
            calculator.add('5');
            calculator.add(3);
            expect(calculator.toString()).to.equal('0 -> pesho -> 5 -> 3', 'toString with array []');
        });

    });
    describe("orderBy", function () {
        it("should return 'empty' if empty array", () => {
            expect(calculator.orderBy()).to.equal('empty', 'orderBy with empty array []');
        });
        it("should return joined array ", () => {
            calculator.add(13);
            calculator.add('pesho');
            calculator.add('5');
            calculator.add(3);
            expect(calculator.orderBy()).to.equal('13, 3, 5, pesho', 'orderBy with mixed data array []');
        });
        it("should return joined array ", () => {
            calculator.add(13);
            calculator.add(-17.5);
            calculator.add(4.5);
            calculator.add(3);
            expect(calculator.orderBy()).to.equal('-17.5, 3, 4.5, 13', 'orderBy with numbers data array []');
        });


    });
});

