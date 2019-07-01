function solve(arr) {

    let totalIncome = 0;
    for (let i = 0; i < arr.length; i++) {
        let tokens = arr[i].split(", ");

        let j = 0;
        let coinsInserted = +tokens[j++];
        let drinkPrice = 0;
        let typeOfDrink = tokens[j++];


        let typeOfCoffe = '';
        if (typeOfDrink === 'coffee') {
            typeOfCoffe = tokens[j++];
            if (typeOfCoffe === "caffeine") {
                drinkPrice = 0.8;
            } else if (typeOfCoffe === "decaf") {
                drinkPrice = 0.9
            }
        } else if (typeOfDrink === "tea") {
            drinkPrice = 0.8;
        }

        let milk = '';
        let milkPrice = 0;
        if (tokens[j] === 'milk') {
            milk = 'milk';
            milkPrice = +(drinkPrice * 0.1).toFixed(1);
            j++;
        }

        let sugarValue = +tokens[j];
        let sugarPrice = 0;
        if (sugarValue) {
            sugarPrice = 0.1;
        }

        let price = drinkPrice + milkPrice + sugarPrice;
        let change = Math.abs((coinsInserted - price).toFixed(2));

        if (coinsInserted >= price) {
            console.log(`You ordered ${typeOfDrink}. Price: ${price.toFixed(2)}$ Change: ${change.toFixed(2)}$`);
            totalIncome += price;
        } else {
            console.log(`Not enough money for ${typeOfDrink}. Need ${change.toFixed(2)}$ more.`);
        }
    }

    console.log(`Income Report: ${totalIncome.toFixed(2)}$`)


}


// solve(['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2',
//     '1.00, coffee, decaf, 0']);
solve(['8.00, coffee, decaf, 4',
    '1.00, tea, 2']);