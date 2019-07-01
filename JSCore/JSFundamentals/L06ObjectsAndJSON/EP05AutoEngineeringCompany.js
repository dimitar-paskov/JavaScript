function main(input) {

    let register = new Map();

    for (let i = 0; i < input.length; i++){
        let [carBrand, carModel, producedCars] = input[i].split(" | ");

        if (!register.has(carBrand)){
            register.set(carBrand, new Map());
        }

        if (!register.get(carBrand).has(carModel)){
            register.get(carBrand).set(carModel, 0);
        }

        register.get(carBrand).set(carModel, register.get(carBrand).get(carModel) + +producedCars );


    }

    register.forEach((value, key) => {console.log(key);
            value.forEach( (x,y) => {
                console.log(`###${y} -> ${x}`);
            })
    })

}

main(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'])