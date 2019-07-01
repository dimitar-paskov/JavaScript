function solve(arr) {
    let number = arr[0];
    let precision = arr[1]>15 ? 15 : arr[1];

    let result = number.toFixed(precision);

    console.log((result*1).toString());

}

solve([3.1415926535897932384626433832795, 2]);