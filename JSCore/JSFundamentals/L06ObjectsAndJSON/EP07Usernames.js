function main(input) {
    let nameCatalog = new Set();

    input.forEach(x=>nameCatalog.add(x));
    Array.from(nameCatalog)
        .sort((a,b) => a.length - b.length || a.localeCompare(b))
        .forEach(x => console.log(x));

}

main(['Denise',
    'Ignatius',
    'Iris',
    'Isacc',
    'Indie',
    'Dean',
    'Donatello',
    'Enfuego',
    'Benjamin',
    'Biser',
    'Bounty',
    'Renard',
    'Rot']);