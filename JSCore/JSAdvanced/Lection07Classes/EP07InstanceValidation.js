class CheckingAccount{
    constructor(clientId, email, firstName, lastName){
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;


    }

    get clientId(){
        return this._clientId;
    }

    set clientId(clientId){
        let pattern = /^\d{6}$/g;
        let isMatch = pattern.test(clientId);
        if (isMatch){
            this._clientId = clientId;

        } else{
            throw new TypeError('Client ID must be a 6-digit number');
        }

    }



    get email(){
        return this._email;
    }

    set email(email){
        let pattern = /^[a-zA-Z]+@[a-zA-Z]+(\.[a-zA-Z]+)*$/g;
        let isMatch = pattern.test(email);
        if (isMatch){
            this._email = email;

        } else{
            throw new TypeError('Invalid e-mail');
        }

    }


    get firstName(){
        return this._firstName;
    }

    set firstName(firstName){

        if (firstName.length < 3 || firstName.length > 20){
            throw new TypeError('First name must be between 3 and 20 characters long');
        }

        let pattern = /^[a-zA-Z]{3,20}$/g;
        let isMatch = pattern.test(firstName);
        if (isMatch){
            this._firstName = firstName;

        } else{
            throw new TypeError('First name must contain only Latin characters');
        }

    }


    get lastName(){
        return this._firstName;
    }

    set lastName(lastName){
        if (lastName.length < 3 || lastName.length > 20){
            throw new TypeError('Last name must be between 3 and 20 characters long');
        }
        let pattern = /^[a-zA-Z]{3,20}$/g;
        let isMatch = pattern.test(lastName);
        if (isMatch){
            this._lastName = lastName;

        } else{
            throw new TypeError('Last name must contain only Latin characters');
        }

    }


}

let newTicket = new CheckingAccount('010101', 'asdasdds@abv.bg', 'asdsdsdsdsdsdasd', 'as5as');
console.log(newTicket);