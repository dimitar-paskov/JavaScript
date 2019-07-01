function solve(input) {

let svgPattern = /<svg>(.|\n)*?<\/svg>/g;
let pattern = /<svg>(\s|\n)*?<cat><text>.*?\[((.|\n)*?)]((.|\n)*?)<\/text><\/cat>(\s|\n)*?<cat>(.|\n)*?<g><val>(\d|10)<\/val>(\d+)<\/g>(.|\n)*?<\/cat>(\s|\n)*?<\/svg>/g;
let dataPattern = /<g>(\s|\n)*?<val>(\d|10)<\/val>(\d+)<\/g>/g;

let svgMatch = input.match(svgPattern);
    if (!svgMatch){
        console.log("No survey found");
    }else {

        let fullMatch = pattern.exec(svgMatch);
        let label;
        if (!fullMatch){
            console.log("Invalid format");
        }else{
            label = fullMatch[2];
            let sum = 0;
            let avgCount = 0;
            let matches = dataPattern.exec(fullMatch[0]);
            while (matches){
                let value = +matches[2];
                let count = +matches[3];

                sum += value * count;
                avgCount += count;

                matches = dataPattern.exec(fullMatch[0]);
            }
            console.log(`${label}: ${+(sum/avgCount).toFixed(2)}`);
        }

    }

}

 solve("<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat></svg><p>Some more random text</p>")
solve("<svg>\n" +
    "<cat><text>Which is your favourite meal from our selection?</text></cat>\n" +
    "<cat>\n" +
    "<g><val>1</val>15</g>\n" +
    "<g><val>2</val>31</g>\n" +
    "<g><val>Crab Langoon</val>12</g>\n" +
    "<g><val>Calamari</val>17</g>\n" +
    "</cat>\n" +
    "</svg>")