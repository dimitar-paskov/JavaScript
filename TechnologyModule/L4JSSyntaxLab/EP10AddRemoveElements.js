function EP10AddRemoveElements(arr) {
    let array = [];
    for (let i = 0; i < arr.length; i++) {
        let tokens = arr[i].split(" ");
        let command = tokens[0];
        let value = Number(tokens[1]);
        switch (command) {
            case "add":{array.push(value);break;}
            case "remove": {array.splice(value, 1);break;}
        }
    }

    console.log(array.join("\n"))

}


EP10AddRemoveElements(["add 3",
    "add 5",
    "remove 4",
    "remove -2", //?????
    "add 7"]);