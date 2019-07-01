function main(text) {
    let splitted = text.split(" ");
    splitted = splitted.map(s => s.toLowerCase()).map(s => s.charAt(0).toUpperCase() + s.slice(1));
    console.log(splitted.join(" "));

}

main('Was that Easy? tRY thIs onE for SiZe!')