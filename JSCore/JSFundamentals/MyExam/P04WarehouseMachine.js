function solve(input) {
    let store = {};

    for (let i = 0; i < input.length; i++){
        let tokens = input[i].split(", ");
        let dateStr = 'date';
        let quantityStr = 'quantity';
        if (tokens.length > 1){
            let command = tokens[0];
            let brand = tokens[1];
            let type = tokens[2];
            let date = tokens[3];
            let quantity = +tokens[4];

            if (command === 'IN'){
                if (!store[brand]){
                    store[brand] = {};
                }

                if (!store[brand][type]){
                    store[brand][type] = { date, quantity};
                }else{
                    if (store[brand][type][dateStr] === date){
                        store[brand][type][quantityStr] += quantity;

                    } else if (store[brand][type][dateStr] < date){
                        store[brand][type][dateStr] = date;
                        store[brand][type][quantityStr] = quantity;
                    }
                }

            }else if (command === 'OUT'){
                if (store[brand]) {
                    if (store[brand][type]) {
                        if (store[brand][type][dateStr] >= date) {
                            if (store[brand][type][quantityStr] >= quantity) {
                                store[brand][type][quantityStr] -= quantity;
                            }
                        }
                    }
                }

            }
            
        } else if (tokens.length === 1 ){
            let command = tokens[0];
            if (command === 'REPORT') {
                console.log('>>>>> REPORT! <<<<<');
                Object.keys(store).forEach(x=>{
                    console.log(`Brand: ${x}:`);
                    Object.keys(store[x]).forEach( y=>{
                        console.log(`-> ${y} -> ${store[x][y][dateStr]} -> ${store[x][y][quantityStr]}.`)
                    })
                })
            }else if (command === 'INSPECTION') {
                console.log('>>>>> INSPECTION! <<<<<');
                Object.keys(store).sort().forEach(x=>{
                    console.log(`Brand: ${x}:`);
                    Object.keys(store[x]).sort((a,b)=>{
                        return store[x][b][quantityStr] - store[x][a][quantityStr];
                    }).forEach( y=>{
                        console.log(`-> ${y} -> ${store[x][y][dateStr]} -> ${store[x][y][quantityStr]}.`)
                    })
                })


            }

        }
    }

}

solve([
    "IN, Batdorf & Bronson, Espresso, 2025-05-25, 20",
    "IN, Folgers, Black Silk, 2023-03-01, 14",
    "IN, Lavazza, Crema e Gusto, 2023-05-01, 5",
    "IN, Lavazza, Crema e Gusto, 2023-05-02, 5",
    "IN, Folgers, Black Silk, 2022-01-01, 10",
    "IN, Lavazza, Intenso, 2022-07-19, 20",
    "IN, Aatdorf & Bronson, Espresso, 2025-05-25, 20",
    "OUT, Dallmayr, Espresso, 2022-07-19, 5",
    "OUT, Dallmayr, Crema, 2022-07-19, 5",
    "OUT, Lavazza, Crema e Gusto, 2020-01-28, 2",
    "REPORT",
    "INSPECTION",
])