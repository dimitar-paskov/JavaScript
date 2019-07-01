function EP12MultipleValuesForAKey(arr) {
    let map = [];
    for (let i = 0; i < arr.length; i++) {
        let tokens = arr[i].split(" ");
        let key = tokens[0];
        if (tokens.length >1){

            let value = tokens[1];
            if (map[key]===undefined){
               map[key] = [];
            }
            map[key].push(value);
        } else{
            if (map[key]!==undefined){
                console.log(map[key].join("\n"));

            } else{
                console.log("None");
            }
        }
    }

}


EP12MultipleValuesForAKey(["key value",
    "key eulav",
    "test tset",
    "brr"]);