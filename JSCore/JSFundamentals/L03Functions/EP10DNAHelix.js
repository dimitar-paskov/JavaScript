

function solve(number) {

    let stars = (function () {
        let x = 2;
        let increase = true;
        return function () {
            let answer = "*".repeat(x);

            if (x === 2) {
                increase = false;
            }
            if (x === 0) {
                increase = true;
            }

            if (increase) {
                x++;
            } else {
                x--;
            }
            return answer;

        }
    })();

    let letter = (function () {
        let x = 0;
        let chars = "ATCGTTAGGG";
        return function () {
            let answer = chars[x];

            if (x === chars.length - 1) {
                x = -1;
            }
            x++;

            return answer;
        }
    })();


    let dashes = (function () {
        let x = 0;
        let increase = true;
        return function () {
            let answer = "-".repeat(x);

            if (x === 4) {
                increase = false;
            }
            if (x === 0) {
                increase = true;
            }

            if (increase) {
                x += 2;
            } else {
                x -= 2;
            }
            return answer;

        }
    })();


    let secondStars = (function () {
        let x = 2;
        let increase = true;
        return function () {
            let answer = "*".repeat(x);

            if (x === 2) {
                increase = false;
            }
            if (x === 0) {
                increase = true;
            }

            if (increase) {
                x++;
            } else {
                x--;
            }
            return answer;

        }
    })();


    for (let i = 0; i < number; i++) {
        console.log(stars() + letter() + dashes() + letter() + secondStars());
    }

}

solve(10);






