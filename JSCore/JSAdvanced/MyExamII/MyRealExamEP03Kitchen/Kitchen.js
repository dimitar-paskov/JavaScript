class Kitchen {
    constructor(budget) {
        this.budget = +budget;
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(products) {
        this.actionsHistory = [];
        products.forEach(p=>{
            let toArray = p.split(' ');
            // let [productName, productQuantity, productPrice] = p.split(' ');
            let productPrice = +toArray.pop();
            let productQuantity = toArray.pop();
            let productName = toArray.join('');

            if (this.budget >= +productPrice){
                if (!this.productsInStock[productName]){
                    this.productsInStock[productName] = 0;
                }

                this.productsInStock[productName] += +productQuantity;
                this.budget -= +productPrice;
                this.actionsHistory.push(`Successfully loaded ${productQuantity} ${productName}`);
            }else{
                this.actionsHistory.push(`There was not enough money to load ${productQuantity} ${productName}`);

            }


        });
        // console.log(this.productsInStock);
        return this.actionsHistory.join("\n");

    }

    addToMenu(meal, neededProducts, price) {


        if (!this.menu[meal]){
            this.menu[meal] = {price, ingredients:{}};
            neededProducts.forEach(p=>{
                // let [productName, productQuantity] = p.split(' ');
                let toArray = p.split(' ');
                let productQuantity = toArray.pop();
                let productName = toArray.join('');
                console.log(productName);

                this.menu[meal]['ingredients'][productName] = +productQuantity;

            });

             return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;

        } else{
             return `${meal} is already in our menu, try something different.`;
        }



    }

    showTheMenu() {
        let output = '';
        if (Object.keys(this.menu).length === 0){
            output =  'Our menu is not ready yet, please come later...';
        }else{
            Object.keys(this.menu).forEach(meal=>{
                output += `${meal} - $ ${this.menu[meal]['price']}\n`;
            })
        }

// console.log(this.menu);
// console.log(this.productsInStock);
// console.log(this.budget);
        return output+'\n';


    }

    makeTheOrder(meal) {
        if (!this.menu[meal]){
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        } else{
            if (Object.keys(this.menu[meal]['ingredients']).every(ingred =>{
                return this.menu[meal]['ingredients'][ingred] <= this.productsInStock[ingred];
            })){
                this.budget += +this.menu[meal]['price'];
                Object.keys(this.menu[meal]['ingredients']).forEach(ingred =>{
                    this.productsInStock[ingred] -= this.menu[meal]['ingredients'][ingred];
                })

                return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal]['price']}.`;

            }else{
                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
            }
        }


    }

}


let kitchen = new Kitchen(1000);
console.log(kitchen.showTheMenu());
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
console.log(kitchen.budget)

console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
console.log(kitchen.showTheMenu());
console.log(kitchen.makeTheOrder('frozenYogurt'));
console.log(kitchen.makeTheOrder('frozenYogurt'));
console.log(kitchen.showTheMenu());
console.log(kitchen.menu);
console.log(kitchen.makeTheOrder('Pizza'));
console.log(kitchen.showTheMenu());



