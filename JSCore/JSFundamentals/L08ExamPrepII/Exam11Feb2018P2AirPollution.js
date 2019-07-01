function main(arr, forces) {

    let arrCopy = [];

    for (let i = 0; i < arr.length; i++){
        let tokens = arr[i].split(" ");
        for (let j = 0; j < tokens.length; j++){
            tokens[j] =  +tokens[j]
        }
        arrCopy[i] = tokens;
    }

    for (let i = 0; i < forces.length; i++){
        let tokens = forces[i].split(" ");
        let force = tokens[0];
        let value = tokens[1];

        if (force === "breeze"){
            arrCopy[value] = arrCopy[value].map( x=> {
                if (x-15 >= 0 ){
                    x = x-15
                } else{
                    x = 0;
                }

                return x;
            })


        }else if (force === "gale") {
            arrCopy.forEach( (x,i)=> {
                if (arrCopy[i][value] - 20 >= 0){
                    arrCopy[i][value] -= 20;
                } else{
                    arrCopy[i][value] = 0;
                }
            })

        }else if (force === "smog") {
            arrCopy.map((x,i) =>{
                x.map((y, j)=> {
                    arrCopy[i][j] += +value;
                })

            })


        }
    }


    let answer = [];
    arrCopy.map((x,i) => {
        x.map((y,j) => {
            if (arrCopy[i][j] >= 50){
                answer.push(`[${i}-${j}]`);
            }
        })
    });

    if (answer.length > 0){

        console.log(`Polluted areas: ${answer.join(", ")}`);
    } else{
        console.log("No polluted areas")
    }


}

// main([
//         "5 7 72 14 4",
//         "41 35 37 27 33",
//         "23 16 27 42 12",
//         "2 20 28 39 14",
//         "16 34 31 10 24",
//     ],
//     ["breeze 1", "gale 2", "smog 25"])
main([
        "5 7 3 28 32",
        "41 12 49 30 33",
        "3 16 20 42 12",
        "2 20 10 39 14",
        "7 34 4 27 24",
    ],
    [
        "smog 11", "gale 3",
        "breeze 1", "smog 2"
    ]);