const input = ['append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print'];

const operations = {
    current: '',
    append: function(newText) {
        this.current += newText;

        return this;
    },
    removeStart: function (count) {
        this.current = this.current.slice(count);

        return this
    },
    removeEnd: function (count) {
        this.current = this.current.slice(0, this.current.length - count);

        return this;
    },
    print: function () {
        console.log(this.current);

        return this;
    },
    execute: function (input) {
        input.forEach((el) => {
            const parts = el.split(' ');
            this[parts[0]].call(this, parts[1]);
        })
    },
}

operations.append("hello").append("again").removeEnd(2).print();


// let iife = function () {
//     let result = '';
//     return function (arr) {
//         let tokens = arr.splice(" ");
//         if (tokens.length > 1){
//             let command = tokens[0];
//             // if (command === 'append'){
//             //
//             // }
//             let value = tokens[1];
//
//         }
//
//     }
// }