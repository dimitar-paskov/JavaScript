let expect = require('chai').expect;
let assert = require('chai').assert;

class Console {

    static get placeholder() {
        return /{\d+}/g;
    }

    static writeLine() {
        let message = arguments[0];
        if (arguments.length === 1) {
            if (typeof (message) === 'object') {
                message = JSON.stringify(message);
                return message;
            }
            else if (typeof(message) === 'string') {
                return message;
            }
        }
        else {
            if (typeof (message) !== 'string') {
                throw new TypeError("No string format given!");
            }
            else {
                let tokens = message.match(this.placeholder).sort(function (a, b) {
                    a = Number(a.substring(1, a.length - 1));
                    b = Number(b.substring(1, b.length - 1));
                    return a - b;
                });
                if (tokens.length !== (arguments.length - 1)) {
                    throw new RangeError("Incorrect amount of parameters given!");
                }
                else {
                    for (let i = 0; i < tokens.length; i++) {
                        let number = Number(tokens[i].substring(1, tokens[i].length - 1));
                        if (number !== i) {
                            throw new RangeError("Incorrect placeholders given!");
                        }
                        else {
                            message = message.replace(tokens[i], arguments[i + 1])
                        }
                    }
                    return message;
                }
            }
        }
    }
};

let consy = new Console();
console.log(Console.placeholder);

describe("Test C#Console", () =>{
    describe("General tests", () => {
        it("should be Function", () => {
            expect(new Console().constructor.name).to.equal('Console');
        });
        it("Class Console should have static readonly property placeholder {\d+\g}", () => {
            expect(Console.placeholder.toString()).to.equal('/{\\d+}/g');
        });
        it("Class Console should have static method writeLine()", () => {
            expect(Console.hasOwnProperty('writeLine')).to.equal(true);
        });
        it("Class Console method writeLine(string) should return the string itself", () => {
            expect(Console.writeLine('jerry')).to.equal('jerry');
        });
        it("Class Console method writeLine(object) should return the object in string", () => {
            expect(Console.writeLine({name:'jerry', age: 15})).to.equal('{"name":"jerry","age":15}');
        });
        it("Class Console.writeLine(templateString, parameters) the first param is not a string, should throw TypeError", function() {
            expect(function () {
                Console.writeLine(15, 'a', 'b');
            }).to.throw(TypeError);
        });
        it("Class Console.writeLine(templateString, parameters) if the number of parameters does not correspond to the number of placeholders in the template string - throw a RangeError", function() {
            expect(function () {
                Console.writeLine('test {0} {1}', 'a', 'b', 'c');
            }).to.throw(RangeError);
        });
        it("Class Console.writeLine(templateString, parameters) If the placeholders have indexes not withing the parameters range(for instance we have a placeholder {13} and only 5 params) throw a RangeError", function() {
            expect(function () {
                Console.writeLine('test {13}', 'a', 'b', 'c');
            }).to.throw(RangeError);
        });
        it("Class Console method writeLine(templateString, parameters) should exchange placeholders with the supplied parameters", () => {
            expect(Console.writeLine('test {0}, {1} and {2}', 'Pixie', 'Dixie', 'Mr.Jinks')).to.equal('test Pixie, Dixie and Mr.Jinks');
        });

    });

});