let expect = require('chai').expect;
class Warehouse {

    get capacity() {
        return this._capacity;
    }

    set capacity(givenSpace) {

        if (typeof givenSpace === 'number' && givenSpace > 0) {
            return this._capacity = givenSpace;
        } else {
            throw `Invalid given warehouse space`;
        }
    }

    constructor(capacity) {
        this.capacity = capacity;
        this.availableProducts = {'Food': {}, 'Drink': {}};
    }

    addProduct(type, product, quantity) {

        let addedQuantity = ((this.capacity - this.occupiedCapacity()) - quantity);
        let output;

        if (addedQuantity >= 0) {

            if (this.availableProducts[type].hasOwnProperty(product) === false) {
                this.availableProducts[type][product] = 0;
            }

            this.availableProducts[type][product] += quantity;
            output = this.availableProducts[type];

        } else {
            throw `There is not enough space or the warehouse is already full`;
        }

        return output;
    }

    orderProducts(type) {

        let output;
        let sortedKeys = Object.keys(this.availableProducts[type])
            .sort((a, b) => this.availableProducts[type][b] - this.availableProducts[type][a]);

        let newObj = {};

        for (let product of sortedKeys) {

            if (newObj.hasOwnProperty(product) === false) {
                newObj[product] = 0;
            }

            newObj[product] += this.availableProducts[type][product];
        }

        this.availableProducts[type] = newObj;
        output = this.availableProducts[type];

        return output;
    }

    occupiedCapacity() {

        let output = 0;
        let productsCount = Object.keys(this.availableProducts['Food']).length +
            Object.keys(this.availableProducts['Drink']).length;

        if (productsCount > 0) {

            let quantityInStock = 0;

            for (let type of Object.keys(this.availableProducts)) {

                for (let product of Object.keys(this.availableProducts[type])) {

                    quantityInStock += this.availableProducts[type][product];
                }
            }

            output = quantityInStock;
        }

        return output;
    }

    revision() {

        let output = "";

        if (this.occupiedCapacity() > 0) {

            for (let type of Object.keys(this.availableProducts)) {
                output += `Product type - [${type}]\n`;
                for (let product of Object.keys(this.availableProducts[type])) {
                    output += `- ${product} ${this.availableProducts[type][product]}\n`;
                }
            }
        } else {
            output = 'The warehouse is empty';
        }

        return output.trim();
    }

    scrapeAProduct(product, quantity) {

        let type = Object.keys(this.availableProducts).find(t => Object.keys(this.availableProducts[t]).includes(product));
        let output;

        if (type !== undefined) {

            if (quantity <= this.availableProducts[type][product]) {
                this.availableProducts[type][product] -= quantity;
            } else {
                this.availableProducts[type][product] = 0;
            }

            output = this.availableProducts[type];

        } else {
            throw `${product} do not exists`;
        }

        return output;
    }
}


describe("Test suite", function () {
    let warehouse;
    beforeEach(function () {
        warehouse = new Warehouse(1000);
    });
    describe("General cases", function () {
        it("should be class Warehouse", () => {
            expect(warehouse.constructor.name).to.equal('Warehouse');
        });

        it("should have ownProperty availableProducts", () => {
            expect(warehouse.hasOwnProperty('availableProducts')).to.equal(true);
            expect(warehouse.availableProducts['Food']).to.be.empty;
            expect(warehouse.availableProducts['Drink']).to.be.empty;

        });
        it("should have ownProperty addProduct, and it is an object", () => {
            expect(typeof Object.getPrototypeOf(warehouse.addProduct)).to.equal('function');
        });
        it("should have ownProperty orderProducts, and it is an object", () => {
            expect(typeof Object.getPrototypeOf(warehouse.orderProducts)).to.equal('function');
        });
        it("should have ownProperty occupiedCapacity, and it is an object", () => {
            expect(typeof Object.getPrototypeOf(warehouse.occupiedCapacity)).to.equal('function');
        });
        it("should have ownProperty revision, and it is an object", () => {
            expect(typeof Object.getPrototypeOf(warehouse.revision)).to.equal('function');
        });
        it("should have ownProperty scrapeAProduct, and it is an object", () => {
            expect(typeof Object.getPrototypeOf(warehouse.scrapeAProduct)).to.equal('function');
        });

        it("get capacity should be Function", () => {
            expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(warehouse), 'capacity'))['get']).to.equal('function');
        });
        it("set capacity should be Function", () => {
            expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(warehouse), 'capacity'))['set']).to.equal('function');
        });


        it("should throw Error if value is negative or 0 ", function () {
            expect(function () {
                warehouse = new Warehouse(0);
            }).to.throw( 'Invalid given warehouse space');
        });

        it("should return correct result for 1 vacationer, in season, no insurance", () => {
            warehouse.addProduct("John Smith");
            expect(holidayPackage.generateHolidayPackage()).to.equal();
        });

    });
});