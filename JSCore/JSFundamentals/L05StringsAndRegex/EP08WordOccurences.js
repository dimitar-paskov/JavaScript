function main(text, word) {
    let pattern = new RegExp("\\b" + word +"\\b", "ig");
    let matches = text.match(pattern);

    if (matches != null) {
        console.log(matches.length);
    }else{
        console.log("0")
    }

}

main('There was one. Therefore I bought it. I wouldn’t buy it otherwise.',
    'there')