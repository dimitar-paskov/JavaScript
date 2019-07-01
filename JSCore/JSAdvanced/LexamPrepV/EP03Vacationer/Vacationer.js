class Vacationer {

    constructor(nameArr, creditCardArr) {
        this.fullName = nameArr;

        this.idNumber = this.generateIDNumber();

        this.creditCard = creditCardArr ? {
            cardNumber: creditCardArr[0],
            expirationDate: creditCardArr[1],
            securityNumber: creditCardArr[2]
        } : {
            cardNumber: 1111,
            expirationDate: "",
            securityNumber: 111
        }

        this.wishList = [];


    }

    get fullName() {
        return this._fullName.firstName + " " + this._fullName.middleName + " " + this._fullName.lastName;
    }

    set fullName(nameArr) {
        if (nameArr.length !== 3) {
            throw new Error("Name must include first name, middle name and last name");
        }

        let pattern = /^[A-Z][a-z]+$/;

        for (let i = 0; i < nameArr.length; i++) {
            console.log(nameArr[i]);
            if (!pattern.test(nameArr[i])) {
                console.log(nameArr[i]);
                console.log(pattern.test(nameArr[i]));
                throw new Error('Invalid full name');
            }
        }


        this._fullName = {
            firstName: nameArr[0],
            middleName: nameArr[1],
            lastName: nameArr[2]
        }
    }

    generateIDNumber() {

        let id = 231 * this._fullName.firstName.charCodeAt(0) + 139 * this._fullName.middleName.length;
        if (["a", "e", "o", "i", "u"].includes(this._fullName.lastName.charAt(this._fullName.lastName.length - 1))) {
            id = id + "8";
        } else {
            id = id + "7";
        }
        return id;

    }

    addCreditCardInfo(input) {
        if (input.length < 3) {
            throw new Error("Missing credit card information");
        }

        if (typeof input[0] !== 'number' || typeof input[2] !== 'number') {
            throw new Error('Invalid credit card details');
        }

        this.creditCard = {
            cardNumber: input[0],
            expirationDate: input[1],
            securityNumber: input[2]
        }

    }

    addDestinationToWishList(destination) {
        if (this.wishList.reduce((acc, curr) => {
            if (curr.toLowerCase() === destination.toLowerCase()) {
                acc = true;
            }
            return acc;
        }, false)) {
            throw new Error('Destination already exists in wishlist')
        } else {
            this.wishList.push(destination);
            this.wishList.sort((a, b) => {
                return a.length - b.length;
            })
        }

    }

    getVacationerInfo() {
        let wishlist = 'empty';
        if (this.wishList.length > 0) {
            wishlist = this.wishList.join(', ');
        }

        return "Name: " + this.fullName + '\n' +
            "ID Number: " + this.idNumber + '\n' +
            "Wishlist:" + '\n' +
            wishlist + '\n' +
            "Credit Card:" + '\n' +
            "Card Number: " + this.creditCard.cardNumber + '\n' +
            "Expiration Date: " + this.creditCard.expirationDate + '\n' +
            "Security Number: " + this.creditCard.securityNumber;

    }


}


// Initialize vacationers with 2 and 3 parameters
let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivk0va"]);
// let vacationer2 = new Vacationer(["Tania", "Ivanova", "Zhivkova"],
//     [123456789, "10/01/2018", 777]);

// Should throw an error (Invalid full name)
// try {
//     let vacationer3 = new Vacationer(["Vania", "Ivanova", "ZhiVkova"]);
// } catch (err) {
//     console.log("Error: " + err.message);
// }

// Should throw an error (Missing credit card information)
// try {
//     let vacationer3 = new Vacationer(["Zdravko", "Georgiev", "Petrov"]);
//     vacationer3.addCreditCardInfo([123456789, "20/10/2018"]);
// } catch (err) {
//     console.log("Error: " + err.message);
// }

// vacationer1.addDestinationToWishList('Spain');
// vacationer1.addDestinationToWishList('Germany');
// vacationer1.addDestinationToWishList('Bali');


// Return information about the vacationers
// console.log(vacationer1.getVacationerInfo());
// console.log(vacationer2.getVacationerInfo());


/*
* output
Error: Invalid full name

Error: Missing credit card information

Name: Vania Ivanova Zhivkova
ID Number: 208398
Wishlist:
Bali, Spain, Germany
Credit Card:
Card Number: 1111
Expiration Date:
Security Number: 111

Name: Tania Ivanova Zhivkova
ID Number: 203778
Wishlist:
empty
Credit Card:
Card Number: 123456789
Expiration Date: 10/01/2018
Security Number: 777


* */