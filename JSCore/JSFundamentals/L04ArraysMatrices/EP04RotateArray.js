function main(input) {

    let rotations = +input[input.length-1];
    rotations = rotations % (input.length-1);
    let answer = [].concat(input);
    answer.pop();

    for (let i = 0; i < rotations; i++){
        let element = answer.pop();
        answer.unshift(element);
    }

    console.log(answer.join(" "));
}

main(["Banana",
    "Orange",
    "Coconut",
    "Apple",
    "15"])