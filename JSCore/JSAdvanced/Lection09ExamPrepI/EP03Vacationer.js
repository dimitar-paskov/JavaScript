class Vacationer {
    constructor(nameArr, cardArr) {
        this.fullName = nameArr;
        this.idNumber = this.generateIDNumber();
        this.wishList = [];
        this.addCreditCardInfo(cardArr);


    }

    get fullName() {
        return this._firstName + ' ' + this._middleName + ' ' + this._lastName;

    }

    set fullName(nameArr) {
        if (nameArr.length !== 3) {
            throw new Error("Name must include first name, middle name and last name");
        }
        let pattern = /^[A-Z][a-z]+$/;
        let areNamesOK = true;
        for (let i = 0; i < nameArr.length; i++) {
            if (!pattern.test(nameArr[i])) {
                areNamesOK = false;
                throw new Error('Invalid full name');
            }
        }

        if (areNamesOK) {
            this._firstName = nameArr[0];
            this._middleName = nameArr[1];
            this._lastName = nameArr[2];

        }

    }


    generateIDNumber() {
        let result = (231 * this._firstName.charCodeAt(0) + 139 * this._middleName.length);
        if (this._lastName.endsWith('a') ||
            this._lastName.endsWith('e') ||
            this._lastName.endsWith('o') ||
            this._lastName.endsWith('i') ||
            this._lastName.endsWith('u')
        ) {
            result += '8';
        } else {
            result += '7';
        }
        return result;
    }

    addCreditCardInfo(cardArr) {
        if (cardArr === undefined) {
            this.creditCard = {
                cardNumber: 1111,
                expirationDate: '',
                securityNumber: 111
            }
        } else {

            if (cardArr.length !== 3) {
                throw new Error("Missing credit card information");
            }

            if (typeof cardArr[0] === 'number' && typeof cardArr[2] === 'number') {
                this.creditCard = {
                    cardNumber: cardArr[0],
                    expirationDate: cardArr[1],
                    securityNumber: cardArr[2]
                }
            } else {
                throw new Error('Invalid credit card details')
            }
        }
    }

    getCreditCardInfo() {
        return 'Credit Card:\n' +
            `Card Number: ${this.creditCard.cardNumber}\n` +
            `Expiration Date: ${this.creditCard.expirationDate}\n` +
            `Security Number: ${this.creditCard.securityNumber}`;

    }

    addDestinationToWishList(destination) {
        if (!this.wishList.includes(destination)) {
            this.wishList.push(destination);
            this.wishList.sort((a, b) => {
                return a.length - b.length;
            })
        } else {
            throw new Error('Destination already exists in wishlist');
        }
    }

    getWishList() {
        if (this.wishList.length < 1) {
            return 'empty';
        }else{
            return this.wishList.join(', ');
        }
    }

    getVacationerInfo() {
        return `Name: ${this.fullName}\n` +
            `ID Number: ${this.idNumber}\n` +
            'Wishlist:\n' +
            `${this.getWishList()}\n` +
            `${this.getCreditCardInfo()}`;

    }
}

// Initialize vacationers with 2 and 3 parameters
let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
let vacationer2 = new Vacationer(["Tania", "Ivanova", "Zhivkova"],
    [123456789, "10/01/2018", 777]);

// Should throw an error (Invalid full name)
try {
    let vacationer3 = new Vacationer(["Vania", "Ivanova", "ZhiVkova"]);
} catch (err) {
    console.log("Error: " + err.message);
}

// Should throw an error (Missing credit card information)
try {
    let vacationer3 = new Vacationer(["Zdravko", "Georgiev", "Petrov"]);
    vacationer3.addCreditCardInfo([123456789, "20/10/2018"]);
} catch (err) {
    console.log("Error: " + err.message);
}

vacationer1.addDestinationToWishList('Spain');
vacationer1.addDestinationToWishList('Germany');
vacationer1.addDestinationToWishList('Bali');
vacationer1.addDestinationToWishList('Bala');
// vacationer1.addDestinationToWishList('Bali');

// Return information about the vacationers
console.log(vacationer1.getVacationerInfo());
console.log(vacationer2.getVacationerInfo());

