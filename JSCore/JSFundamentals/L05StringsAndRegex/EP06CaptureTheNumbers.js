function main(arr) {


    let pattern = /\d+/g;
    let text = arr.join(' ');
    let numbers = text.match(pattern);

    console.log(numbers.join(" "));


}

main(['123a456',
    '789b987',
    '654c321',
    '0']);