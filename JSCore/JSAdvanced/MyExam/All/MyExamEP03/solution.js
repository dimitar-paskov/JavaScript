class Vacation {
    constructor(organizer, destination, budget) {

        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;

        this.kids = {}
    }

    registerChild(name, grade, budget) {

        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }

        if (!this.kids[grade]) {
            this.kids[grade] = [];
        }

        if (!this.kids[grade].includes(`${name}-${budget}`)) {
            this.kids[grade].push(`${name}-${budget}`);
        } else {
            return `${name} is already in the list for this ${this.destination} vacation.`
        }

    }

    removeChild(name, grade) {

        if (this.kids[grade]) {
            if (this.kids[grade].map(x => {
                return x.split('-')[0]
            }).includes(name)) {
                this.kids[grade] = this.kids[grade].filter(x => {
                    return x.split('-')[0] !== name
                });
                return this.kids[grade];
            } else {
                return `We couldn't find ${name} in ${grade} grade.`;
            }
        }else{
            return `We couldn't find ${name} in ${grade} grade.`;
        }

    }

    toString() {
        if (this.numberOfChildren > 0){
        let result = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;
        Object.keys(this.kids).filter(grade=>this.kids[grade].length>0).forEach(grade=>{
            result += `Grade: ${grade}\n`;
            this.kids[grade].forEach((name, index)=>{
                result += `${index+1}. ${name}\n`;
            });
        });
        return result;
        }else{
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }
    }

    get numberOfChildren() {
        return Object.values(this.kids).reduce((acc,curr)=>{
            acc += curr.length;
            return acc;
        }, 0);

    }
}


// let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
// console.log(vacation.numberOfChildren);
// vacation.registerChild('Gosho', 5, 2000);
// console.log(vacation.removeChild('Gosho', 5));
// console.log(vacation.numberOfChildren);
// vacation.registerChild('Gosho', 5, 2000);
//
// vacation.registerChild('Lilly', 6, 2100);
//
// console.log(vacation.removeChild('Gosho', 9));
//
// vacation.registerChild('Pesho', 6, 2400);
// console.log(vacation.registerChild('Gosho', 5, 2000));
//
// console.log(vacation.removeChild('Lilly', 6));
// console.log(vacation.removeChild('Pesho', 6));
// console.log(vacation.removeChild('Pesho', 6));
// console.log(vacation.registerChild('Tanya', 5, 6000))
//
// console.log(vacation.kids);
// console.log(vacation.numberOfChildren);

let vacation = new Vacation('Miss Elizabeth', 'Dubai', 2000);

vacation.registerChild('Gosho', 5, 3000);
vacation.registerChild('Lilly', 6, 1500);
vacation.registerChild('Pesho', 7, 4000);
vacation.registerChild('Tanya', 5, 5000);
vacation.registerChild('Mitko', 10, 5500);

console.log(vacation.toString());