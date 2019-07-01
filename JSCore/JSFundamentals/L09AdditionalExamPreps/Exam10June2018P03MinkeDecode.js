function solve(input) {

    let startIdx = +input[0];
    let endIDX = +input[1];
    let change = input[2];
    let str = input[3];

    let patternCountry = /[A-Z][a-z]+[A-Z]/g;
    let patternDigits = /\d{3}(\.\d+)*/g;

    let country;
    let matches = patternCountry.exec(str);
    // console.log(matches);
    if (matches) {
        country = Array.from(matches[0]);

        country = country.map((x, i) => {
            if (i === country.length - 1) {
                x = x.toLowerCase();
            }
            return x;
        });

        country.splice(startIdx, endIDX - startIdx + 1, Array.from(change));
        country = country.join("").replace(/,/g, '');
    }

    let town = [];
    matches = patternDigits.exec(input);
    while (matches) {
        let number = Math.ceil(+matches[0]);
        town.push(number);
        matches = patternDigits.exec(input);
    }
    town = town.map(x => String.fromCharCode(x))
        .map((x, i) => {
            if (i === 0) {
                x = x.toUpperCase();
            }

            if (i === (town.length - 2)) {
                x = x.toLowerCase();
            }
            return x;
        })
        .join("");

    console.log(`${country} => ${town}`);
}

solve(["3", "5", "gar", "114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"]);
solve(["1", "4", "loveni", "SerbiA 67 – sDf1d17ia aTe 1, 108 confin$4%#ed likewise it humanity  Bulg35aria - VarnA railLery1a0s1 111 an unpacked as 109 he"]);