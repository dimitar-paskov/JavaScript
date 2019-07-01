function main(arr) {

    let pattern = /www\.[A-Za-z-0-9]+(\.[a-z]+)+/g;
    let matches = [];

    for (let i = 0; i < arr.length; i++){
        let match = arr[i].match(pattern);
        if (match){

            for (let j = 0 ; j < match.length; j++){

                matches.push(match[j]);
            }
        }
    }

    console.log(matches.join("\n"));

}

main(['Need information about cheap hotels in London?',
    'You can check us at www.london-hotels.co.uk!',
    'We provide the best services in London.',
    'Here are some reviews in some blogs:',
    '"London Hotels are awesome!" - www.indigo.bloggers.com',
    '"I am very satisfied with their services" - ww.ivan.bg',
    '"Best Hotel Services!" - www.rebel21.sedecrem.moc'] )