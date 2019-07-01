function solve(arr) {
    for (let i = 0; i < arr.length; i+=2){
        let x = arr[i];
        let y = arr[i+1];

        checkWhereIs(x,y);
    }

    function checkWhereIs(x,y) {
        if (1 <= x && x <= 3 && 1 <= y && y <= 3){
            console.log("Tuvalu");
        }else if (8 <= x && x <= 9 && 0 <= y && y <= 1){
            console.log("Tokelau");
        }else if (5 <= x && x <= 7 && 3 <= y && y <= 6){
            console.log("Samoa");
        } else if (0 <= x && x <= 2 && 6 <= y && y <= 8){
            console.log("Tonga");
        }else if (4 <= x && x <= 9 && 7 <= y && y <= 8){
            console.log("Cook");
        }else {
            console.log("On the bottom of the ocean");
        }
    }
}

solve([6, 4]);