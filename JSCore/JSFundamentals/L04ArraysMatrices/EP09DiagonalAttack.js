function solve(input) {
    let matrix = [];
    for (let i = 0; i < input.length; i++) {
        let curArr = input[i].split(" ").map(x => x.trim()).filter(x => x !== "");
        matrix[i] = curArr;
    }

    let mainDiagonal = matrix.reduce((acc, cur, index) => {
        acc += +matrix[index][index];
        return acc;
    }, 0);
    let secondDiagonal = matrix.reduce((acc, cur, index) => {
        acc += +matrix[index][input.length - 1 - index];
        return acc;
    }, 0);

    if (mainDiagonal === secondDiagonal) {
        let newM = matrix.map((arr, i) => {
            return arr.map((item, j) => {
                if (i === j || (i + j === arr.length - 1)) {
                    return item;
                } else {
                    return mainDiagonal;
                }
            })
        });
        newM.forEach(x => console.log(x.join(" ")));

    } else {
        matrix.forEach(x => console.log(x.join(" ")));
    }


}


solve(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1'])