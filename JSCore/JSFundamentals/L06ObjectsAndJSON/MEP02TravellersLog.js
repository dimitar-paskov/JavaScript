function solve(input) {
    let travellLog = {};

    for (let i = 0; i < input.length; i++) {
        if (input[i].indexOf(" visited the ") === -1) {
            let tokens = input[i].split(" gets ");
            let name = tokens[0].trim();
            let money = +tokens[1].trim();
            if (!travellLog[name]) {
                travellLog[name] = {money: 0}
            }

            travellLog[name]["money"] += +money;
        } else {
            let tokens = input[i].split(" visited the ");
            let name = tokens[0].trim();
            tokens = tokens[1].split(" in ");
            let landmark = tokens[0].trim();
            tokens = tokens[1].split(" - ");
            let country = tokens[0].trim();
            let cost = +tokens[1].trim();


            // let matches = /([a-zA-Z]+) visited the ([a-zA-Z]+) in ([a-zA-Z]+) - (\d+)/.exec(input[i]);
            // if (matches !== null) {
            //     let name = matches[1];
            //     let landmark = matches[2];
            //     let country = matches[3];
            //     let cost = Number(matches[4]);

            if (travellLog[name]) {
                if (travellLog[name]['money'] >= cost) {


                    if (!travellLog[name][country]) {
                        travellLog[name][country] = new Set();
                    }

                    if (!travellLog[name][country].has(landmark)) {
                        travellLog[name][country].add(landmark);
                        travellLog[name]["money"] -= cost;
                    } else {
                        continue;
                    }
                } else {
                    if (!travellLog[name][country] || !travellLog[name][country] || !travellLog[name][country].has(landmark)) {
                        console.log(`Not enough money to visit ${landmark}`);
                    } else {

                    }
                }

            } else {
                travellLog[name] = {money: 0}
                console.log(`Not enough money to visit ${landmark}`);
            }

        }

    }

    Object.keys(travellLog).sort((a, b) => {
        return Object.keys(travellLog[b]).length - Object.keys(travellLog[a]).length
    }).forEach(x => {
        console.log(`${x} visited ${Object.keys(travellLog[x]).length - 1} countries and has ${travellLog[x]["money"]} money left`);
        Object.keys(travellLog[x]).filter(x => x !== 'money').sort((a, b) => {
            return travellLog[x][b].size - travellLog[x][a].size
        }).forEach(y => {
            console.log(`- ${y} -> ${travellLog[x][y].size} landmarks`);
            [...travellLog[x][y]].sort().forEach(z => console.log(`-- ${z}`))
        })
    })
}


// solve(['Peter gets 100',
//     'Peter visited the StatueOfLiberty in USA - 50.',
//     'Bill gets 250',
//     'Tim visited the ChristTheRedeemer in Brazil - 150',
//     'Bill gets 400',
//     'Bill visited the MountFuji in Japan - 600',
//     'Bill visited the TeatroAmazonas in Brazil - 50',
//     'Bill gets 150',
//     'Bill visited the ChristTheRedeemer in Brazil - 150',
//     'Tim gets 500',
//     'Bill visited the StatueOfLiberty in USA - 440',
//     'Tim visited the StatueOfLiberty in USA - 440',
//     'Maria gets 650',
//     'Maria visited the StatueOfLiberty in USA - 440',
//     'Zoro visited the StatueOfLiberty in USA - 1440',
//     'Maria visited the CapeCod in USA - 100']);
solve(['Peter gets 100',
    'Peter visited the StatueOfLiberty in USA - 50',
    'Bill gets 250',
    'Gill gets 94',
    'Bill gets 400',
    'Peter gets 150',
    'Peter visited the ChristTheRedeemer in Brazil - 150']);