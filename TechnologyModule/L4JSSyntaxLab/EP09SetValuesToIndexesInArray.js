function EP09SetValuesToIndexesInArray(arr) {
    let n = Number(arr[0]);
    let newArr = [];
    newArr.length = n;
    newArr.fill(0);
    for (let i = 1; i < arr.length; i++) {
        let smallArr = arr[i].split(" - ");
        let index = smallArr[0];
        let value = smallArr[1];

        newArr[index] = value;
    }

    console.log(newArr.join("\n"))

}

EP09SetValuesToIndexesInArray(["5",
    "0 - 3",
    "3 - -1",
    "4 - 2"]);