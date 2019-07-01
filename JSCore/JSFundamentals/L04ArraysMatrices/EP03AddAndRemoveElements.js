function main(input) {
    let sequence = (function () {
        let x = 1;
        return function () {
            return x++;
        }
    })();

    let result = input
        .map((item, index, arr) => {
            return sequence();

        });

    for (let i = 0, j = 0; i < input.length; i++, j++) {
        if (input[i] === "remove") {
            if (j === 0) {
                result.splice(0, 1);
                j--;
            } else {
                result.splice(j - 1, 2);
                j -= 2;
                if (j < -1) {
                    j = -1;
                }
            }
        }
    }

    if (result.length > 0) {
        console.log(result.join("\n"));
    } else {
        console.log("Empty");
    }


}

main(["add", "add", "remove", "remove", "remove", "add"]);