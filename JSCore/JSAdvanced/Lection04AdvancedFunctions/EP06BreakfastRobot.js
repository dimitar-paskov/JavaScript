let manager = (function solution(){
    let ingredientsAvailable = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0,
    }

    let recepies = {
        apple:{
            carbohydrate: 1,
            flavour: 2,
        },
        coke:{
            carbohydrate:10,
            flavour:20,
        },
        burger:{
            carbohydrate: 5,
            fat: 7,
            flavour:3,
        },
        omelet:{
            protein: 5,
            fat: 1,
            flavour: 1,
        },
        cheverme:{
            protein: 10,
            carbohydrate: 10,
            fat:10,
            flavour:10,
        },
    }

    return function (input) {
        let parts = input.split(' ');
        let command = parts[0].trim();



        let commands = {
            restock: function (item, qty) {
                ingredientsAvailable[item] += qty;
               return "Success";
            },
            prepare: function (item, qty) {
                let result = '';
                 if(Object.keys(recepies[item]).reduce((acc,curr)=>{

                         let isAvailable = (recepies[item][curr]*qty <= ingredientsAvailable[curr]);
                         if (!isAvailable && acc){
                             acc = false;
                             result =  `Error: not enough ${curr} in stock`;

                         }


                     return acc;



                 },true)){
                     Object.keys(recepies[item]).forEach(x=>{
                         ingredientsAvailable[x] -= recepies[item][x]*qty;
                     });


                     return "Success";
                 }else{
                     return result;
                 }

            },
            report: function () {
                 return Object.keys(ingredientsAvailable).reduce((acc, curr) => {
                    acc += `${curr}=${ingredientsAvailable[curr]} `;
                    return acc;
                }, "").slice(0, -1);
            }
        }

        if (parts.length > 1){
            let item = parts[1].trim();
            let qty = +parts[2].trim();
            return commands[command](item, qty);

        }else if (parts.length === 1){
            return commands[command]();

        }
    }



}());
// console.log(manager("prepare cheverme 1"));
// console.log(manager("restock protein 10"));
// console.log(manager("prepare cheverme 1"));
// console.log(manager("restock carbohydrate 10"));
// console.log(manager("prepare cheverme 1"));
// console.log(manager("restock fat 10"));
// console.log(manager("prepare cheverme 1"));
// console.log(manager("restock flavour 10"));
// console.log(manager("prepare cheverme 1"));
// console.log(manager("report"));

console.log(manager("restock protein 100"));
console.log(manager("restock carbohydrate 100"));
console.log(manager("restock fat 100"));
console.log(manager("restock flavour 100"));
console.log(manager("report"));
console.log(manager("prepare omelet 2"));
console.log(manager("report"));
console.log(manager("prepare omelet 1"));
console.log(manager("report"));



// manager("restock flavour 50");
// manager("prepare coke 4");
// manager("print");