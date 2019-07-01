let expect = require('chai').expect;
// let assert = require('chai').assert;

class PaymentPackage {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.VAT = 20;      // Default value
        this.active = true; // Default value
    }

    get name() {
        return this._name;
    }

    set name(newValue) {
        if (typeof newValue !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (newValue.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        this._name = newValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Value must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('Value must be a non-negative number');
        }
        this._value = newValue;
    }

    get VAT() {
        return this._VAT;
    }

    set VAT(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('VAT must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('VAT must be a non-negative number');
        }
        this._VAT = newValue;
    }

    get active() {
        return this._active;
    }

    set active(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error('Active status must be a boolean');
        }
        this._active = newValue;
    }

    toString() {
        const output = [
            `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${this.value}`,
            `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
        ];
        return output.join('\n');
    }
}

describe("Test suite", function () {
    let paymentPackage;
    beforeEach(function () {
        paymentPackage = new PaymentPackage('Fee', 1000);
    });
    describe("General cases", function () {
        it("should be Function", () => {
            expect(paymentPackage.constructor.name).to.equal('PaymentPackage');
        });
        it("should be initialised with two parameters", () => {
            expect(paymentPackage.name).to.equal('Fee');
        });
        it("should be initialised with two parameters", () => {
            expect(paymentPackage.value).to.equal(1000);
        });
        it("should be initialised correctly with the default value for VAT", () => {
            expect(paymentPackage.VAT).to.equal(20);
        });
        it("should be initialised correctly with the default value for active", () => {
            expect(paymentPackage.active).to.equal(true);
        });
        it("get name should be Function", () => {
            expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(paymentPackage), 'name'))['get']).to.equal('function');
        });
        it("set name should be Function", () => {
            expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(paymentPackage), 'name'))['set']).to.equal('function');
        });
        it("get value should be Function", () => {
            expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(paymentPackage), 'value'))['get']).to.equal('function');
        });
        it("set value should be Function", () => {
            expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(paymentPackage), 'value'))['set']).to.equal('function');
        });
        it("get VAT should be Function", () => {
            expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(paymentPackage), 'VAT'))['get']).to.equal('function');
        });
        it("set VAT should be Function", () => {
            expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(paymentPackage), 'VAT'))['set']).to.equal('function');
        });
        it("get active should be Function", () => {
            expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(paymentPackage), 'active'))['get']).to.equal('function');
        });
        it("set active should be Function", () => {
            expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(paymentPackage), 'active'))['set']).to.equal('function');
        });
        // it("set active should be Function", () => {
        //     expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(paymentPackage), 'toString')).constructor).to.equal('function');
        // });

    });
    describe("Functional cases", function () {
        it("should throw Error if name is not string", function () {
            expect(function () {
                paymentPackage = new PaymentPackage(12, 1000)
            }).to.throw(Error, 'Name must be a non-empty string');
        });
        it("should throw Error if name is empty string", function () {
            expect(function () {
                paymentPackage = new PaymentPackage('', 1000)
            }).to.throw(Error, 'Name must be a non-empty string');
        });

        it("should get the correct name with get", () => {
            expect(paymentPackage.name).to.equal('Fee');
        });

        it("should throw Error if value is not number", function () {
            expect(function () {
                paymentPackage.value = 'pesho';
            }).to.throw(Error, 'Value must be a non-negative number');
        });
        it("should throw Error if value is negative number", function () {
            expect(function () {
                paymentPackage.value = -1000;
            }).to.throw(Error, 'Value must be a non-negative number');
        });
        it("should be initialised with 0 as value", () => {
            paymentPackage.value = 0;
            expect(paymentPackage.value).to.equal(0);
        });
        it("should get the correct value with get", () => {
            expect(paymentPackage.value).to.equal(1000);
        });

        it("should throw Error if VAT is not number", function () {
            expect(function () {
                paymentPackage.VAT = 'pesho';
            }).to.throw(Error, 'VAT must be a non-negative number');
        });
        it("should throw Error if VAT is negative number", function () {
            expect(function () {
                paymentPackage.VAT = -1000;
            }).to.throw(Error, 'VAT must be a non-negative number');
        });
        it("should be initialised with 0 as VAT", () => {
            paymentPackage.VAT = 0;
            expect(paymentPackage.VAT).to.equal(0);
        });
        it("should get the correct VAT with get", () => {
            expect(paymentPackage.VAT).to.equal(20);
        });
        it("should throw Error if active is not boolean", function () {
            expect(function () {
                paymentPackage.active = -1000;
            }).to.throw(Error, 'Active status must be a boolean');
        });
        it("should get the correct active state with get", () => {
            expect(paymentPackage.active).to.equal(true);
        });
        it("should set the correct active state with set", () => {
            paymentPackage.active = false;
            expect(paymentPackage.active).to.equal(false);
        });
        it("toString should return correct result", () => {
            expect(paymentPackage.toString()).to.equal('Package: Fee\n- Value (excl. VAT): 1000\n- Value (VAT 20%): 1200');
        });
        it("toString should return correct result", () => {
            paymentPackage.active = false;
            expect(paymentPackage.toString()).to.equal('Package: Fee (inactive)\n- Value (excl. VAT): 1000\n- Value (VAT 20%): 1200');
        });

    });
});