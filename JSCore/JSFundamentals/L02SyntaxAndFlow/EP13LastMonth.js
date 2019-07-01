function solve(arr) {

    let date = new Date(arr[2], arr[1]-1, 0);
    console.log(date.getDate());

}

solve([1, 3, 2000]);