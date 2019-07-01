function solve(){
    let matrix = [[1,2], [3,4]];

    let matrixCopy = matrix.map((m) =>{
        return m.map((inner) => {
            return inner+1;
        });
    });

    console.log(matrixCopy);

}

solve();
