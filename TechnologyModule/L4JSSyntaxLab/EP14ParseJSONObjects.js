function EP14ParseJSONObjects(arr) {
    for (let i = 0; i < arr.length; i++) {
        let obj = JSON.parse(arr[i]);

        for (let key in obj) {
            console.log(`${key[0].toUpperCase()}${key.substring(1)}: ${obj[key]}`)
        }

    }

}

EP14ParseJSONObjects(['{"name":"Gosho","age":10,"date":"19/06/2005"}',
    '{"name":"Tosho","age":11,"date":"04/04/2005"}']);

