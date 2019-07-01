class PaymentProcessor {

    constructor(options = {
        types: ["service", "product", "other"],
        precision: 2
    }) {
        this.payments = [];
        this.options = options;


    }

    get options() {
        return this._options;
    }

    set options(options) {

        if (this.options === undefined) {
            this._options = {
                types: ["service", "product", "other"],
                precision: 2
            };
        }

        if (options.types) {
            this._options.types = options.types;
        }
        if (options.precision) {
            this._options.precision = options.precision;
        }

    }

    setOptions(obj) {
        this.options = obj;
    }


    registerPayment(id, name, type, value) {
        if (typeof id !== 'string') {
            throw new Error('id must be a non-empty string');
        }
        if (id.length === 0) {
            throw new Error('id must be a non-empty string');
        }

        if (this.payments.reduce((acc, cur) => {
            if (cur.id === id) {
                acc = true;
            }
            return acc;
        }, false)) {
            throw new Error('id already exists');
        }

        if (typeof name !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (name.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        if (typeof value !== 'number') {
            throw new Error('Value must be a number');
        }
        if (!this.options.types.includes(type)) {
            throw new Error('Type should be valid');
        }

        this.payments.push({id, name, type, value:value.toFixed(this.options.precision)});
    }

    deletePayment(id) {
        let result = this.payments.reduce((acc, cur, idx) => {
            if (cur.id === id) {
                acc['isFound'] = true;
                acc['index'] = idx;
            }
            return acc;
        }, {'isFound': false, 'index': -1});

        if (result['isFound']) {
            this.payments.splice(result['index'], 1);
        } else {
            throw new Error('ID not found');
        }
    }

    get(id) {
        let result = this.payments.reduce((acc, cur, idx) => {
            if (cur.id === id) {
                acc['isFound'] = true;
                acc['index'] = idx;
            }
            return acc;
        }, {'isFound': false, 'index': -1});

        if (result['isFound']) {
            let answer = `Details about payment ID: ${id}
- Name: ${this.payments[result['index']].name}
- Type: ${this.payments[result['index']].type}
- Value: ${this.payments[result['index']].value}`;
            return answer;
        } else {
            throw new Error('ID not found');
        }

    }

    toString(){
        return `Summary:
- Payments: ${this.payments.length}
- Balance: ${this.payments.reduce((acc,curr)=> {
    acc += +curr.value;
    return acc;
        },0)}`
    }


}


// Initialize processor with default options
const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());

// Should throw an error (invalid type)
//generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);

generalPayments.setOptions({types: ['product', 'material']});
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
console.log(generalPayments.get('E028'));
generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);

// Should throw an error (ID not found)
// generalPayments.deletePayment('E027');
// Should throw an error (ID not found)
// generalPayments.get('E027');

generalPayments.deletePayment('E028');
console.log(generalPayments.toString());

// Initialize processor with custom types
const servicePyaments = new PaymentProcessor({types: ['service']});
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({precision: 5});
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());