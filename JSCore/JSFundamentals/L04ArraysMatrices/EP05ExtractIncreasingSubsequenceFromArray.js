function main(input) {

    let max = input[0];
    let answer = input.filter((item) => {
        if (item < max){
            return false;
        } else {
            max = item;
            return true;
        }
    });

    console.log(answer.join("\n"));

}

main([1,
    3,
    8,
    4,
    10,
    12,
    3,
    2,
    24])