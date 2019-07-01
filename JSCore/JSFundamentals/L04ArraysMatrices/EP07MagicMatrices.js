function main(input) {
    let magicNumber = input[0].reduce((acc, cur) => {
        acc += cur;
        return acc;
    });


    for (let i = 0; i < input.length; i++) {
        if (input[i].reduce((acci, current) => {
            acci += current;
            return acci;
        }) !== magicNumber) {
            console.log(false);
            return;
        }
        if (input.reduce((acc, cur, index) => {
            acc += cur.reduce((theElem, curr, j) => {
                if (i=== j){
                    theElem = curr;
                }
                return theElem;
            },0);
            return acc;
        },0) !== magicNumber){
            console.log(false);
            return;
        }
    }

    console.log(true);
    return


}

main([[1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]])