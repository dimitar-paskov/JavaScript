function main(input) {

    let result = input
        .filter((item, index)=> {
        return (index % input[input.length-1] === 0 && index !== input.length-1);
    })

    console.log(result.join("\n"));

}

main(["5",
    "20",
    "2"])