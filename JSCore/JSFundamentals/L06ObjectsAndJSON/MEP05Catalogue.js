function main(input) {

    let catalogue = {};

    for (let i = 0; i < input.length; i++) {

        let [product, price] = input[i].split(" : ");
        product = product.trim();
        price = +price.trim();
        let firstLetter = product.charAt(0).toUpperCase();

        if (!catalogue[firstLetter]){
            catalogue[firstLetter] = {};
        }

        catalogue[firstLetter][product] = +price;

    }

    Object.keys(catalogue).sort().forEach( x=> {
        console.log(x);
        Object.keys(catalogue[x]).sort().forEach(y=>{
            console.log(`${y}: ${catalogue[x][y]}`)
        })
    })

}

// main(['Appricot : 20.4',
//     'Fridge : 1500',
//     'TV : 1499',
//     'Deodorant : 10',
//     'Boiler : 300',
//     'Apple : 1.25',
//     'Anti-Bug Spray : 15',
//     'T-Shirt : 10']);
main(['Banana : 2',
    "Rubic's Cube : 5",
    "RAbic's Cube : 5",
    'Raspberry P : 4999',
    'Rolex : 100000',
    'Rollon : 10',
    'Rali Car : 2000000',
    'Pesho : 0.000001',
    'Barrel : 10']);