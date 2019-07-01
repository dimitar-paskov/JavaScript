function main(input) {
    let delimiter = input[input.length-1];
    input.pop();

    let result = input
        .map(item => {return item + delimiter})
        .filter(x=> x!==input[input.length-1])
        .reduce((acc, cur) => {return acc.concat(cur);},"");
    result = result.slice(0,result.length-1);


    console.log(result);
}

main(["One",
    "Two",
    "Three",
    "Four",
    "Five",
    "-"]);