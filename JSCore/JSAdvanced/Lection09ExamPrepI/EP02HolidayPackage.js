let expect = require('chai').expect;
// let assert = require('chai').assert;

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
    beforeEach(function() {
        holidayPackage = new HolidayPackage('Italy', 'Summer');
    });
    describe("General cases", function () {
        it("should be Function", () => {
            expect(new HolidayPackage().constructor.name).to.equal('HolidayPackage');
        });
        it("should be initialised with two parameters", () => {
            expect(new HolidayPackage().hasOwnProperty('destination')).to.equal(true);
        });
        it("should be initialised with two parameters", () => {
            expect(new HolidayPackage().hasOwnProperty('season')).to.equal(true);
        });
        it("should be initialised with two parameters as strings", () => {
            expect(holidayPackage['destination']).to.equal('Italy');
        });
        it("should be initialised with two parameters as strings", () => {
            expect(holidayPackage['season']).to.equal('Summer');
        });
        it("should be initialised with insuranceIncluded set as false", () => {
            expect(holidayPackage['insuranceIncluded']).to.equal(false);
        });
        it("get insuranceIncluded should be Function", () => {
            expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(holidayPackage), 'insuranceIncluded'))['get']).to.equal('function');
        });
        it("set insuranceIncluded should be Function", () => {
            expect(typeof (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(holidayPackage), 'insuranceIncluded'))['set']).to.equal('function');
        });
        it("should be able to change insuranceIncluded", () => {
            expect(holidayPackage['insuranceIncluded'] = true).to.equal(true);
        });
        it("should throw Error if insuranceIncluded value is not boolean", function () {
            expect(function () {
                holidayPackage.insuranceIncluded = 'true';
            }).to.throw(Error, 'Insurance status must be a boolean');
        });
    });
    describe("addVacationer cases", function () {
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
        it("should throw Error if value is interval", function () {
            expect(function () {
                holidayPackage.addVacationer(' ');
            }).to.throw(Error,'Vacationer name must be a non-empty string');
        });
        it("should throw Error if value string, but the names provided are not 2", function () {
            expect(function () {
                holidayPackage.addVacationer('John');
            }).to.throw(Error, 'Name must consist of first name and last name');
        });
        it("should throw Error if value string, but the names provided are not 2", function () {
            expect(function () {
                holidayPackage.addVacationer('John Paul Newman');
            }).to.throw(Error, 'Name must consist of first name and last name');
        });
        it("should throw Error if value string, but the names provided are not 2", function () {
            expect(function () {
                holidayPackage.addVacationer('John Paul Newman VI');
            }).to.throw(Error, 'Name must consist of first name and last name');
        });
        it("should be able to add vacantioner if 2 name are provided", () => {
            holidayPackage.addVacationer('John Paul');
            expect(holidayPackage.showVacationers()).to.equal('Vacationers:\nJohn Paul');
        });
        it("should be able to show vacantioners if there are added", () => {
            holidayPackage.addVacationer('John Paul');
            holidayPackage.addVacationer('John PaulTheSecond');
            expect(holidayPackage.showVacationers()).to.equal('Vacationers:\nJohn Paul\nJohn PaulTheSecond');
        });
        it("should return No vacationers are added yet if there aren't any added", () => {
            expect(holidayPackage.showVacationers()).to.equal('No vacationers are added yet');
        });

    });
    describe("generateHolidayPackage cases", function () {
        it("should throw Error if no vacationers are present", function () {
            expect(function () {
                holidayPackage.generateHolidayPackage();
            }).to.throw(Error, 'There must be at least 1 vacationer added');
        });
        it("should return correct result for 1 vacationer, in season, no insurance", () => {
            holidayPackage.addVacationer("John Smith");
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Italy" + "\n" +
                "Vacationers:\nJohn Smith" + "\n"  +
                "Price: " + "600");
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
        it("should return correct result for 3 vacationers, in season, no insurance", () => {
            holidayPackage.addVacationer("John Smith");
            holidayPackage.addVacationer("John SmithII");
            holidayPackage.addVacationer("John SmithIII");
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Italy" + "\n" +
                "Vacationers:\nJohn Smith\nJohn SmithII\nJohn SmithIII" + "\n"  +
                "Price: " + "1400");
        });
        it("should return correct result for 1 vacationer, off season, no insurance", () => {
            holidayPackage = new HolidayPackage("Germany", "Autumn");
            holidayPackage.addVacationer("John Smith");
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Germany" + "\n" +
                "Vacationers:\nJohn Smith" + "\n"  +
                "Price: " + "400");
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
        it("should return correct result for 1 vacationer, off season, with insurance", () => {
            holidayPackage = new HolidayPackage("Germany", "Spring");
            holidayPackage.addVacationer("John Smith");
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Germany" + "\n" +
                "Vacationers:\nJohn Smith" + "\n"  +
                "Price: " + "500");
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
        it("should return correct result for 1 vacationer, in season, with insurance", () => {
            holidayPackage.addVacationer("John Smith");
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Italy" + "\n" +
                "Vacationers:\nJohn Smith" + "\n"  +
                "Price: " + "700");
        });
        it("should return correct result for 2 vacationers, in season, with insurance", () => {
            holidayPackage.insuranceIncluded = true;
            holidayPackage.addVacationer("John Smith");
            holidayPackage.addVacationer("John SmithII");
            expect(holidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\n" +
                "Destination: " + "Italy" + "\n" +
                "Vacationers:\nJohn Smith\nJohn SmithII" + "\n"  +
                "Price: " + "1100");
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

    });

});