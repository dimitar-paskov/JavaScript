function solve(inches) {
    let feet = parseInt(inches / 12);
    let inchesRemainder = inches % 12;

    console.log(feet + `'-` + inchesRemainder +`"`);
}

solve(55)