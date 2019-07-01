function solve(arr) {
    let x1 = arr[0];
    let y1 = arr[1];
    let x2 = arr[2];
    let y2 = arr[3];
    let x3 = arr[4];
    let y3 = arr[5];

    let distance1to2 = getDistance(x1,y1,x2,y2);
    let distance2to3 = getDistance(x2,y2,x3,y3);
    let distance3to1 = getDistance(x3,y3,x1,y1);


    let longestSide = Math.max(distance1to2, distance2to3, distance3to1);


    if (longestSide === distance3to1){
        console.log(`1->2->3: ${distance1to2 + distance2to3}`);
    }else if (longestSide === distance1to2){
        console.log(`1->3->2: ${distance2to3 + distance3to1}`);
    }else if (longestSide === distance2to3){
        console.log(`2->1->3: ${distance1to2 + distance3to1}`);
    }


    function getDistance(x1,y1,x2,y2) {
        return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1, 2));
    }
}

solve([-1, -2, 3.5, 0, 0, 2]);