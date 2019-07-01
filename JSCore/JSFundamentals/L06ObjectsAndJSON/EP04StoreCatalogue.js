function main(input) {

    let catalogue = {};

    for (let i = 0; i < input.length; i++) {

        let [product, price] = input[i].split(" : ");
        let firstLetter = product.charAt(0);

        if (!catalogue.hasOwnProperty(firstLetter)){
            catalogue[firstLetter] = [];
        }

        let object = {};
        object[product] = price;


        catalogue[firstLetter].push(object);


    }

    for (let key of Object.keys(catalogue).sort()){
        console.log(key);
        for (let product of catalogue[key].map(obj => Object.keys(obj)).sort()){
            console.log("   "+ product + ": " + catalogue[key][catalogue[key].findIndex(x=>x.hasOwnProperty(product))][product])
        }
    }

}

main(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']);