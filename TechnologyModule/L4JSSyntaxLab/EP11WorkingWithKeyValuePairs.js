function EP11WorkingWithKeyValuePairs(arr) {
    let map = [];
    for (let i = 0; i < arr.length; i++) {
        let tokens = arr[i].split(" ");
        let key = tokens[0];
        if (tokens.length >1){
            let value = tokens[1];
            map[key] = value;
        } else{
            if (map[key]!==undefined){
            console.log(map[key]);

            } else{
                console.log("None");
            }
        }
    }

}

EP11WorkingWithKeyValuePairs(["key value",
    "key eulav",
    "test tset",
    "brr"]);