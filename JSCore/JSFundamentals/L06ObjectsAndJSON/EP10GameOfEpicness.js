function main(input, battles) {

    let game = {};


    for (let i = 0; i < input.length; i++){

        let obj = input[i];
        // console.log(JSON.stringify(obj));

        let kingdom = obj["kingdom"];
        let general = obj["general"];
        let army = +obj["army"];
        
        if (!game[kingdom]){
            game[kingdom] = {};
        }

        if (!game[kingdom][general]){
            game[kingdom][general] = {
                army: 0,
                wins: 0,
                losses: 0,
            }
        }

        game[kingdom][general]["army"] += army;

    }

    for (let i = 0; i<battles.length; i++){
        let obj = battles[i];
        let attackingKingdom = obj[0];
        let attackingGeneral = obj[1];
        let defendingKingdom = obj[2];
        let defendingGeneral = obj[3];

        if (attackingKingdom !== defendingKingdom){
            if (game[attackingKingdom][attackingGeneral]["army"] > game[defendingKingdom][defendingGeneral]["army"]){
                game[attackingKingdom][attackingGeneral]["army"] *= 1.1;
                game[attackingKingdom][attackingGeneral]["army"] = parseInt(game[attackingKingdom][attackingGeneral]["army"]);
                game[defendingKingdom][defendingGeneral]["army"] *= 0.9;
                game[defendingKingdom][defendingGeneral]["army"] = parseInt(game[defendingKingdom][defendingGeneral]["army"]);

                game[attackingKingdom][attackingGeneral]["wins"]++;
                game[defendingKingdom][defendingGeneral]["losses"]++;
            }else if (game[attackingKingdom][attackingGeneral]["army"] < game[defendingKingdom][defendingGeneral]["army"]) {
                game[attackingKingdom][attackingGeneral]["army"] *= 0.9;
                game[attackingKingdom][attackingGeneral]["army"] = parseInt(game[attackingKingdom][attackingGeneral]["army"]);
                game[defendingKingdom][defendingGeneral]["army"] *= 1.1;
                game[defendingKingdom][defendingGeneral]["army"] = parseInt(game[defendingKingdom][defendingGeneral]["army"]);

                game[attackingKingdom][attackingGeneral]["losses"]++;
                game[defendingKingdom][defendingGeneral]["wins"]++;
            }
        }

    }

    let winner = Object.keys(game).sort((a,b) => {
        return Object.keys(game[b]).reduce((acc, cur) =>{return acc += game[b][cur]["wins"]},0) - Object.keys(game[a]).reduce((acc, cur) =>{return acc += game[a][cur]["wins"]},0) ||
            (Object.keys(game[a]).reduce((acc, cur) =>{return acc += game[a][cur]["losses"]},0) - Object.keys(game[b]).reduce((acc, cur) =>{return acc += game[b][cur]["losses"]},0)) ||
            a.localeCompare(b)
    })[0];
    console.log(`Winner: ${winner}`);

    Object.keys(game[winner])
        .sort((a,b) =>game[winner][b]["army"] - game[winner][a]["army"])
        .forEach(x => {
            console.log(`/\\general: ${x}`)
            Object.keys(game[winner][x])
                .forEach(y=>console.log(`---${y}: ${game[winner][x][y]}`))

        })


    //console.log(JSON.stringify(game));


}

main([ { kingdom: "Maiden Way", general: "Merek", army: 5000 },
        { kingdom: "Stonegate", general: "Ulric", army: 4900 },
        { kingdom: "Stonegate", general: "Doran", army: 70000 },
        { kingdom: "YorkenShire", general: "Quinn", army: 0 },
        { kingdom: "YorkenShire", general: "Quinn", army: 2000 },
        { kingdom: "Maiden Way", general: "Berinon", army: 100000 } ],
    [ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
        ["Stonegate", "Ulric", "Stonegate", "Doran"],
        ["Stonegate", "Doran", "Maiden Way", "Merek"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"],
        ["Maiden Way", "Berinon", "Stonegate", "Ulric"] ]);