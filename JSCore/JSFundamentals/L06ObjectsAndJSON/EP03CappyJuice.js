function main(input) {
    let order = [];

    let stock = {};

    for (let i = 0; i < input.length; i++){
        let [name ,quantity] = input[i].split(" => ");

        if (!stock.hasOwnProperty(name)) {
            stock[name] = {
                name: name,
                quantity: 0,
                hasBottles: false,
                bottles: 0
            }
        }

        stock[name].quantity += +quantity;
        if (stock[name].quantity >= 1000){
            if (!stock[name].hasBottles){
                order.push(name);
                stock[name].hasBottles = true;
            }

            stock[name].bottles += parseInt(stock[name].quantity / 1000);
            stock[name].quantity %= 1000;
        }

    }

    for (let i = 0; i < order.length; i++){
        console.log( order[i] + " => " + stock[order[i]].bottles);
    }

}

main(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549']);