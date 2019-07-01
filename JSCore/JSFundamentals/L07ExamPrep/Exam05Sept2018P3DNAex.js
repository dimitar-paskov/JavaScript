function main(input) {
    let book = {};
    let i = 0;
    while (input[i] !== "Stop!"){
        let regex = /([a-z!@?#$]+)(=\d+)(--\d+)(<<[a-z]+)/g;



            let matches = regex.exec(input[i]);
            if (matches){

                let genomeName = matches[1]
                    .replace(/\!/g, '')
                    .replace(/\?/g, '')
                    .replace(/@/g, '')
                    .replace(/#/g, '')
                    .replace(/\$/g, '')
                // console.log(genomeName);

                let length = +matches[2].replace(/=/g, '');
                // console.log(length);

                let countOfGenes = +matches[3].replace(/--/g, '');
                // console.log(countOfGenes);

                let organism = matches[4].replace(/<</g, "");
                // console.log(organism);

                if (genomeName.length === length){
                    if (!book[organism]){
                        book[organism] = {totalGenes:0};
                    }

                    if (!book[organism][genomeName]){
                        book[organism][genomeName] = countOfGenes;
                        book[organism]['totalGenes'] += countOfGenes;
                    }
                }
            }


        i++;

    }

    Object.keys(book).sort((a,b) => {
        return book[b]['totalGenes'] - book[a]['totalGenes'];
    }).forEach(x=>{
        console.log(`${x} has genome size of ${book[x]['totalGenes']}`)
    })

}

// main(['!@ab?si?di!a@=7--152<<human',
//     'b!etu?la@=6--321<<dog',
//     '!curtob@acter##ium$=14--230<<dog',
//     '!some@thin@g##=9<<human',
//     'Stop!',])
// main(['=12<<cat',
//     '!vi@rus?=2--142',
//     '?!cur##viba@cter!!=11--800<<cat',
//     '!fre?esia#=7--450<<mouse',
//     '@pa!rcuba@cteria$=13--351<<mouse',
//     '!richel#ia??=8--900<<human',
//     'Stop!',])
main(['!@ру?би#=4--57<<polecat',
    '?do?@#ri#=4--89<<polecat',
    '=12<<cat',
    '!vi@rus?=2--142',
    '@pa!rcu>ba@cteria$=13--234<<mouse',
    '?!cur##viba@cter!!=11--680<<cat',
    'Stop!',])
