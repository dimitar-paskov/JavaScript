const input = ['append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print'];

function solve (input) {
    let text = '';
    let result =  {
        append: (newText) => text += newText,
        removeStart: (count) => text = text.slice(count),
        removeEnd: (count) => text = text.slice(0, text.length - count),
        print: () => console.log(text)
    }


        function process(input) {
            for (item of input) {
                let tokens = item.split(' ');
                if (tokens.length > 1) {
                    let command = tokens[0];
                    let argument;
                    if (command === 'append') {
                        argument = tokens[1];
                    } else {
                        argument = +tokens[1];
                    }

                    result[command](argument);
                } else {
                    let command = tokens[0];
                    result[command]();
                }
            }
        }

        process(input);




};
solve(input);




