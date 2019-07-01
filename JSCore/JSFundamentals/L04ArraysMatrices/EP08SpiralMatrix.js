function solve(x,y) {

    let count = 1;

    let rowMin = 0;
    let colMin = 0;

    let rowMax = x-1;
    let colMax = y-1;


    let matrix = [];

    for (let n=0;n<x;n++) {
        matrix[n] = [];
    }

    while (count <= x*y){
        for (let i = colMin; i <=colMax && count <= x*y; i++){
            matrix[rowMin][i] = count++;
        }
        rowMin++;

        for (let j = rowMin; j<= rowMax && count <= x*y; j++){
            matrix[j][colMax] = count++;
        }
        colMax--;

        for (let k = colMax; k >= colMin && count <= x*y; k--){
            matrix[rowMax][k] = count++;
        }
        rowMax--;

        for (let m = rowMax; m >= rowMin && count <= x*y; m--){
            matrix[m][colMin] = count++;
        }
        colMin++;


    }

    matrix.forEach(x => console.log(x.join(" ")));

}

solve(6,4);