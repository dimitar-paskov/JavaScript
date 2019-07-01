function solve(arr) {
    let key1 = arr[0];
    let value1 = arr[1];
    let key2 = arr[2];
    let value2 = arr[3];
    let key3 = arr[4];
    let value3 = arr[5];

    let obj = {
    };

    obj[key1] = value1;
    obj[key2] = value2;
    obj[key3] = value3;

    console.log(obj);

}

solve(['ssid', '90127461', 'status', 'admin', 'expires', '600']);