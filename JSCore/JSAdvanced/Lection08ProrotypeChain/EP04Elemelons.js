function solve() {


    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
            if (this.constructor === Melon) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
            this.weight = weight;
            this.melonSort = melonSort;
        }

        toString() {
            let kind = this.constructor.name.replace("melon", '');
            let result = `Element: ${kind}` + '\n' +
                `Sort: ${this.melonSort}` + '\n'
                + `Element Index: ${this.elementIndex()}`;
            return result;
        }

    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }

        elementIndex() {
            return this.weight * this.melonSort.length;
        }


    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }

        elementIndex() {
            return this.weight * this.melonSort.length;
        }


    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }

        elementIndex() {
            return this.weight * this.melonSort.length;
        }


    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }

        elementIndex() {
            return this.weight * this.melonSort.length;
        }


    }

    class Melolemonmelon extends Watermelon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.constructor = Watermelon;
        }

        morph() {
            let kind = this.constructor.name.replace("melon", '');
            if (kind === "Water") {
                this.constructor = Firemelon;
            } else if (kind === "Fire") {
                this.constructor = Earthmelon;
            } else if (kind == "Earth") {
                this.constructor = Airmelon;
            } else {
                this.constructor = Watermelon;
            }
        }
    }

    return {Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon}

}

// let test = new Melon(100, "Test");
//Throws error

let watermelon = new Watermelon(12.5, "Kingsize");
console.log(watermelon.toString());

// Element: Water
// Sort: Kingsize
// Element Index: 100

let melolemonmelon = new Melolemonmelon(50, "nqkoj si");
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());
melolemonmelon.morph();
console.log(melolemonmelon.toString());