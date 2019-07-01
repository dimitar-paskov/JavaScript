function solve(input) {
    let height = input[0];
    let width = input[1];
    let x = input[2];
    let y = input[3];

    let matrix = [];

    for (let i = 0; i < height; i++){
        let row = [];
        for (let j = 0; j < width; j++){
            let number = Math.max(Math.abs(x-i), Math.abs(y-j) )+1;
            row[j] = number;
        }
        matrix[i] = row;
    }

    matrix.forEach(x => console.log(x.join(" ")));

}

solve([5, 5, 2, 2])