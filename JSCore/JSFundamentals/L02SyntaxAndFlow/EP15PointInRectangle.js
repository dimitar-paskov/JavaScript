function solve(arr) {
    let [x,y,xMin, xMax, yMin, yMax] = arr;
    
    if (xMin <= x && x <= xMax && yMin <= y && y <= yMax){
        console.log("inside");
    }else{
        console.log("outside");
    }

}

solve([12.5, -1, 2, 12, -3, 3]);
solve([8,
    -1,
    2,
    12,
    -3,
    3]);