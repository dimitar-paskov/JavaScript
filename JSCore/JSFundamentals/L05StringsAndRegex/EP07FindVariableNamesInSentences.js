function main(text) {
    let pattern = /\b(_)([A-Za-z0-9]+)\b/g;
   
    let match = pattern.exec(text);
    let matches = [];

    while (match){

        matches.push(match[2]);
        match = pattern.exec(text);

    }

    console.log(matches.join(","));

}

main('Calculate the _area of the _perfectRectangle object.');