function main(text, delimiter) {

    let splittedElements = text.split(delimiter);
    console.log(splittedElements.join("\n"));
}

main('One-Two-Three-Four-Five', '-')