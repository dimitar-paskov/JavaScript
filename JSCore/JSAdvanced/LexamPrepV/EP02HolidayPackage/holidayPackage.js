let expect = require('chai').expect;

class HolidayPackage {
    constructor(destination, season) {
        this.vacationers = [];
        this.destination = destination;
        this.season = season;
        this.insuranceIncluded = false; // Default value
    }

    showVacationers() {
        if (this.vacationers.length > 0)
            return "Vacationers:\n" + this.vacationers.join("\n");
        else
            return "No vacationers are added yet";
    }

    addVacationer(vacationerName) {
        if (typeof vacationerName !== "string" || vacationerName === ' ') {
            throw new Error("Vacationer name must be a non-empty string");
        }
        if (vacationerName.split(" ").length !== 2) {
            throw new Error("Name must consist of first name and last name");
        }
        this.vacationers.push(vacationerName);
    }

    get insuranceIncluded() {
        return this._insuranceIncluded;
    }

    set insuranceIncluded(insurance) {
        if (typeof insurance !== 'boolean') {
            throw new Error("Insurance status must be a boolean");
        }
        this._insuranceIncluded = insurance;
    }

    generateHolidayPackage() {
        if (this.vacationers.length < 1) {
            throw new Error("There must be at least 1 vacationer added");
        }
        let totalPrice = this.vacationers.length * 400;

        if (this.season === "Summer" || this.season === "Winter") {
            totalPrice += 200;
        }

        totalPrice += this.insuranceIncluded === true ? 100 : 0;

        return "Holiday Package Generated\n" +
            "Destination: " + this.destination + "\n" +
            this.showVacationers() + "\n" +
            "Price: " + totalPrice;
    }
}

describe("Test suite", function () {
    let holidayPackage;
    beforeEach(function () {
        holidayPackage = new HolidayPackage('Morocco', 'Winter');
    });
    describe("General cases", function () {

        it("should be initialised with two parameters", () => {
            expect(new HolidayPackage().hasOwnProperty('destination')).to.equal(true);
        });
        it("should be initialised with two parameters", () => {
            expect(new HolidayPackage().hasOwnProperty('season')).to.equal(true);
        });

        it("should be class HolidayPackage and takes 2 args", function () {
            expect(holidayPackage.constructor.name).to.equal('HolidayPackage');
            expect(holidayPackage.constructor.length).to.equal(2);
        });

        it("should have ownProperty season and it is Winter", () => {
            expect(holidayPackage.hasOwnProperty('season')).to.equal(true);
            expect(holidayPackage.season).to.equal('Winter');
        });

        it("should have ownProperty destination and it is Morocco", () => {
            expect(holidayPackage.hasOwnProperty('destination')).to.equal(true);
            expect(holidayPackage.destination).to.equal('Morocco');
        });
        it("should have ownProperty vacationers and it is empty array", () => {
            expect(holidayPackage.hasOwnProperty('vacationers')).to.equal(true);
            expect(holidayPackage.vacationers).to.be.empty;
        });
        it("should have ownProperty _insuranceIncluded and it is false by defalt", () => {
            expect(holidayPackage.hasOwnProperty('_insuranceIncluded')).to.equal(true);
            expect(holidayPackage._insuranceIncluded).to.equal(false);
        });
        it("should have ownProperty insuranceIncluded and it is false by defalt", () => {
            expect(holidayPackage.insuranceIncluded).to.equal(false);
        });
        // it("get insuranceIncluded should be Function", () => {
        //     expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(holidayPackage), 'insuranceIncluded'))['get']).to.equal('function');
        // });
        // it("set insuranceIncluded should be Function", () => {
        //     expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(holidayPackage), 'insuranceIncluded'))['set']).to.equal('function');
        // });
    });
    describe('addVacationer', function () {
        it("should have function addVacationer() and take 1 param", () => {
            expect(Object.getPrototypeOf(holidayPackage).hasOwnProperty('addVacationer')).to.equal(true);
            expect(holidayPackage.addVacationer.length).to.equal(1);
        });

        it("should throw Error if value string, but the names provided are not 2", function () {
            expect(function () {
                holidayPackage.addVacationer('John Paul Newman VI');
            }).to.throw(Error, 'Name must consist of first name and last name');
        });

        it("should throw error if there are no 2 names", () => {
            expect(function () {
                holidayPackage.addVacationer('name');
            }).to.throw(Error, 'Name must consist of first name and last name');
            expect(function () {
                holidayPackage.addVacationer('name surname family');
            }).to.throw(Error, 'Name must consist of first name and last name');
        });
        it("should throw error arg is not a string or is empty string", () => {
            expect(function () {
                holidayPackage.addVacationer(5);
            }).to.throw(Error, 'Vacationer name must be a non-empty string');
            expect(function () {
                holidayPackage.addVacationer(' ');
            }).to.throw(Error, 'Vacationer name must be a non-empty string');
            expect(function () {
                holidayPackage.addVacationer('');
            }).to.throw(Error, 'Name must consist of first name and last name');
        });
        it("should add correct vacationer", () => {
            holidayPackage.addVacationer('name family');
            expect(holidayPackage.vacationers[0]).to.equal('name family');
            expect(holidayPackage.vacationers.length).to.equal(1);
        });
        it("should add correct vacationers", () => {
            holidayPackage.addVacationer('name family');
            holidayPackage.addVacationer('name2 family2');
            expect(holidayPackage.vacationers[1]).to.equal('name2 family2');
            expect(holidayPackage.vacationers[0]).to.equal('name family');
            expect(holidayPackage.vacationers.length).to.equal(2);
        });
        it("should throw Error if value is not a string", function () {
            expect(function () {
                holidayPackage.addVacationer(5);
            }).to.throw(Error,'Vacationer name must be a non-empty string');
        });
        it("should throw Error if value is empty string", function () {
            expect(function () {
                holidayPackage.addVacationer('');
            }).to.throw(Error,'Name must consist of first name and last name');
        });

    });

    describe('insuranceIncluded', function () {
        it("should have function insuranceIncluded as getter and setter", () => {
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.insuranceIncluded).to.equal(true);
            expect(holidayPackage._insuranceIncluded).to.equal(true);
            holidayPackage.insuranceIncluded = false;
            expect(holidayPackage.insuranceIncluded).to.equal(false);
            expect(holidayPackage._insuranceIncluded).to.equal(false);

        });
        it("should throw error if insuranceIncluded is called with no boolean value", () => {
            expect(function () {
                holidayPackage.insuranceIncluded = 5;
            }).to.throw(Error, 'Insurance status must be a boolean');
        });
        it("should throw Error if insuranceIncluded value is not boolean", function () {
            expect(function () {
                holidayPackage.insuranceIncluded = 'true';
            }).to.throw(Error, 'Insurance status must be a boolean');
        });
    });

    describe('showVacationers', function () {
        it("should have function showVacationers()", () => {
            expect(Object.getPrototypeOf(holidayPackage).hasOwnProperty('showVacationers')).to.equal(true);
            expect(holidayPackage.showVacationers.length).to.equal(0);
        });
        it("should have function showVacationers() that returns when no vacationers", () => {
            expect(holidayPackage.showVacationers()).to.equal('No vacationers are added yet');
        });
        it("should have function showVacationers() returns correct vacationers", () => {
            holidayPackage.addVacationer('name family');
            holidayPackage.addVacationer('name2 family2');
            expect(holidayPackage.showVacationers()).to.equal('Vacationers:\nname family\nname2 family2');
        });

    });

    describe('generateHolidayPackage', function () {
        it("should have function generateHolidayPackage()", () => {
            expect(Object.getPrototypeOf(holidayPackage).hasOwnProperty('generateHolidayPackage')).to.equal(true);
            expect(holidayPackage.generateHolidayPackage.length).to.equal(0);
        });

        it("should throw error if generateHolidayPackage if no vacationers", () => {
            expect(function () {
                holidayPackage.generateHolidayPackage();
            }).to.throw(Error, 'There must be at least 1 vacationer added');
        });
        it("should have function generateHolidayPackage() and return correct", () => {
            holidayPackage.addVacationer('name family');
            holidayPackage.addVacationer('name2 family2');
            holidayPackage.addVacationer('name3 family3');
            expect(holidayPackage.generateHolidayPackage()).to.equal('Holiday Package Generated\nDestination: Morocco\nVacationers:\nname family\nname2 family2\nname3 family3\nPrice: 1400');
        });
        it("should return correct result for 1 vacationer, in season, no insurance", () => {
            holidayPackage.addVacationer("John Smith");
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Morocco" + "\n" +
                "Vacationers:\nJohn Smith" + "\n"  +
                "Price: " + "600");
        });
        it("should return correct result for 1 vacationer, off season, no insurance", () => {
            holidayPackage = new HolidayPackage("Germany", "Autumn");
            holidayPackage.addVacationer("John Smith");
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Germany" + "\n" +
                "Vacationers:\nJohn Smith" + "\n"  +
                "Price: " + "400");
        });
        it("should return correct result for 1 vacationer, off season, with insurance", () => {
            holidayPackage = new HolidayPackage("Germany", "Spring");
            holidayPackage.addVacationer("John Smith");
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Germany" + "\n" +
                "Vacationers:\nJohn Smith" + "\n"  +
                "Price: " + "500");
        });

        it("should return correct result for 1 vacationer, in season, with insurance", () => {
            holidayPackage.addVacationer("John Smith");
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Morocco" + "\n" +
                "Vacationers:\nJohn Smith" + "\n"  +
                "Price: " + "700");
        });

        it("should return correct result for 3 vacationers, in season, with insurance", () => {
            holidayPackage = new HolidayPackage("Italy", "Winter");
            holidayPackage.insuranceIncluded = true;
            holidayPackage.addVacationer("John Smith");
            holidayPackage.addVacationer("John SmithII");
            holidayPackage.addVacationer("John SmithIII");
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Italy" + "\n" +
                "Vacationers:\nJohn Smith\nJohn SmithII\nJohn SmithIII" + "\n"  +
                "Price: " + "1500");
        });

        it("should return correct result for 3 vacationer, off season, with insurance", () => {
            holidayPackage = new HolidayPackage("Germany", "Autumn");
            holidayPackage.addVacationer("John Smith");
            holidayPackage.addVacationer("John SmithII");
            holidayPackage.addVacationer("John SmithIII");
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Germany" + "\n" +
                "Vacationers:\nJohn Smith\nJohn SmithII\nJohn SmithIII" + "\n"  +
                "Price: " + "1300");
        });

        it("should return correct result for 3 vacationer, off season, no insurance", () => {
            holidayPackage = new HolidayPackage("Germany", "Spring");
            holidayPackage.addVacationer("John Smith");
            holidayPackage.addVacationer("John SmithII");
            holidayPackage.addVacationer("John SmithIII");
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Germany" + "\n" +
                "Vacationers:\nJohn Smith\nJohn SmithII\nJohn SmithIII" + "\n"  +
                "Price: " + "1200");
        });

        it("should return correct result for 3 vacationers, in season, no insurance", () => {
            holidayPackage.addVacationer("John Smith");
            holidayPackage.addVacationer("John SmithII");
            holidayPackage.addVacationer("John SmithIII");
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Morocco" + "\n" +
                "Vacationers:\nJohn Smith\nJohn SmithII\nJohn SmithIII" + "\n"  +
                "Price: " + "1400");
        });

        it("should return correct result for 2 vacationers, in season, no insurance", () => {
            holidayPackage = new HolidayPackage("Italy", "Winter");
            holidayPackage.addVacationer("John Smith");
            holidayPackage.addVacationer("John SmithII");
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Italy" + "\n" +
                "Vacationers:\nJohn Smith\nJohn SmithII" + "\n"  +
                "Price: " + "1000");
        });

        it("should return correct result for 2 vacationer, off season, no insurance", () => {
            holidayPackage = new HolidayPackage("Germany", "Spring");
            holidayPackage.addVacationer("John Smith");
            holidayPackage.addVacationer("John SmithII");
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Germany" + "\n" +
                "Vacationers:\nJohn Smith\nJohn SmithII" + "\n"  +
                "Price: " + "800");
        });

        it("should return correct result for 2 vacationer, off season, with insurance", () => {
            holidayPackage = new HolidayPackage("Germany", "Spring");
            holidayPackage.addVacationer("John Smith");
            holidayPackage.addVacationer("John SmithII");
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Germany" + "\n" +
                "Vacationers:\nJohn Smith\nJohn SmithII" + "\n"  +
                "Price: " + "900");
        });

        it("should return correct result for 2 vacationers, in season, with insurance", () => {
            holidayPackage.insuranceIncluded = true;
            holidayPackage.addVacationer("John Smith");
            holidayPackage.addVacationer("John SmithII");
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Morocco" + "\n" +
                "Vacationers:\nJohn Smith\nJohn SmithII" + "\n"  +
                "Price: " + "1100");
        });




    });

});