function Log(input){
    let peopleWithMoney = {};
    let peopleWithDestinations = {};

    for (let line of input) {
        let getsTokens = line.split(" gets ");
        if(getsTokens.length === 2){
            let person = getsTokens[0];
            let money = Number(getsTokens[1]);

            if(!peopleWithMoney.hasOwnProperty(person)){
                peopleWithMoney[person] = 0;
            }
            if(!peopleWithDestinations.hasOwnProperty(person)){
                peopleWithDestinations[person] = {};
            }
            peopleWithMoney[person] += money;
        }
        else{
            let matches = /([a-zA-Z]+) visited the ([a-zA-Z]+) in ([a-zA-Z]+) - (\d+)/.exec(line);
            if(matches !== null){
                let person = matches[1];
                let landmark = matches[2];
                let country = matches[3];
                let price = Number(matches[4]);

                let firstCondition = peopleWithMoney[person] >= price;

                if(firstCondition){

                    if(!peopleWithDestinations.hasOwnProperty(person)){
                        peopleWithDestinations[person] = {};
                    }
                    if(!peopleWithDestinations[person].hasOwnProperty(country)){
                        peopleWithDestinations[person][country] = [];
                    }
                    let secondCondition = peopleWithDestinations[person][country].indexOf(landmark) === -1;

                    if(firstCondition && secondCondition){
                        peopleWithDestinations[person][country].push(landmark);
                        peopleWithMoney[person] -= price;
                    }
                }
                else{
                    console.log(`Not enough money to visit ${landmark}`);
                }
            }
        }
    }
    let sortedPeople = Array.from(Object.keys(peopleWithDestinations)).sort((a,b) => sortPeopleByCountriesVisited(a,b));
    for (let person of sortedPeople) {
        console.log(`${person} visited ${Object.keys(peopleWithDestinations[person]).length} countries and has ${peopleWithMoney[person]} money left`);
        let sortedCountries = Object.keys(peopleWithDestinations[person]).sort((a,b) => sortCountriesByLandmarksVisited(a,b));
        for (let country of sortedCountries) {
            console.log(`- ${country} -> ${peopleWithDestinations[person][country].length} landmarks`);

            let sortedLandmarks = peopleWithDestinations[person][country].sort();
            for (let landmark of sortedLandmarks) {
                console.log(`-- ${landmark}`);
            }
        }

        function sortCountriesByLandmarksVisited(a,b){
            let firstCountry = peopleWithDestinations[person][a].length;
            let secondCountry = peopleWithDestinations[person][b].length;

            return secondCountry - firstCountry;
        }
    }

    function sortPeopleByCountriesVisited(a,b){
        let firstPerson = Object.keys(peopleWithDestinations[a]).length;
        let secondPerson = Object.keys(peopleWithDestinations[b]).length;

        return secondPerson - firstPerson;
    }
}


let input1 = ['Peter gets 100',
    'Peter visited the StatueOfLiberty in USA - 50',
    'Bill gets 250',
    'Tim visited the ChristTheRedeemer in Brazil - 150',
    'Bill gets 400',
    'Bill visited the MountFuji in Japan - 600',
    'Bill visited the TeatroAmazonas in Brazil - 50',
    'Bill gets 150',
    'Bill visited the ChristTheRedeemer in Brazil - 150',
    'Tim gets 500',
    'Bill visited the StatueOfLiberty in USA - 440',
    'Tim visited the StatueOfLiberty in USA - 440',
    'Maria gets 650',
    'Maria visited the StatueOfLiberty in USA - 440',
    'Maria visited the CapeCod in USA - 100'];

let input2 = ['Peter gets 100',
    'Peter visited the StatueOfLiberty in USA - 50',
    'Bill gets 250',
    'Bill gets 400',
    'Peter gets 150',
    'Peter visited the ChristTheRedeemer in Brazil - 150'];

Log(input1);