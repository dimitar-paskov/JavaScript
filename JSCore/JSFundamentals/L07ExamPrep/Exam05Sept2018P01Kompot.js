function main(input) {


    let neededPeachesForOneKompot = 2.5 * 140;
    let neededPlumsForOneKompot =  10 * 20;
    let neededCherriesForOneKompot = 25 * 9;

    let availableCherries = 0;
    let availablePlums = 0;
    let availablePeaches = 0;
    let fruitForRakia = 0;

    for (line of input){
        let [fruit, quantity] = line.split(/\s+/gm);
        if (fruit==='cherry'){
            availableCherries += +quantity * 1000;
        }else if (fruit==='plum'){
            availablePlums += +quantity * 1000;
        }else if (fruit==='peach'){
            availablePeaches += +quantity * 1000;
        }else {
            fruitForRakia += +quantity * 1000;
        }

    }

    let a = availablePlums / neededPlumsForOneKompot;
    console.log(`Cherry kompots: ${Math.floor(availableCherries / neededCherriesForOneKompot)}`)
    console.log(`Peach kompots: ${Math.floor(availablePeaches / neededPeachesForOneKompot)}`)
    console.log(`Plum kompots: ${Math.floor(availablePlums / neededPlumsForOneKompot)}`)
    console.log(`Rakiya liters: ${(fruitForRakia / 5000).toFixed(2)}`)



    //console.log(availableFruits);
}

main([ 'cherry 1.2',
    'peach 2.2',
    'plum 5.2',
    'peach 0.1',
    'cherry 0.2',
    'cherry 5.0',
    'plum 10',
    'cherry 20.0' ,
    'papaya 20' ]);