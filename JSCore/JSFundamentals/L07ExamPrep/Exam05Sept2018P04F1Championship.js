function solve(input) {

    let standings = {};

    for (let i = 0; i < input.length; i++){
        let [team, pilot, points] = input[i].split(" -> ");
        if (!standings[team]){
            standings[team]={};
        }

        if (!standings[team][pilot]){
            standings[team][pilot] = 0;
        }

        standings[team][pilot] += +points;

    }

    Object.keys(standings).sort((a,b) => {
        return Object.values(standings[b]).reduce((acc, cur) => {return acc += cur}) - Object.values(standings[a]).reduce((acc, cur) => {return acc += cur})
    }).filter((item, index) => index < 3)
        .forEach(x=> {
            console.log(`${x}: ${Object.values(standings[x]).reduce((acc, cur) => acc += cur)}`)
            Object.keys(standings[x]).sort((a,b) => {
                return standings[x][b] - standings[x][a];
            }).forEach(y => {
                console.log(`-- ${y} -> ${standings[x][y]}`);
            })
        });


    //console.log(standings);
}

solve(["Ferrari -> Kimi Raikonnen -> 25",
    "Ferrari -> Sebastian Vettel -> 18",
    "Mercedes -> Lewis Hamilton -> 10",
    "Mercedes -> Valteri Bottas -> 8",
    "Red Bull -> Max Verstapen -> 6",
    "Red Bull -> Daniel Ricciardo -> 4",
    "Ferrari -> Kimi Raikonnen -> 25",
    "Ferrari -> Sebastian Vettel -> 18",
    "Mercedes -> Lewis Hamilton -> 10",
    "Mercedes -> Valteri Bottas -> 8",
    "Red Bulls -> Max Verstapen -> 6",
    "Red Bulls -> Daniel Ricciardo -> 3"]);