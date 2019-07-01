class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
    }

    registerChild(name, grade, budget) {
        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }

        if (!this.kids[grade]) {
            this.kids[grade] = [];
        }

        if (this.kids[grade].includes(`${name}-${budget}`)) {
            return `${name} is already in the list for this ${this.destination} vacation.`;
        }

        // let isInList = this.kids[grade].reduce((acc, cur, idx) => {
        //     let inname = cur.split('-')[0];
        //     if (name === inname) {
        //         acc = true;
        //
        //     }
        //     return acc;
        //
        // }, false);
        //
        // if (isInList){
        //     return `${name} is already in the list for this ${this.destination} vacation.`;
        // }



        this.kids[grade].push(`${name}-${budget}`);
        return this.kids[grade];
    }

    removeChild(name, grade) {

        if (this.kids[grade]) {


            let isInList = this.kids[grade].reduce((acc, cur, idx) => {
                let inname = cur.split('-')[0];
                if (name === inname) {
                    acc = idx;

                }
                return acc;

            }, false);

            if (isInList === false) {
                return `We couldn't find ${name} in ${grade} grade.`
            } else {
                this.kids[grade].splice(isInList, 1);
                return this.kids[grade];
            }
        }else{
            return `We couldn't find ${name} in ${grade} grade.`
        }

    }

    toString() {
        let numberOfChildren = this.numberOfChildren;
        if (numberOfChildren === 0){
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`
        }
        let output = `${this.organizer} will take ${numberOfChildren} children on trip to ${this.destination}\n`;
        Object.keys(this.kids).sort((a,b) => a-b).forEach(x => {
            output += `Grade: ${x}\n`;
            this.kids[x].forEach((y, idx) => {
                output += `${idx+1}. ${y}\n`;
            })
            output += '\n';
        })

        return output;


    }
    get numberOfChildren(){
        let numberOfChildren = Object.keys(this.kids).reduce((acc, curr) => {
            acc += this.kids[curr].length;
            return acc;
        },0);

        return numberOfChildren;

    }
}


// let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
// console.log(vacation.registerChild('Gosho', 5, 2000));
// console.log(vacation.registerChild('Lilly', 6, 2100));
// console.log(vacation.registerChild('Pesho', 6, 2400));
// console.log(vacation.registerChild('Gosho', 5, 2000));
// console.log(vacation.registerChild('Tanya', 5, 6000));
// console.log(vacation.registerChild('Mitko', 10, 1590));

let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
vacation.registerChild('Gosho', 5, 2000);
vacation.registerChild('Lilly', 6, 2100);

console.log(vacation.removeChild('Gosho', 5));

vacation.registerChild('Pesho', 6, 2400);
vacation.registerChild('Gosho', 5, 2000);

console.log(vacation.removeChild('Lilly', 6));
console.log(vacation.removeChild('Gosho', 5));
console.log(vacation.removeChild('Pesho', 6));
// console.log(vacation.registerChild('Tanya', 5, 6000));
console.log(vacation.toString())
console.log(vacation.numberOfChildren);


// let vacation = new Vacation('Miss Elizabeth', 'Dubai', 2000);
//
// vacation.registerChild('Gosho', 5, 3000);
// vacation.registerChild('Lilly', 6, 1500);
// vacation.registerChild('Pesho', 7, 4000);
// vacation.registerChild('Tanya', 5, 5000);
// vacation.registerChild('Mitko', 10, 5500);
//
// console.log(vacation.toString());