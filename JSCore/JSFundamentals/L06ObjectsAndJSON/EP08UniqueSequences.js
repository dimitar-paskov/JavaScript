function main(input) {
    let mySet = new Set();

    input
        .map( x => Array.from(JSON.parse(x)).sort((a,b) => b-a))
        .map(x => JSON.stringify(x))
        .forEach( x=> mySet.add(x));

    Array.from(mySet)
        .sort((a,b) => a.split(',').length - b.split(',').length)
        .forEach(x =>
            console.log(`[${Array.from(JSON.parse(x)).join(", ")}]`))

}

main(["[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13000000]",
    "[10, 1, -17, 0, 2, 12000000]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"])