function EP03MultiplyDivideANumber(arr) {
    let n = Number(arr[0]);
    let x = Number(arr[1]);
    let result;
    if (n > x) {
        result = n / x;
    } else {
        result = n * x;
    }

    console.log(result);
}

EP03MultiplyDivideANumber(["0", "0"]);