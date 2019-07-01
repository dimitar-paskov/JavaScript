function solve(arr) {
    let x1 = arr[0];
    let y1 = arr[1];
    let x2 = arr[2];
    let y2 = arr[3];

    checkIfValid(x1,y1,0,0);
    checkIfValid(x2,y2,0,0);
    checkIfValid(x1,y1,x2,y2);



    function checkIfValid(x1, y1, x2, y2) {
        if (Number.isInteger(Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2)))){
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
        }else{
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
        }
    }

}

solve([2, 1, 1, 1]);