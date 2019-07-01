function solve(arr) {
    let speed1 = arr[0];
    let speed2 = arr[1];
    let time = arr[2];

    let dist1 = (speed1/3.6)*time;
    let dist2 = (speed2/3.6)*time;

    let dist = Math.abs(dist1 - dist2);

    console.log(dist)

}

solve([5, -5, 40]);